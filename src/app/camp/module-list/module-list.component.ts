import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { CustomizeObject } from '../../shared/classes/cutomizeObject';
import { CampService } from '../../services/camp.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-camp-module-list',
	templateUrl: './module-list.component.html',
	styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {
	@Input() modules: any;
	@Output() saveObject = new EventEmitter();
	@Output() removeObject = new EventEmitter();
	@Input() selected_modules: any;
	languages: any;
	selected_languages: any = [];
	selected_specialities: any = [];
	closeResult: string;
	specialityData: any;
	dropdownSettings: {};
	campModuleForm: FormGroup;
	campModuleData = [];
	button = [];

	constructor(private modalService: NgbModal, private campService: CampService, private fb: FormBuilder, public activeModal: NgbActiveModal) {}

	ngOnInit() {
		this.campModuleForm = this.create_form();

		for (let j = 0; j < this.modules.length; j++) {
			const index = this.selected_modules.findIndex(x => x.id === this.modules[j].id);
			if (index !== -1) {
				this.modules[j]['removeFlag'] = true;
				/* this.selected_languages[j] = this.selected_modules[index].languages.map(function(Obj) {
					return [{ id: Obj.id }, { name: Obj.name }];
				}); */
				this.selected_languages[j] = this.selected_modules[index].selected_languages.map(({ name }) => name);
				this.selected_specialities[j] = this.selected_modules[index].selected_specialities.map(({ name }) => name);
			} else {
				this.modules[j]['addFlag'] = true;
			}
		}
	}

	create_form(data?: any) {
		this.dropdownSettings = CustomizeObject.dropDownSettings();

		return this.fb.group({
			language_id: [data ? data['languages'] : '', [Validators.required]],
			module_id: [data ? data['module_id'] : ''],
			speciality_id: [data ? data['specialities'] : '', [Validators.required]]
		});
	}

	showSpeciality(content, module_id) {
		this.campModuleForm.controls['module_id'].setValue(module_id);
		const existingData = this.campModuleData.find(x => x.module_id === module_id);

		if (existingData !== undefined) {
			this.campModuleForm.controls['speciality_id'].setValue(existingData.speciality_id);
			this.campModuleForm.controls['language_id'].setValue(existingData.language_id);
		} else {
			this.campModuleForm.controls['language_id'].setValue([]);
			this.campModuleForm.controls['speciality_id'].setValue([]);
			const index = this.selected_modules.findIndex(x => x.id === module_id);
			this.selected_languages[index] = [];
			this.selected_specialities[index] = [];
		}

		const languages = this.getLanguages(module_id);
		this.languages = languages;
		this.open(content);
	}

	open(content: any) {
		this.activeModal = this.modalService.open(content, {
			backdrop: 'static',
			keyboard: false
		});
	}

	getLanguages(module_id?: string) {
		const languages = this.modules.find(x => x.id === module_id).languages;
		return languages;
	}

	onSubmit() {
		this.saveObject.emit(this.campModuleForm.value);
		this.campModuleData.push(this.campModuleForm.value);

		const objIndex = this.modules.findIndex(x => x.id === this.campModuleForm.value.module_id);
		if (objIndex !== -1) {
			this.modules[objIndex].removeFlag = true;
			this.modules[objIndex].addFlag = false;
			this.selected_languages[objIndex] = this.campModuleForm.value.language_id.map(({ name }) => name);
			this.selected_specialities[objIndex] = this.campModuleForm.value.speciality_id.map(({ name }) => name);
		}
		this.activeModal.close();
	}

	removeValues(module_id) {
		this.removeObject.emit(module_id);
		const objIndex = this.modules.findIndex(x => x.id === module_id);
		if (objIndex !== -1) {
			this.modules[objIndex].removeFlag = false;
			this.modules[objIndex].addFlag = true;
			delete this.selected_languages[objIndex];
			delete this.selected_specialities[objIndex];
		}
	}
}
