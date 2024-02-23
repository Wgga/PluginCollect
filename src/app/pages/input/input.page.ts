import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NavController, IonContent } from '@ionic/angular';
import { EditorService } from '../../services/editor-service/editor-service';

@Component({
	selector: 'app-input',
	templateUrl: './input.page.html',
	styleUrls: ['./input.page.scss'],
})
export class InputPage {
	// 控件
	@ViewChild(IonContent, { static: true }) content: IonContent;
	@ViewChild("editor", { static: false }) editor;
	classname = 'InputPage';
	quill: any;    // Quill编辑器实例
	// 变量
	send_content: string = ''; // 输入框内容
	contentlist: any = []; // 内容列表
	placeholderH: number = 0; // 占位高度
	keyboardH: number = 0; // 键盘高度
	// 数据
	// 编辑器数据
	editordata: any = {
		showbtn: false,
		showemo: false,
		selheight: 0,
		editorH: 0,
		emolist: []
	};
	// 功能按钮列表
	btnlist: any = [
		// {id: 1, icon: '', text: '发送订单'},
		{ id: 2, icon: 'iconphoto2', text: '相册' },
		{ id: 3, icon: 'iconcamera', text: '拍照' },
		// {id: 4, icon: 'iconshopcart', text: '购物车'}
	];
	// 状态
	cansend: boolean = false;

	constructor(
		private navCtrl: NavController,
		private cdr: ChangeDetectorRef,
		private editors: EditorService,

	) { }

	ionViewDidEnter() {
		this.initEditor()
	}

	// 返回上一级页面
	goBack() {
		this.navCtrl.pop()
	}

	// 初始化编辑器
	initEditor() {
		// 初始化Quill实例
		this.quill = new (window as any).Quill("#editor_con", {
			placeholder: "请输入想咨询的问题"
		})
		// 点击编辑器区域，输入框聚焦改变各值状态
		this.quill.root.addEventListener("click", (ev) => {
			this.focus("input");
		})
		this.quill.on("text-change", () => {
			setTimeout(()=>{
				this.send_content = this.quill.getSemanticHTML();
				if (this.quill.getLength() > 1 && !this.cansend){
					this.cansend = true;
				}else if(this.quill.getLength() == 1){
					this.cansend = false;
				}
			},100)
		})
		// 初始化编辑器数据
		this.editors.initEditor({
			pageid: this.classname,
			btnlistlen: this.btnlist.length,
			editorElement: this.editor['nativeElement'],
			contentElement: this.content,
			quill: this.quill
		});
		// 获取编辑器数据
		this.editordata = this.editors.getEditordata(this.classname);
		// 初始化键盘高度
		if ((window as any).Keyboard && typeof (window as any).Keyboard.openHeightProvider === 'function') {
			(window as any).Keyboard.openHeightProvider(null, (success) => {
				this.keyboardH = success.height;
				this.setPlaceholderH();
			}, (error) => {
				console.log(JSON.stringify(error));
			});
		}
	}

	// 关闭表情/键盘弹窗
	closepopup(ev) {
		if (ev) ev.stopPropagation();
		this.editordata = this.editors.closepopup(this.classname);
		this.setPlaceholderH();
	}

	// 设置表情/键盘弹窗占位高度
	setPlaceholderH() {
		if (this.editordata.selheight && this.keyboardH == 0) {
			this.placeholderH = this.editordata.selheight;
		} else {
			this.placeholderH = this.keyboardH;
		}
		this.cdr.markForCheck();
		this.cdr.detectChanges();
	}

	// 点击输入框显示键盘或者表情弹窗
	focus(type, index = null) {
		if (type == "input") {
			this.editordata = this.editors.seteditor(this.classname, type);
			setTimeout(() => { this.content.scrollToBottom(0); }, 400);
		} else {
			this.editordata = this.editors.showmore(this.classname, index);
			this.setPlaceholderH();
		}
	}

	// 点击表情弹窗中的表情添加至输入框
	setinputval(type, x = null) {
		if (type == "emoticon") {
			this.editors.addemoticon(this.classname, x);
		} else {
			this.editors.backspace(this.classname);
		}
	}

	// 点击功能按钮
	clickmorebtn(x) {
		// if(x.id == 2)
		// 	this.buttonClicked(1);
		// else if(x.id == 3)
		// 	this.buttonClicked(0);
	}

	// 发送消息
	publish() {
		this.send_content = this.quill.getSemanticHTML();
		this.contentlist.push({
			content: this.send_content,
			time: new Date().getTime()
		})
		this.quill.setText('');
	}

	// 页面销毁关闭键盘高度监听
	ngOnDestroy() {
		if ((window as any).Keyboard && typeof (window as any).Keyboard.closeHeightProvider === 'function') {
			(window as any).Keyboard.closeHeightProvider();
		}
	}
}
