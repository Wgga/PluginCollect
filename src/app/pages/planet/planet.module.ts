import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PlanetPage } from './planet.page';

const routes: Routes = [{ path: '', component: PlanetPage }];
@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes)
	],
	declarations: [PlanetPage]
})
export class PlanetPageModule { }
