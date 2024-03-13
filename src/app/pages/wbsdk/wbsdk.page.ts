import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-wbsdk',
	templateUrl: 'wbsdk.page.html',
	styleUrls: ['wbsdk.page.scss']
})
export class WbSdkPage {
	// 控件
	classname: string = "WbSdkPage";
	// 参数
	src: string = "";
	// 变量
	// 数据
	btnlist: any[] = [
		{ id: 1, text: `检查是否微博安装` },
		{ id: 2, text: `微博登录` },
		{ id: 3, text: `微博登出` },
		{ id: 4, text: `微博网页分享` },
		{ id: 5, text: `微博图片分享` },
		{ id: 6, text: `微博文字分享` },
	];
	// 状态
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private navCtrl: NavController
	) {
	}

	clickbtn(x: any) {
		switch (x.id) {
			case 1:
				this.checkClientInstalled();
				break;
			case 2:
				this.ssoLogin();
				break;
			case 3:
				this.ssoLogout();
				break;
			case 4:
				this.shareToWeibo();
				break;
			case 5:
				this.shareImageToWeibo();
				break;
			case 6:
				this.shareTextToWeibo();
				break;
			default:
				break;
		}
	}

	// 显示弹窗
	showToast(message: string) {
		if (!(window as any).ThsToast) return;
		(window as any).ThsToast.show(message);
	}

	// 检查微博客户端是否安装
	checkClientInstalled() {
		if (!(window as any).WeiboSDK) return;
		(window as any).WeiboSDK.checkClientInstalled((success: any) => {
			this.showToast("微博已安装" + JSON.stringify(success));
		}, (error: any) => {
			this.showToast("微博未安装" + JSON.stringify(error));
		});
	}

	// 微博登陆
	ssoLogin() {
		if (!(window as any).WeiboSDK) return;
		(window as any).WeiboSDK.ssoLogin((success: any) => {
			this.showToast("微博登录成功" + JSON.stringify(success));
		}, (error: any) => {
			this.showToast("微博登录失败" + JSON.stringify(error));
		});
	}

	// 微博登出
	ssoLogout() {
		if (!(window as any).WeiboSDK) return;
		(window as any).WeiboSDK.logout((success: any) => {
			this.showToast("微博登录退出成功" + JSON.stringify(success));
		}, (error: any) => {
			this.showToast("微博登录退出失败" + JSON.stringify(error));
		});
	}

	// 网页分享
	shareToWeibo() {
		if (!(window as any).WeiboSDK) return;
		let args: any = {};
		args.url = 'https://cordova.apache.org/';
		args.title = 'Apache Cordova';
		args.description = 'This is a Cordova Plugin';
		args.image = 'https://cordova.apache.org/static/img/pluggy.png';
		(window as any).WeiboSDK.shareToWeibo((success: any) => {
			this.showToast("分享网页成功" + JSON.stringify(success));
		}, (error: any) => {
			this.showToast("分享网页失败" + JSON.stringify(error));
		}, args);
	}

	// 图片分享
	shareImageToWeibo() {
		if (!(window as any).WeiboSDK) return;
		let args: any = {};
		args.image = 'https://cordova.apache.org/static/img/pluggy.png';
		(window as any).WeiboSDK.shareImageToWeibo((success: any) => {
			this.showToast("分享图片成功" + JSON.stringify(success));
		}, (error: any) => {
			this.showToast("分享图片失败" + JSON.stringify(error));
		}, args);
	}

	// 文字分享
	shareTextToWeibo() {
		if (!(window as any).WeiboSDK) return;
		let args: any = {};
		args.text = 'This is a Cordova Plugin';
		(window as any).WeiboSDK.shareTextToWeibo((success: any) => {
			this.showToast("分享文本成功" + JSON.stringify(success));
		}, (error: any) => {
			this.showToast("分享文本失败" + JSON.stringify(error));
		}, args);
	}

	// 返回上一级页面
	goBack() {
		this.navCtrl.pop();
	}
}
