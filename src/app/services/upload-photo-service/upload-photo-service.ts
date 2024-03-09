import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Platform, Events, AlertController, ToastController } from "@ionic/angular";
// import { PermissionService } from '../../services/permission-service/permission-service';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

declare var ucrop: any;
/*
  Generated class for the UploadPhotoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UploadPhotoService {
	public user: any = { uid: 0, token: null };
	public myImage: string = '';
	public params: any = {
		index: 0,
		quality: 0,
		allowEdit: true,
		targetWidth: 0,
		targetHeight: 0,
		src: "",
		iscancrop: false
	}
	public isandroid: boolean = false;
	public isios: boolean = false;

	constructor(
		public http: HttpClient,
		public events: Events,
		// private perService: PermissionService,
		private platform: Platform,
		private camera: Camera,
		private file: File,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
	) {
		this.isandroid = this.platform.is('android');
		this.isios = this.platform.is('ios');
	}

	async buttonClicked(params) {
		// let type = params.index == 0 ? 'camera' : 'write';
		// if(!(await this.perService.checkPermission(type))) return;
		this.params = params;
		var source = this.camera.PictureSourceType.PHOTOLIBRARY;
		if (params.index == 0)//相机
			source = this.camera.PictureSourceType.CAMERA;
		var options: CameraOptions = {
			quality: params.quality,
			// encodingType: this.camera.EncodingType.JPEG,
			sourceType: source,
			mediaType: this.camera.MediaType.ALLMEDIA,
			destinationType: this.camera.DestinationType.DATA_URL,
			allowEdit: params.allowEdit,
			targetWidth: params.targetWidth,
			targetHeight: params.targetHeight,
			correctOrientation: true // 自动切换正确方向
		};
		//20211212 shibo:安卓11用户换头像有问题，需要关闭allowEdit,并用Crop插件替换allowEdit功能
		//destinationType的返回DATA_URL改为FILE_URI，因为Crop插件不支持裁剪base64格式图片
		if (params.iscancrop && this.isandroid) {
			options.allowEdit = false;
			options.destinationType = this.camera.DestinationType.FILE_URI;
		}
		this.camera.getPicture(options).then((fileuri) => {
			if (params.iscancrop && this.isandroid) {
				let cropoptions = {
					quality: options.quality,
					isforbidCropGifWebp: true,
					isfreeStyleCropEnabled: true,
				};
				ucrop.cropImage((path) => {
					this.uploadpic(path);
				}, (err) => {
					this.alertCtrl.create({ header: '请注意', cssClass: 'address_tip', message: JSON.stringify(err), buttons: ['确定'] }).then((alert) => { alert.present() });
				}, fileuri, cropoptions);
			} else {
				this.uploadpic(fileuri);
			}
		}, (err) => {
			this.alertCtrl.create({ header: '请注意', cssClass: 'address_tip', message: JSON.stringify(err), buttons: ['确定'] }).then((alert) => { alert.present() });
		})
	}

	//虽然选的是DATA_URL，但是小米手机出来的结果可能是文件路径
	uploadpic(fileuri) {
		if (fileuri.length < 255 && fileuri.indexOf('/storage/') >= 0) {
			var extStart = fileuri.lastIndexOf(".");
			if (extStart > 0) {
				var ext = fileuri.substr(extStart, 4).toUpperCase();
				if (ext == ".BMP" || ext == ".PNG" || ext == ".GIF" || ext == ".JPG" || ext == ".JPE" || ext == ".TIF") {
					//this.toastCtrl.create({message: '图片限于bmp,png,gif,jpeg,jpg,tiff格式',duration:2000}).then((toast)=>{toast.present()});
					//根据图片文件名字上传,小米手机上传下载的图片有这个问题
					this.uploadpic_by_fileuri(fileuri);
					return;
				}
			}
		}
		this.uploadpic_by_dataurl('data:image/jpeg;base64,' + fileuri);
	}
	uploadpic_by_fileuri(fullname) {
		let fileName = fullname.split('/').pop();
		let path = fullname.replace(fileName, '').replace('file://', '');
		let pos = fileName.indexOf('?');
		if (pos > 0)
			fileName = fileName.substr(0, pos);

		this.file.readAsDataURL('file://' + path, fileName).then((dataurl) => {
			this.uploadpic_by_dataurl(dataurl);
		}, (err) => {
			this.alertCtrl.create({ header: '请注意', cssClass: 'address_tip', message: JSON.stringify(err), buttons: ['确定'] }).then((alert) => { alert.present() });
		})
	}
	uploadpic_by_dataurl(dataurl) {
		this.myImage = dataurl;
		if (this.params.src == "photoupload") {
			this.events.publish('photo_upload' + this.params.classname, this.myImage);
		}
	}
}
