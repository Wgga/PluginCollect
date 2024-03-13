import { Component } from '@angular/core';
import { Router } from '@angular/router';

// declare var ImagePicker: any;
@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage {
	// 控件
	classname: string = "HomePage";
	// 参数
	// 变量
	// 数据
	btnlist: any = [
		{ id: 1, text: "选择地址" },
		{ id: 2, text: "多选图片" },
		{ id: 3, text: "选择图片" },
		{ id: 4, text: "裁剪图片" },
		{ id: 5, text: "表情键盘" },
		{ id: 6, text: "扫码页面" },
		{ id: 7, text: "显示弹窗" },
	];
	// 状态

	constructor(
		private router: Router,
	) { }

	clickbtn(x: any) {
		switch (x.id) {
			case 1:
				this.router.navigate(['/address']);
				break;
			case 2:
				this.router.navigate(['/upimage'], { queryParams: { src: x.text } });
				break;
			case 3:
				this.router.navigate(['/upimage'], { queryParams: { src: x.text } });
				break;
			case 4:
				this.router.navigate(['/upimage'], { queryParams: { src: x.text } });
				break;
			case 5:
				this.router.navigate(['/input']);
				break;
			case 6:
				this.startScan();
				break;
			case 7:
				this.showToast("Hello World");
				break;
			default:
				break;
		}
	}

	// 扫码
	startScan(){
		if(!(window as any).scan) return;
		(window as any).scan.recognize((success: any)=>{
			this.showToast("扫码成功" + JSON.stringify(success));
		},(error: any)=>{
			this.showToast("扫码失败" + JSON.stringify(error));
		});
	}

	// 显示弹窗
	showToast(message: string) {
		if (!(window as any).ThsToast) return;
		(window as any).ThsToast.show(message);
	}
}
