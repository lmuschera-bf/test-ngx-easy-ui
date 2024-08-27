import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

export class EasyTestContext<T = unknown> {
    public $implicit: T = null!;
    public value: T = null!;
}

@Directive({ selector: '[easyTestProva]', standalone: true })
export class EasyTestDirective {

    private _context: EasyTestContext = new EasyTestContext();

    static ngTemplateGuard_easyTestProva: 'binding';

    /**
     * The Boolean expression to evaluate as the condition for showing a template.
     */
    @Input({required: true})
    set easyTestProva(value: unknown) {
        console.dir(value);
        this._context.$implicit = this._context.value = value;
        this._updateView();
    }

    @Input()
    set easyTestProvaEqual(value: unknown) {
        console.dir(value);
        this._context.$implicit = this._context.value = value;
        this._updateView();
    }

    constructor(public template: TemplateRef<any>, private viewContainer: ViewContainerRef) { 
        console.dir("Hello EasyTestDirective");
    }

    private _updateView(): void {
        console.dir(this._context);
        if (this._context.$implicit) {
            this.viewContainer.createEmbeddedView(
                this.template,
                this._context,
            );
        }
    }
}

