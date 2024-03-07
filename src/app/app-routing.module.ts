import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
	},
	{
		path: 'address',
		loadChildren: () => import('./pages/address/address.module').then(m => m.AddressPageModule)
	}
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
