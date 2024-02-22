import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
	},
	{
		path: 'tab1',
		loadChildren: () => import('./pages/tab1/tab1.module').then(m => m.Tab1PageModule)
	},
	{
		path: 'tab2',
		loadChildren: () => import('./pages/tab2/tab2.module').then(m => m.Tab2PageModule)
	},
	{
		path: 'tab3',
		loadChildren: () => import('./pages/tab3/tab3.module').then(m => m.Tab3PageModule)
	},
	{
		path: 'input',
		loadChildren: () => import('./pages/input/input.module').then(m => m.InputPageModule)
	}
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
