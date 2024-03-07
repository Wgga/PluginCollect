import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AddressPage } from './address.page';

const routes: Routes = [{ path: '', component: AddressPage }];
@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes)
	],
	declarations: [AddressPage]
})
export class AddressPageModule { }
