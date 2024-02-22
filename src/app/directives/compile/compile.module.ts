import { NgModule } from '@angular/core';
import { CompileDirective } from './compile.directive';

@NgModule({
	declarations: [
		CompileDirective
	],
	exports: [
		CompileDirective
	]
})
export class CompileModule { }
