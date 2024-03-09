import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
	},
	{
		path: 'home',
		loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
	},
	{
		path: 'planet',
		loadChildren: () => import('./pages/planet/planet.module').then(m => m.PlanetPageModule)
	},
	{
		path: 'person',
		loadChildren: () => import('./pages/person/person.module').then(m => m.PersonPageModule)
	},
	{
		path: 'input',
		loadChildren: () => import('./pages/input/input.module').then(m => m.InputPageModule)
	},
	{
		path: 'address',
		loadChildren: () => import('./pages/address/address.module').then(m => m.AddressPageModule)
	},
	{
		path: 'upimage',
		loadChildren: () => import('./pages/upimage/upimage.module').then(m => m.UpimagePageModule)
	}
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
