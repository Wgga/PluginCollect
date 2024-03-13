import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationEnd } from '@angular/router';

declare let VConsole:any;
@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	constructor(
		private platform: Platform,
		private statusbar: StatusBar,
		private router: Router,
	) {
		this.initializeApp();
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.statusbar.styleDefault();
			}
		})
	}
	initializeApp() {
		this.platform.ready().then(() => {
			// new VConsole();
			this.statusbar.overlaysWebView(true);
			this.statusbar.styleDefault();
		})
	}
}
