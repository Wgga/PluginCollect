import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

declare var WeiboSDK: any
@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage {

	btnlist: any = [
		{ id: 1, text: "选择地址" },
		{ id: 2, text: "选择图片" },
		{ id: 3, text: "裁剪图片" },
		{ id: 4, text: "表情键盘" },
		{ id: 5, text: "显示弹窗" },
		{ id: 6, text: "是否安装" },
		{ id: 7, text: "微博登录" },
		{ id: 8, text: "微博登出" },
		{ id: 9, text: "网页分享" },
		{ id: 10, text: "图片分享" },
		{ id: 11, text: "文字分享" },
	];

	constructor(
		private router: Router,
		private toastCtrl: ToastController,
	) { }

	clickbtn(x: any){
		switch (x.id) {
			case 1:
				this.router.navigate(['/address']);
				break;
			case 2:
				this.imagepicker();
				break;
			case 3:
				this.showToast("正在开发中");
				break;
			case 4:
				this.router.navigate(['/input']);
				break;
			case 5:
				this.showToast("Hello World");
				break;
			case 6:
				this.checkClientInstalled();
				break;
			case 7:
				this.ssoLogin();
				break;
			case 8:
				this.ssoLogout();
				break;
			case 9:
				this.shareToWeibo();
				break;
			case 10:
				this.shareImageToWeibo();
				break;
			case 11:
				this.shareTextToWeibo();
				break;
			default:
				break;
		}
	}

	// 显示弹窗
	showToast(message: string) {
		this.toastCtrl.create({
			duration: 1500,
			position: 'top',
			message: message
		}).then((toast: any) => {
			toast.present();
		});
	}

	// 图片选择
	imagepicker() {
		if (!(window as any).ImagePicker) return;
		(window as any).ImagePicker.getPictures((result) => {
			this.showToast("成功" + JSON.stringify(result));
		}, (err) => {
			this.showToast("失败" + JSON.stringify(err));
		}, {
			maximumImagesCount: 100,
			width: 1920,
			height: 1440,
			quality: 100
		});
	}

	// 检查微博客户端是否安装
	checkClientInstalled() {
		if (!WeiboSDK) return;
		WeiboSDK.checkClientInstalled((success: any) => {
			this.showToast("微博已安装" + JSON.stringify(success))
		}, (error: any) => {
			this.showToast("微博未安装" + JSON.stringify(error))
		});
	}

	// 微博登陆
	ssoLogin() {
		if (!WeiboSDK) return;
		WeiboSDK.ssoLogin((success: any) => {
			this.showToast("微博登录成功" + JSON.stringify(success))
		}, (error: any) => {
			this.showToast("微博登录失败" + JSON.stringify(error))
		});
	}

	// 微博登出
	ssoLogout() {
		if (!WeiboSDK) return;
		WeiboSDK.logout((success: any) => {
			this.showToast("微博登录退出成功" + JSON.stringify(success))
		}, (error: any) => {
			this.showToast("微博登录退出失败" + JSON.stringify(error))
		});
	}

	// 网页分享
	shareToWeibo() {
		if (!WeiboSDK) return;
		let args: any = {};
		args.url = 'https://cordova.apache.org/';
		args.title = 'Apache Cordova';
		args.description = 'This is a Cordova Plugin';
		args.image = 'https://cordova.apache.org/static/img/pluggy.png';
		WeiboSDK.shareToWeibo((success: any) => {
			this.showToast("分享网页成功" + JSON.stringify(success))
		}, (error: any) => {
			this.showToast("分享网页失败" + JSON.stringify(error))
		}, args);
	}

	// 图片分享
	shareImageToWeibo() {
		if (!WeiboSDK) return;
		let args: any = {};
		args.image = 'https://cordova.apache.org/static/img/pluggy.png';
		WeiboSDK.shareImageToWeibo((success: any) => {
			this.showToast("分享图片成功" + JSON.stringify(success));
		}, (error: any) => {
			this.showToast("分享图片失败" + JSON.stringify(error));
		}, args);
	}

	// 文字分享
	shareTextToWeibo() {
		if (!WeiboSDK) return;
		let args: any = {};
		args.text = 'This is a Cordova Plugin';
		WeiboSDK.shareTextToWeibo((success: any) => {
			this.showToast("分享文本成功" + JSON.stringify(success));
		}, (error: any) => {
			this.showToast("分享文本失败" + JSON.stringify(error));
		}, args);
	}
}
