import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PersonPage } from './person.page';

const routes: Routes = [{ path: '', component: PersonPage }];
@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes)
	],
	declarations: [PersonPage]
})
export class PersonPageModule { }
