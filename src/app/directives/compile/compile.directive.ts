import { Directive, ElementRef, Input } from "@angular/core";
import { Router } from "@angular/router";
/**
 * Generated class for the CompileDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
	selector: '[compilekefuhtml]' // Attribute selector
})
export class CompileDirective {
	private _element: HTMLElement;
	private router: Router;
	constructor(element: ElementRef, router: Router) {
		this._element = element.nativeElement;
		this.router = router;
	}

	//20240222 shibo:处理客服页面发送的html标签
	@Input() set compilekefuhtml(content: string) {
		if (content == null){
			this._element.innerHTML = '';
		}
		this._element.innerHTML = content.replace(/\n|\\n/g, "<p>").replace(/<(?!br|img|p|\/p).*?>/gi, '');
	}
}