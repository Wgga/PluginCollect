import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanetPage } from './planet.page';

describe('PlanetPage', () => {
	let component: PlanetPage;
	let fixture: ComponentFixture<PlanetPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PlanetPage],
			imports: [IonicModule.forRoot()]
		}).compileComponents();

		fixture = TestBed.createComponent(PlanetPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
