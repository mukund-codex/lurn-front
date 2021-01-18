import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { GeographyService } from '../../services/geography.service';

import { combineLatest } from 'rxjs/';
import { concatMap, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { of } from 'rxjs';

import { CustomizeObject } from '../../shared/classes/cutomizeObject';
import { UsersService } from '../../services/users.service';
import { RolesService } from '../../services/roles.service';
import { uniqueUserLoginValidator } from '../../shared/directives/unique-user-login-validator.directive';
import { CampaignService } from 'src/app/services/campaign.service';
import { DesignationService } from 'src/app/services/designation.service';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	title: string;
	urlKey: string;
	disabled: boolean;
	first_name:string='';
	last_name:string='';

	user_id = '';
	campaign_id = '';
	userForm: FormGroup;
	buildForm: boolean;
	dropdownSettings: {};
	submitted = false;

	rolesData: any = [];
	designationData: any = [];
	campaignData: any = [];
	typesData: any = [];
	nationalZonesData: any = [];
	zonesData: any = [];
	regionsData: any = [];
	areaData: any = [];
	cityData: any = [];
	error_messages: any = [];

	showField = {
		'National Zone': false,
		Zone: false,
		Region: false,
		Area: false,
		City: false
	};

	fields = [
		{ keyname: 'national_zone', text: 'National Zone' },
		{ keyname: 'zone', text: 'Zone' },
		{ keyname: 'region', text: 'Region' },
		{ keyname: 'area', text: 'Area' },
		{ keyname: 'city', text: 'City' }
	];

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private activeRoute: ActivatedRoute,
		private geoService: GeographyService,
		private userService: UsersService,
		private roleService: RolesService,
		private designationService: DesignationService,
		public toasterService: ToastrService,
		private cs: CampaignService
	) {}

	getCurrentCampaign() {
		return this.cs.getCampaignId();
	}

	ngOnInit() {
		
		this.campaign_id = this.getCurrentCampaign();
		const page = this.activeRoute.snapshot.data;
		const params = this.activeRoute.snapshot.params;
		if (params.id) {
			this.user_id = params.id;
		}
		this.title = page['title'];
		this.urlKey = page['urlKey'];
		this.disabled = page['urlKey'] === 'edit' ? false : false;
		this.dropdownSettings = CustomizeObject.dropDownSettings(true, true);

		this.userForm = this.create_form();
		this.typesData = this.geoService.getTypesFromCampaign(this.campaign_id);
		this.roleService.allRecords().subscribe((roles: any) => {
			this.rolesData = roles.data;
		});
		this.designationService.allRecords().subscribe((designations: any) => {
			this.designationData = designations.data;
		});


		if (this.urlKey === 'add') {
			
		} else {
			this.activeRoute.params.pipe(concatMap((params: Params) => this.userService.getAll({ id: params.id }))).subscribe((result: any) => {
				if (result.data && result.data[0]) {
					this.user_id = result.data[0].id;
					this.userForm.patchValue(this.rewriteForUser(result.data[0]));

					

					// this.buildForm = true;
				} else {
					this.buildForm = false;
				}
			});
		}

		combineLatest(
			this.userForm.controls.type.valueChanges.pipe(
				startWith(this.userForm.controls.type.value),
				concatMap((type: any) => {
					this.resetHeirarchyFor('All');
					if (type) {
						return type;
					}
					return of({ name: '' });
				})
			)
		).subscribe((result: any) => {
			this.geoService.getTypesFromCampaign(this.campaign_id).subscribe(resultData => {
				this.typesData = resultData['data'];
				// this.typesData = result[0].data;
				this.requiredFields(result[0]);
	
				if (this.typesData.length) {
					this.initializeFields(this.typesData);
				}
				this.buildForm = true;
			});

		});
	}

	rewriteForUser(data) {
		const newObj = {};

		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				if (key === 'geography') {
					for (const geoKey in data.geography) {
						if (data.geography.hasOwnProperty(geoKey)) {
							if (['id', 'name'].indexOf(geoKey) >= 0) {
								newObj[geoKey] = data.geography[geoKey];
							} else {
								newObj[geoKey] = [data.geography[geoKey]];
							}
						}
					}
				}
				if(key === 'role' || key === 'designation') {
					continue;
				}

				if (key === 'empid') {
					newObj['emp_id'] = data['empid'];
				}
				if (key === 'email') {
					newObj['email_id'] = data['email'];
				}
				newObj[key] = data[key];
			}
		}
		// this.userForm.controls['role'].setValue(data.roles);
		
		this.userForm.controls['designation'].setValue([data.designation]);
		return newObj;
	}

	resetHeirarchyFor(controlName: string) {
		if (controlName === 'All') {
			this.userForm.controls.national_zone.patchValue([]);
			this.nationalZonesData = [];
		}

		if (controlName === 'National Zone' || controlName === 'All') {
			this.userForm.controls.zone.patchValue([]);
			this.zonesData = [];
		}

		if (controlName === 'National Zone' || controlName === 'Zone' || controlName === 'All') {
			this.userForm.controls.region.patchValue([]);
			this.regionsData = [];
		}

		if (controlName === 'National Zone' || controlName === 'Zone' || controlName === 'Region' || controlName === 'All') {
			this.userForm.controls.area.patchValue([]);
			this.areaData = [];
		}

		if (
			controlName === 'National Zone' ||
			controlName === 'Zone' ||
			controlName === 'Region' ||
			controlName === 'Area' ||
			controlName === 'All'
		) {
			this.userForm.controls.city.patchValue([]);
			this.cityData = [];
		}
	}

	resetFieldsAndVAlidity() {
		// reset all geography fields [NZ, Z, R, A, C]
		for (const key in this.showField) {
			if (this.showField.hasOwnProperty(key)) {
				this.showField[key] = false;

				const formFieldNode = this.fields.find(o => o.text === key);
				this.userForm.controls[formFieldNode.keyname].setValidators(null);

				this.userForm.controls[formFieldNode.keyname].updateValueAndValidity();
			}
		}
	}

	requiredFields(geographyField: { id?: string; name?: string }) {
		if (geographyField.name) {
			const selectedTypeIndex = this.typesData.findIndex(obj => obj.name === geographyField.name);

			this.resetFieldsAndVAlidity();

			if (selectedTypeIndex > -1) {
				for (let i = 0; i <= selectedTypeIndex; i++) {
					const key = this.typesData[i].name;
					this.showField[key] = true;

					const formFieldNode = this.fields.find(o => o.text === key);
					this.userForm.controls[formFieldNode.keyname].setValidators([Validators.required]);

					this.userForm.controls[formFieldNode.keyname].updateValueAndValidity();
				}
			}
		}
	}

	create_form(): FormGroup {
		const form: FormGroup = this.fb.group({
			first_name: [null, [Validators.required, Validators.pattern('^([a-zA-Z. ])+$'), Validators.minLength(3), Validators.maxLength(50)]],
			last_name: [null, [Validators.required, Validators.pattern('^([a-zA-Z. ])+$'), Validators.minLength(3), Validators.maxLength(50)]],
			emp_id: [null, [Validators.minLength(3), Validators.pattern('^([a-zA-Z0-9 ])+$'), Validators.maxLength(20)]],
			email_id: [null, [Validators.maxLength(100), Validators.email]],
			mobile: [null, [Validators.pattern('^[6-9]{1}([0-9]){9}$') ]],
			// role: [null, [Validators.required]],
			designation: [null, [Validators.required]],
			username: [
				null,
				[Validators.required, Validators.pattern('^([a-zA-Z0-9])+$'), Validators.minLength(1), Validators.maxLength(50)]
			],

			type: [null, [Validators.required]],
			national_zone: [null, [Validators.required]],
			zone: [null, [Validators.required]],
			region: [null, [Validators.required]],
			area: [null, [Validators.required]],
			city: [null, [Validators.required]]
		});

		if (this.urlKey === 'add') {
			form.addControl('password', new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(4)]));
		} else if(this.urlKey === 'edit') {
			form.addControl('new_password', new FormControl('', [Validators.maxLength(25), Validators.minLength(4)]));
		}

		return form;
	}

	listing(type, parent = null, campaign = null) {
		if (campaign) {
			return this.geoService.getGeography(type, parent, campaign);
		} else {
			return this.geoService.getGeography(type, parent);
		}
	}

	loadingFieldData(data, records) {
		if (data.name === 'National Zone') {
			this.nationalZonesData = records.data;
		}
		if (data.name === 'Zone') {
			this.zonesData = records.data;
		}
		if (data.name === 'Region') {
			this.regionsData = records.data;
		}
		if (data.name === 'Area') {
			this.areaData = records.data;
		}
		if (data.name === 'City') {
			this.cityData = records.data;
		}
	}

	getParent(fieldType: string) {
		if (fieldType === 'National Zone') {
			return this.userForm.controls.national_zone.value;
		} else if (fieldType === 'Zone') {
			return this.userForm.controls.zone.value;
		} else if (fieldType === 'Region') {
			return this.userForm.controls.region.value;
		} else if (fieldType === 'Area') {
			return this.userForm.controls.area.value;
		} else if (fieldType === 'City') {
			return this.userForm.controls.city.value;
		} else {
			return null;
		}
	}

	initializeFields(fields) {
		const fieldCount = fields.length;
		let parent_id = null;

		for (let i = 0; i < fieldCount; i++) {
			if (i > 0) {
				const parentNode = this.getParent(fields[i - 1].name);
				if (parentNode.length) {
					if (parentNode[0]) {
						parent_id = parentNode[0].id;
					}
				}
			}

			this.listing(fields[i].id, parent_id, this.campaign_id).subscribe((records: any) => {
				this.loadingFieldData(fields[i], records);
			});
		}
	}

	updateValue(event, elem) {
		const currIndex = this.typesData.findIndex(obj => obj.name === elem);

		if (currIndex >= 0) {
			const nextData = this.typesData[currIndex + 1];

			if (nextData === undefined) {
				return;
			}

			this.listing(nextData.id, event.id, this.campaign_id).subscribe((records: any) => {
				this.loadingFieldData(nextData, records);
			});
		}
	}

	removeValue(event, elem) {
		this.resetHeirarchyFor(elem);
	}

	onSubmit() {
		this.submitted = true;
		if (!this.userForm.valid) {
			return;
		}
		const data = this.userForm.value;

		const formData = new FormData();

		formData.set('first_name', data.first_name);
		formData.set('last_name', data.last_name);
		if(data.mobile) {
			formData.set('mobile', data.mobile);
		}
		formData.set('campaign_id', this.campaign_id);
		formData.set('username', data.username);
		// formData.set('role', data.role[0].id);
		
		formData.set('designation', data.designation[0].id);
	
		if(data.emp_id != "" && data.emp_id != null) {
			formData.set('empid', data.emp_id);
		}
		if(data.email_id != "" && data.email_id != null) {
			formData.set('email', data.email_id);
		}

		if (this.urlKey === 'add') {
			formData.set('password', data.password);
		}

		if (this.urlKey === 'edit' && data.new_password) {
			formData.set('new_password', data.new_password);
		}

		const geography = data.type[0].name;
		const geoObj = this.fields.find(o => o.text === geography);

		const geography_id = this.userForm.controls[geoObj.keyname].value[0].id;

		formData.set('geography_id', geography_id);

		if (this.urlKey === 'add') {
			this.save(formData);
		} else {
			this.update(formData);
		}
	}

	private save(formData) {
		this.userService.save(formData).subscribe(
			(response: any) => {
				this.router.navigate(['/manpower/users'], { queryParams : { campaign_id: this.campaign_id } }).then(() => {
					this.toasterService.success('Records Added Successfully!', 'Success!', {
						positionClass: 'toast-top-right'
					});
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.userForm);
			}
		);
	}

	private update(formData) {
		this.userService.update(formData, this.user_id).subscribe(
			(response: any) => {
				this.router.navigate(['/manpower/users'], { queryParams : { campaign_id: this.campaign_id } }).then(() => {
					this.toasterService.success('Records Updated Successfully!', 'Success!', {
						positionClass: 'toast-top-right'
					});
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.userForm);
			}
		);
	}

	handleError(err: HttpErrorResponse, form: FormGroup) {
		if (err.status === 400) {
			this.error_messages = err.error.error;
		} else {
			alert('Problems while saving data');
		}
	}

	get user() {
		return this.userForm;
	}

	elementTouched(element) {
		element.markAsTouched();
	}

	changeCampaign(campaign) {
		this.cs.setCampaignId(campaign.id);
	}
}
