import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { CompileModule } from '../../directives/compile/compile.module';

import { InputPage } from './input.page';

const routes: Routes = [{ path: '', component: InputPage }];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		CompileModule,
		RouterModule.forChild(routes)
	],
	declarations: [InputPage]
})
export class InputPageModule { }
