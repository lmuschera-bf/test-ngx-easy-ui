import { Component, Directive, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewContainerRef, inject } from "@angular/core";

@Directive({
    standalone: true,
    selector: 'option[option]',
})
export class Option {

    private readonly viewRef: ViewContainerRef = inject(ViewContainerRef);
    constructor(public readonly template: TemplateRef<any>) {
        this.viewRef.createEmbeddedView(template, { value: 'a' });
    }
}

@Component({
    selector: 'option',
    standalone: true,
    template: '<div>option</div>'
})
export class EasyOption<T> {
    @Input() value!: T;
    @Output() contextChange = new EventEmitter<T>();
    @ViewChild('input') input!: ElementRef<HTMLInputElement>;

    ngAfterContentInit(): void {
        console.dir(this.value);
    }
}