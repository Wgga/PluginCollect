import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: 'tabs',
		component: TabsPage,
		children: [
			{
				path: 'home',
				loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
			},
			{
				path: 'planet',
				loadChildren: () => import('../planet/planet.module').then(m => m.PlanetPageModule)
			},
			{
				path: 'person',
				loadChildren: () => import('../person/person.module').then(m => m.PersonPageModule)
			},
			{
				path: '',
				redirectTo: '/tabs/home',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '',
		redirectTo: '/tabs/home',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
