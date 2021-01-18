import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRequestComponent } from './custom-request.component';

describe('CustomRequestComponent', () => {
	let component: CustomRequestComponent;
	let fixture: ComponentFixture<CustomRequestComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CustomRequestComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CustomRequestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
