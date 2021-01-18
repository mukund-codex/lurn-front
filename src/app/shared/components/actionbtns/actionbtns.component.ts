import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CampaignService } from 'src/app/services/campaign.service';
import { SectionService } from 'src/app/services/section.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
	selector: 'app-actionbtns',
	templateUrl: './actionbtns.component.html',
	styleUrls: ['./actionbtns.component.css']
})
export class ActionbtnsComponent implements OnInit {
	@ViewChild('uploadForm') public userFrm: NgForm;
	@Input() addRedirect: string;
	@Input() showAdd: boolean;
	@Input() showExport: boolean;
	@Input() showImport: boolean;
	@Input() uploadFields: string;
	@Input() uploadAction: string;
	@Output() download = new EventEmitter();
	@Output() uploaded = new EventEmitter();
	@Output() uploadFile = new EventEmitter();
	files: any = [];
	isCollapsed = true;
	campainId;
	section_id:string = '';
	course_id:string='';

	constructor(private router: Router, private cs: CampaignService,private ss : SectionService,private courseService:CourseService) {}

	ngOnInit() {
		this.campainId = this.cs.getCampaignId();
		this.section_id = this.ss.getSectionId();
		this.course_id = this.courseService.getCourseId();
		
	}

	add() {
		this.router.navigate([this.addRedirect], { queryParams: {section_id:this.section_id,campaign_id: this.campainId,course_id:this.course_id}} );
	}

	initiateExport() {
		this.download.emit('export_data');
	}

	upload() {
		this.uploadFile.emit(this.files);
		this.isCollapsed = true;
	}

	onChange(event: any) {
		const files = event.srcElement.files;
		this.uploaded.emit(files[0]); // Emit Event to Parent
		this.files = files[0];
	}
}
