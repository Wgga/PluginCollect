import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpimagePage } from './upimage.page';

describe('UpimagePage', () => {
	let component: UpimagePage;
	let fixture: ComponentFixture<UpimagePage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UpimagePage],
			imports: [IonicModule.forRoot()]
		}).compileComponents();

		fixture = TestBed.createComponent(UpimagePage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
