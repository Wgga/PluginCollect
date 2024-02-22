import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	constructor(
		private platform: Platform,
		private statusbar: StatusBar,
	) {
		this.initializeApp()
	}
	initializeApp() {
		this.platform.ready().then((ev) => {
			this.statusbar.styleBlackTranslucent();
			this.statusbar.overlaysWebView(true);
		})
	}
}
