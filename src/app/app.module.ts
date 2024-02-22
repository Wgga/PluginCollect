import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Device } from '@ionic-native/device/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
//20231111 shibo:新增富文本输入框全局方法(mall-kefu,social-sixin)
import { EditorService } from '../app/services/editor-service/editor-service';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
	providers: [Device, StatusBar, SplashScreen, Keyboard, EditorService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
	bootstrap: [AppComponent],
})
export class AppModule { }
