import { Component, ViewContainerRef } from '@angular/core';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from './ngb-date-fr-parser-formatter';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})
export class AppComponent {
	constructor() {}
}
