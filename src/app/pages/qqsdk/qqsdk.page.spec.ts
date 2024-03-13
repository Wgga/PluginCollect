import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QQSdkPage } from './qqsdk.page';

describe('QQSdkPage', () => {
	let component: QQSdkPage;
	let fixture: ComponentFixture<QQSdkPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [QQSdkPage],
			imports: [IonicModule.forRoot()]
		}).compileComponents();

		fixture = TestBed.createComponent(QQSdkPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
