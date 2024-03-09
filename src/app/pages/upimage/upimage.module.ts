import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { UpimagePage } from './upimage.page';

const routes: Routes = [{ path: '', component: UpimagePage }];
@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes)
	],
	declarations: [UpimagePage]
})
export class UpimagePageModule { }
