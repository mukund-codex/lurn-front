import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CustomizeObject } from '../shared/classes/cutomizeObject';
import { CourseService } from '../services/course.service';
import { CampaignService } from '../services/campaign.service';

@Component({
  selector: 'app-course-topbar',
  templateUrl: './course-topbar.component.html',
  styleUrls: ['./course-topbar.component.css']
})
export class CourseTopbarComponent implements OnInit {

  courses: any;
  dropdownSettingsModule: {};
  start_date: string;
  end_date: string;
  courseData: any;
  selectedCourse: any = [];
  @Output() changeCourse = new EventEmitter();

  constructor(
    private courseService: CourseService,
    private cs: CampaignService
  ) { }

  ngOnInit(): void {

    this.dropdownSettingsModule = CustomizeObject.dropDownSettings(true);
    
    const course_id = this.courseService.getCourseId();
    this.courseService.getAll({id: course_id}).subscribe(result => {
      this.courseData = result['data'][0];
      this.selectedCourse.push(this.courseData);

      const start_date = new Date(this.courseData.start_date);
      const end_date = new Date(this.courseData.end_date);

      this.start_date = start_date.getDate() + " " + start_date.toLocaleString('default', { month: 'long' }) + ", " + start_date.getFullYear();
      this.end_date = end_date.getDate() + " " + end_date.toLocaleString('default', { month: 'long' }) + ", " + end_date.getFullYear();

     // this.courses = this.courseService.export({campaign_id: this.cs.getCampaignId()});
    });

  }
}
