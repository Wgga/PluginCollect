import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare let ThsToast: any;
declare let QQSDK: any;
@Component({
	selector: 'app-qqsdk',
	templateUrl: 'qqsdk.page.html',
	styleUrls: ['qqsdk.page.scss']
})
export class QQSdkPage {
	// 控件
	classname: string = "qqSdkPage";
	// 参数
	src: string = "";
	// 变量
	// 数据
	btnlist: any[] = [
		{ id: 1, text: "检查是否QQ安装" },
		{ id: 2, text: "QQ登录" },
		{ id: 3, text: "QQ登出" },
		{ id: 4, text: "QQ新闻分享" },
		{ id: 5, text: "QQ图片分享" },
		{ id: 6, text: "QQ文字分享" },
	];
	// 状态
	constructor(
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
				this.shareNews();
				break;
			case 5:
				this.shareImage();
				break;
			case 6:
				this.shareText();
				break;
			default:
				break;
		}
	}

	// 显示弹窗
	showToast(message: string) {
		if (!ThsToast) return;
		ThsToast.show(message);
	}

	// 检查QQ/TIM客户端是否安装
	checkClientInstalled() {
		if (!QQSDK) return;
		QQSDK.checkClientInstalled((success: any) => {
			this.showToast(`QQ已安装${JSON.stringify(success)}`);
		}, (error: any) => {
			this.showToast(`QQ未安装${JSON.stringify(error)}`);
		});
	}

	// QQ/TIM登陆
	ssoLogin() {
		if (!QQSDK) return;
		QQSDK.ssoLogin((success: any) => {
			this.showToast(`QQ登录成功${JSON.stringify(success)}`);
		}, (error: any) => {
			this.showToast(`QQ微博登录失败${JSON.stringify(error)}`);
		});
	}

	// QQ/TIM登出
	ssoLogout() {
		if (!QQSDK) return;
		QQSDK.logout((success: any) => {
			this.showToast(`退出登录成功${JSON.stringify(success)}`);
		}, (error: any) => {
			this.showToast(`退出登录失败${JSON.stringify(error)}`);
		});
	}

	// QQ/TIM新闻分享
	shareNews() {
		if (!QQSDK) return;
		let args: any = {
			scene: QQSDK.Scene.QQ,
			url: 'https://cordova.apache.org/',
			title: '新闻分享的标题',
			description: '新闻分享的描述',
			image: 'https://cordova.apache.org/static/img/pluggy.png'
		};
		QQSDK.shareNews((success: any) => {
			this.showToast(`QQ分享新闻成功${JSON.stringify(success)}`);
		}, (error: any) => {
			this.showToast(`QQ分享新闻失败${JSON.stringify(error)}`);
		}, args);
	}

	// QQ/TIM图片分享
	shareImage() {
		if (!QQSDK) return;
		let args: any = {
			scene: QQSDK.Scene.QQ,
			title: '图片分享的标题',
			description: '图片分享的描述',
			image: 'https://cordova.apache.org/static/img/pluggy.png'
		};
		QQSDK.shareImage((success: any) => {
			this.showToast(`QQ分享图片成功${JSON.stringify(success)}`);
		}, (error: any) => {
			this.showToast(`QQ分享图片失败${JSON.stringify(error)}`);
		}, args);
	}

	// QQ/TIM文字分享
	shareText() {
		if (!QQSDK) return;
		let args: any = {
			scene: QQSDK.Scene.QQ,
			text: 'This is a Cordova Plugin'
		};
		QQSDK.shareText((success: any) => {
			this.showToast(`QQ分享文本成功${JSON.stringify(success)}`);
		}, (error: any) => {
			this.showToast(`QQ分享文本失败${JSON.stringify(error)}`);
		}, args);
	}

	// QQ/TIM音乐分享
	shareAudio() {
		if (!QQSDK) return;
		let args: any = {
			scene: QQSDK.Scene.QQ,
			title: '十年',
			description: '陈奕迅',
			url: 'https://y.qq.com/portal/song/001OyHbk2MSIi4.html',
			image: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000003Nz2So3XXYek.jpg',
			flashUrl: 'http://stream20.qqmusic.qq.com/30577158.mp3',
		};
		QQSDK.shareAudio((success: any) => {
			this.showToast(`QQ分享音乐成功${JSON.stringify(success)}`);
		}, (error: any) => {
			this.showToast(`QQ分享音乐失败${JSON.stringify(error)}`);
		}, args);
	}

	// 返回上一级页面
	goBack() {
		this.navCtrl.pop();
	}
}
