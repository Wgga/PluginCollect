import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare var ThsToast: any
declare var WeiboSDK: any
@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

	constructor(
		private router: Router,
	) { }
	show() {
		ThsToast.show("弹窗")
	}
	imagepicker() {
		if(!(window as any).ImagePicker) return;
		(window as any).ImagePicker.getPictures((result)=>{
			ThsToast.show("成功" + JSON.stringify(result));
		}, (err)=>{
			ThsToast.show("失败" + JSON.stringify(err));
		}, {
			maximumImagesCount : 100,
			width : 1920,
			height : 1440,
			quality : 100
		});
	}
	goinput(){
		this.router.navigate(['/input']);
	}
	checkClientInstalled(){
		WeiboSDK.checkClientInstalled((success: any) => {
			ThsToast.show("微博已安装" + JSON.stringify(success))
		}, (error: any) => {
			ThsToast.show("微博未安装" + JSON.stringify(error))
		});
	}
	ssoLogin() {
		WeiboSDK.ssoLogin((success: any) => {
			ThsToast.show("微博登录成功" + JSON.stringify(success))
		}, (error: any) => {
			ThsToast.show("微博登录失败" + JSON.stringify(error))
		});
	}
	ssoLogout() {
		WeiboSDK.logout((success: any) => {
			ThsToast.show("微博登录退出成功" + JSON.stringify(success))
		}, (error: any) => {
			ThsToast.show("微博登录退出失败" + JSON.stringify(error))
		});
	}
	shareToWeibo() {
		let args: any = {};
		args.url = 'https://cordova.apache.org/';
		args.title = 'Apache Cordova';
		args.description = 'This is a Cordova Plugin';
		args.image = 'https://cordova.apache.org/static/img/pluggy.png';
		WeiboSDK.shareToWeibo((success: any) => {
			ThsToast.show("分享网页成功" + JSON.stringify(success))
		}, (error: any) => {
			ThsToast.show("分享网页失败" + JSON.stringify(error))
		}, args);
	}
	shareImageToWeibo() {
		let args: any = {};
		args.image = 'https://cordova.apache.org/static/img/pluggy.png';
		WeiboSDK.shareImageToWeibo((success: any) => {
			ThsToast.show("分享图片成功" + JSON.stringify(success));
		}, (error: any) => {
			ThsToast.show("分享图片失败" + JSON.stringify(error));
		}, args);
	}
	shareTextToWeibo() {
		let args: any = {};
		args.text = 'This is a Cordova Plugin';
		WeiboSDK.shareTextToWeibo((success: any)=>{
			ThsToast.show("分享文本成功" + JSON.stringify(success));
		}, (error: any)=>{
			ThsToast.show("分享文本失败" + JSON.stringify(error));
		}, args);
	}
}
