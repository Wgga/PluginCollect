import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WbSdkPage } from './wbsdk.page';

describe('WbSdkPage', () => {
	let component: WbSdkPage;
	let fixture: ComponentFixture<WbSdkPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [WbSdkPage],
			imports: [IonicModule.forRoot()]
		}).compileComponents();

		fixture = TestBed.createComponent(WbSdkPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
