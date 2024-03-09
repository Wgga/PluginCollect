import { ChangeDetectorRef, Component } from '@angular/core';
import { Events, AlertController, NavController } from '@ionic/angular';
import { UploadPhotoService } from '../../services/upload-photo-service/upload-photo-service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-upimage',
	templateUrl: 'upimage.page.html',
	styleUrls: ['upimage.page.scss']
})
export class UpimagePage {
	// 控件
	classname: string = "UpimagePage";
	// 参数
	src: string = "";
	// 变量
	// 数据
	// 状态

	imagelist: any = [];
	constructor(
		private ups: UploadPhotoService,
		private events: Events,
		private alertCtrl: AlertController,
		private navCtrl: NavController,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
	) {
		this.route.queryParams.subscribe((params: Params) => {
			this.src = params.src;
		})

		this.events.subscribe('photo_upload' + this.classname, (dataurl) => {
			this.imagelist.push({
				base64data: dataurl
			});
			this.cdr.markForCheck();
			this.cdr.detectChanges();
		});
	}
	// 返回上一级页面
	goBack() {
		this.navCtrl.pop();
	}
	openalert() {
		this.alertCtrl.create({
			cssClass: 'reply_ctr_user changeavatar',
			buttons: [
				{
					text: '拍照',
					handler: data => {
						this.buttonClicked(0);
					}
				},
				{
					text: '从相册选择',
					handler: data => {
						this.buttonClicked(1);
					}
				}, '取消']
		}).then((alert) => {
			alert.present();
		});
	}

	buttonClicked(index) {
		let params = {
			index: index,
			quality: 90,
			allowEdit: this.src == "裁剪图片" ? true : false,
			targetWidth: 1024,
			targetHeight: 1024,
			src: "photoupload",
			classname: this.classname,
			iscancrop: this.src == "裁剪图片" ? true : false
		}
		this.ups.buttonClicked(params);
		return true;
	}
}
