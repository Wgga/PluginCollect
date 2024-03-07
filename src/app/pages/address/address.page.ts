import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

declare var Swiper: any;
@Component({
	selector: 'app-address',
	templateUrl: 'address.page.html',
	styleUrls: ['address.page.scss']
})
export class AddressPage {
	// 控件
	@ViewChild('citynamelist', { static: false }) citynamelist: any;
	timeout: any = null;
	swiper: any = null;
	// 参数
	loop: number = 0;
	maxloop: number = 50;
	// 变量
	current_letter: string = '';
	current_page: number = 0;
	offsetLeft: number = 20;
	selcitytext: string = '选择地址';
	// 数据
	seldata: any[] = [];
	citydata: any[] = [];
	// 状态
	showpopup: boolean = false;
	setdisplay: boolean = true;

	constructor(
		private navCtrl: NavController,
		private alertCtrl: AlertController,
		private http: HttpClient,

	) { }
	// 返回上一级页面
	goBack() {
		this.navCtrl.pop();
	}
	ngOnInit() {
		let params = {
			method: "getcitylist",
			code: 0,
			level: 0
		}
		this.getcitylist(params, 0);
		this.setSwiper(this);
	}
	// 初始化swiper
	setSwiper(that) {
		this.swiper = new Swiper('.swiper', {
			on: {
				slideChangeTransitionStart: function () {
					that.toggle_page(this.activeIndex, "slideChangeTransitionStart");
				},
			},
		})
	}
	// 显示选择地址弹出框
	showaddresspopup() {
		this.setdisplay = false;
		setTimeout(() => { this.showpopup = true; }, 100);
	}
	// 隐藏选择地址弹出框
	hideaddresspopup() {
		this.showpopup = false;
		setTimeout(() => { this.setdisplay = true; }, 300);
	}
	// 获取城市列表
	getcitylist(params: any, index: number) {
		this.http.post("http://192.168.2.54/app/city.php", params)
		.subscribe((resp_data: any) => {
			if (resp_data.msg == "OK") {
				this.citydata[index] = resp_data;
				this.current_letter = resp_data.letters[0];
				this.seldata.push({ city_code: 0, city_name: '请选择' });
				setTimeout(() => {
					this.swiper.updateSlides();
					this.swiper.slideTo(this.current_page, 500, false);
					this.setoffsetLeft();
				}, 50)
			} else {
				this.current_page = 0;
				this.alertCtrl.create({ header: '请注意', cssClass: 'address_tip', message: resp_data.msg.replace(/\n/g, '<br>'), buttons: ['确定'] }).then((alert) => { alert.present() });
			}
		});
	}
	// 选择字母
	select_letter(letter: string, index: number) {
		this.current_letter = letter;
		this.scrolltoid(`letter${letter}${index}`);
	}
	// 滚动到指定元素
	scrolltoid(id) {
		let el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		} else if (this.loop++ < this.maxloop) {
			this.scrolltoid(id);
		}
	}
	// 选择城市
	select_city(item: any) {
		if (this.seldata[this.current_page].city_code != item.city_code) {
			const spliceIndex = this.current_page + 1;
			this.seldata.splice(spliceIndex, this.seldata.length - spliceIndex);
		}
		this.seldata[this.current_page] = item;
		if (this.seldata.length == 4) {
			this.hideaddresspopup();
			this.selcitytext = this.seldata.map(item => item["city_name"]).join("");
		}
		if (this.current_page >= 3) return;
		this.current_page++;
		let params = {
			method: "getcitylist",
			code: this.seldata[this.current_page - 1].city_code,
			level: this.current_page
		}
		this.getcitylist(params, this.current_page);
	}
	// 切换页面
	toggle_page(index: number, type = null) {
		if (this.current_page == index) return;
		this.current_page = index;
		this.swiper.slideTo(this.current_page, 500, false);
		this.setoffsetLeft();
	}
	// 设置指示器偏移量
	setoffsetLeft() {
		const current_name = this.citynamelist.nativeElement.children[this.current_page]
		if (current_name) {
			this.offsetLeft = current_name.offsetLeft;
		}
	}
}
