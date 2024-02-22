import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EditorService {

	// 参数数据
	private params: any = {
		'default': {
			pageid: '', // 页面id
			btnlistlen: 0, // 功能按钮列表长度
			emolistlen: 0, // 表情列表长度
			editorElement: null, // 输入框
			quill: null, // Quill编辑器实例
		}
	}

	// 需要返回的数据
	private editordata: any = {
		'default': {
			showbtn: false, // 是否显示更多功能按钮
			showemo: false, // 是否显示表情弹窗
			selheight: 0, // 当前表情弹窗的高度
			editorH: 0, // 输入框高度
			emolist: [], // 表情列表
		}
	}

	constructor(
		private http: HttpClient,
	) { }

	// 初始化编辑器数据
	initEditor(data: any) {
		this.params[data.pageid] = data;
		this.editordata[data.pageid] = {
			showbtn: false,
			showemo: false,
			selheight: 0,
			emolist: [],
		};
		// 获取表情列表
		this.http.get("http://192.168.2.54/app/emoji.php?method=getemojilist").subscribe((resp_data: any) => {
			this.editordata[data.pageid].emolist = resp_data;
			this.params[data.pageid].emolistlen = resp_data.length;
		});
		// 获取输入框高度
		this.editordata[data.pageid].editorH = this.editordata[data.pageid].selheight + document.querySelector(".new_textarea_footer").getBoundingClientRect().height;
	}

	// 关闭表情/键盘弹窗
	closepopup(pageid: string) {
		this.editordata[pageid].showbtn = false;
		this.editordata[pageid].showemo = false;
		this.editordata[pageid].selheight = 0;
		this.editordata[pageid].editorH = this.editordata[pageid].selheight + document.querySelector(".new_textarea_footer").getBoundingClientRect().height;
		return this.editordata[pageid];
	}

	// 显示表情弹窗或更多功能按钮
	showmore(pageid: string, index: number) {
		if (index == 0) {
			this.editordata[pageid].showemo = false;
			this.editordata[pageid].showbtn = !this.editordata[pageid].showbtn;
			this.editordata[pageid].selheight = this.editordata[pageid].showbtn ? (100 * Math.ceil(this.params[pageid].btnlistlen / 4)) + 25 : 0;
		} else {
			this.editordata[pageid].showbtn = false;
			this.editordata[pageid].showemo = !this.editordata[pageid].showemo;
			if (!this.editordata[pageid].showemo) this.params[pageid].editorElement.focus();
			this.editordata[pageid].selheight = this.editordata[pageid].showemo ? (45 * Math.ceil(this.params[pageid].emolistlen / 8)) + 25 : 0;
		}
		this.editordata[pageid].selheight = this.editordata[pageid].selheight > 300 ? 300 : this.editordata[pageid].selheight;
		this.editordata[pageid].editorH = this.editordata[pageid].selheight + document.querySelector(".new_textarea_footer").getBoundingClientRect().height;
		return this.editordata[pageid];
	}

	// 设置输入框焦点
	seteditor(pageid, type) {
		if (type) {
			this.params[pageid].quill.focus();
			this.editordata[pageid].selheight = 0;
			this.editordata[pageid].showbtn = false;
			this.editordata[pageid].showemo = false;
		}
		return this.editordata[pageid];
	}

	// 删除光标前一个字符
	backspace(pageid: string) {
		const rangeIndex = this.params[pageid].quill.getSelection(true).index;
		this.params[pageid].quill.deleteText(rangeIndex - 1, 1);
		this.params[pageid].quill.blur();
	}

	// 添加表情至输入框
	addemoticon(pageid: string, x: any) {
		const rangeIndex = this.params[pageid].quill.getSelection(true).index;
		this.params[pageid].quill.insertEmbed(rangeIndex, 'image', `http://192.168.2.54/${x.emoji_url}`);
		let currentemote = this.params[pageid].quill.getLeaf(rangeIndex+1)[0].domNode;
		currentemote.setAttribute('class', 'emoticon');
		this.params[pageid].quill.setSelection(rangeIndex + 1);
		this.params[pageid].quill.blur();
	}

	// 获取编辑器数据
	getEditordata(pageid: string) {
		return this.editordata[pageid];
	}
}