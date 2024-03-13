import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
	selector: 'app-person',
	templateUrl: 'person.page.html',
	styleUrls: ['person.page.scss']
})
export class PersonPage {
	// 控件
	classname: string = "PersonPage";
	// 参数
	// 变量
	// 数据
	btnlist: any = [
		{ id: 1, text: "微博" },
		{ id: 2, text: "QQ" },
	];
	// 状态

	constructor(
		private router: Router,
	) { }

	clickbtn(x: any) {
		switch (x.id) {
			case 1:
				this.router.navigate(['/wbsdk']);
				break;
			case 2:
				this.router.navigate(['/qqsdk']);
				break;
			default:
				break;
		}
	}
}
