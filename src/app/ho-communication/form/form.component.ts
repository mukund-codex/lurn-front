import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { HoCommunicationService } from 'src/app/services/ho-communication.service';
import { of } from 'rxjs';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CampaignService } from 'src/app/services/campaign.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  buildForm = false;
  submitted = false;
  title: string;
  hcForm: FormGroup;
  media: FormArray;
  error_messages: any = [];
  mediaFiles: any = [];
  selectedFiles: any = [];
  removeMediaFiles: any = [];
  ho_communication_id: string;
  formData = new FormData();
  campaign_id: string;
  public Editor = ClassicEditor;

  constructor(
    private activeRoute: ActivatedRoute,
    private hoCommunicationService: HoCommunicationService,
    private cs: CampaignService,
    private toasterService: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) { 

		ClassicEditor.defaultConfig = {
			ckfinder: {
				uploadUrl: 'https://uat-cubit.techizertech.in/api/v1/files/upload',
				headers: {
					'X-CSRF-TOKEN': 'CSFR-Token',
					Authorization: 'Bearer ' + localStorage.getItem('userToken')
				}
			},
			placeholder: 'Type the content here!',
			toolbar: {
			items: [
				'heading',
				'|',
				'bold',
				'italic',
				'|',
				'bulletedList',
				'numberedList',
				'|',
				'insertTable',
				'imageUpload',
				'link',
				'|',
				'undo',
				'redo'
			]
			},
			image: {
				toolbar: [
					'imageStyle:full',
					'imageStyle:side',
					'|',
					'imageTextAlternative'
				]
			},
			table: {
			contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
			},
			language: 'en'
	  	};
  	}

  	ngOnInit() {
    	this.buildForm = false;
		this.campaign_id = this.cs.getCampaignId();
		this.title = this.activeRoute.snapshot.data['title'];

		this.activeRoute.params
			.pipe(
				concatMap((params: Params): any => {
					if (params.id) {
						return this.hoCommunicationService.getAll({
							id: params.id
						});
					}
					return of({ data: [] });
				})
			)
			.subscribe((result: any) => {
				if (result.data[0] && this.activeRoute.snapshot.data['urlKey'] === 'edit') {

					this.ho_communication_id = result.data[0].id;
					this.hcForm = this.create_form(result.data[0]);
					const media = result.data[0].medias;
					if(!media.length) {
						this.media = this.fb.array([this.createMediaRow()]);
					} else {
						this.media = this.fb.array([]);
						media.forEach(element => {
							this.media.push(this.createMediaRow(element));
						});
						this.media.push(this.createMediaRow());
					}
				}

				if (this.activeRoute.snapshot.data['urlKey'] === 'add') {
					this.media = this.fb.array([this.createMediaRow()]);
					this.hcForm = this.create_form();
				}
				this.hcForm.addControl('media', this.media);
			});
	}

	createMediaRow(row?: any): FormGroup {

		if(row) {
			this.selectedFiles.push({id: row.id, url: row.url});
		}

		return this.fb.group({
			id: [row ? row.id : '', []],
			file: [],
		});
  	}

	onAddMedia(row?: any) {
		if(typeof row === 'boolean') {
			if(row === true) {
				this.media.push(this.createMediaRow());
			}
		} else {
			this.media.push(this.createMediaRow(row));
		}
	}

	onRemoveMedia(rowIndex: number) {
		if(this.selectedFiles[rowIndex]) {
			this.removeMediaFiles.push(this.selectedFiles[rowIndex]);
			delete this.selectedFiles[rowIndex];
		}
		this.media.removeAt(rowIndex);
	}

	create_form(data?: any): FormGroup {
		const form: FormGroup = this.fb.group({
			title: [data ? data.title : '', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-])+$'), Validators.minLength(3), Validators.maxLength(50)]],
			description: [data ? data.description : '', [Validators.required, Validators.pattern("^([a-zA-Z0-9 .,@()!%&'_-])+$"), Validators.minLength(3), Validators.maxLength(1000)]],
			html_content: [data ? data.html : '', [Validators.required]]
		});

		this.buildForm = true;
		return form;
	}

	mediaFileChange(files: FileList, i) {
		this.mediaFiles[i] = files.length ? files.item(0) : null;
	}

	onSubmit() {
		
		this.submitted = true;
		if (this.hcForm.invalid) {
			return;
		}

		this.formData = this.hoCommunicationService.convertToFormData(this.hcForm.value);
		this.formData.delete('media[file]');
		this.formData.delete('media[id]');
		this.formData.set('campaign_id', this.campaign_id);
		this.formData.set('html', this.hcForm.value.html_content);

		if(this.mediaFiles.length) {
			this.mediaFiles.forEach((element, i) => {
				this.formData.set('media[' + i + ']', this.mediaFiles[i], this.mediaFiles[i].name);
			});
		}

		!this.ho_communication_id ? this.save() : this.update();
	}

	private save() {
		this.hoCommunicationService.save(this.formData).subscribe(
			(response: any) => {
				this.router.navigate(['/ho-communication'], { queryParams : { campaign_id: this.campaign_id } } ).then(() => {
					this.toasterService.success('Records Added Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.hcForm);
			}
		);
	}

	private update() {

		if(this.removeMediaFiles.length) {
			this.removeMediaFiles.forEach((element, i) => {
				this.formData.set('delete_media[' + i + ']', this.removeMediaFiles[i].id);
			});
		}

		this.hoCommunicationService.update(this.formData, this.ho_communication_id).subscribe(
			(response: any) => {
				this.router.navigate(['/ho-communication'], { queryParams : { campaign_id: this.campaign_id } } ).then(() => {
					this.toasterService.success('Records Updated Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.hcForm);
			}
		);
	}

	handleError(err: HttpErrorResponse, form: FormGroup) {
		if (err.status === 400) {
			form.setErrors(err.error);
			this.error_messages = err.error.error;
		} else {
			alert('Problems while saving data');
		}
	}

}
