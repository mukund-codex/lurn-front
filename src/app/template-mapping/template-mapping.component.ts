import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InputService } from '../services/input.service';
import { CustomizeObject } from '../shared/classes/cutomizeObject';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import 'rxjs/add/observable/merge';
import { concatMap, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TemplateService } from '../services/template.service';

@Component({
	selector: 'app-template-mapping',
	templateUrl: './template-mapping.component.html',
	styleUrls: ['./template-mapping.component.css']
})
export class TemplateMappingComponent implements OnInit {
	title: string;
	subscription: Subscription;
	searchObj: {} = {};
	parameters: {} = {};
	inputsData: any;
	records: any;
	message: {"text" : ""};
	@ViewChild('searchForm') sf: NgForm;
	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute,
		private inputService: InputService,
		private templateService: TemplateService,
		private toasterService: ToastrService,
	) {}

	ngOnInit() {
		this.title = this.activeRoute.snapshot.data['title'];

		this.subscription = Observable.merge(
			this.activeRoute.queryParams.pipe(
				map(qParams => {
					this.parameters = CustomizeObject.merge({}, this.parameters, qParams);
					return this.parameters;
				}),
				concatMap(nParam => this.loadData(nParam))
			),
			this.search()
		).subscribe(result => {
			this.records = result;
		});
	}

	add() {
		this.router.navigate(['template-inputs/add']);
	}

	search() {
		return this.sf.valueChanges.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			map(valueObj => {
				this.searchObj = CustomizeObject.removeNullKeys(valueObj);
				this.parameters = CustomizeObject.merge({}, this.parameters, this.searchObj);

				return this.parameters;
			}),
			switchMap(filterObj => this.loadData(filterObj))
		);
	}

	loadData(Obj) {
		return this.templateService.getAll(Obj);
	}

	edit(template_id) {
		this.router.navigate(['template/edit/' + template_id]);
	}

	delete(company_id) {
		if (confirm('Are you sure you want to delete?')) {
			const formData = new FormData();
			this.inputService.delete(formData, company_id).subscribe(result => {
				this.toasterService.success('Record Deleted!', 'Success!', {
					positionClass: 'toast-top-right'
				});
				this.sf.form.updateValueAndValidity();
			});
		}
	}

	export($evt) {
		
	}
}
