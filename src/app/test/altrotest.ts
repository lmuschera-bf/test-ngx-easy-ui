import { AfterContentInit, Component, Directive, Injector, TemplateRef, Type, ViewContainerRef, inject } from "@angular/core";

@Component({
    selector: 'div',
    template: '<div>altro test</div>'
})
export class ____TestComponent {
    private readonly altroTestDirective: AltroTestDirective = inject(AltroTestDirective);

    constructor() {
        console.dir("Hello ____TestComponent!");
        console.dir(this.altroTestDirective);
    }
}

@Directive({ selector: '[altroTest]', standalone: true })
export class AltroTestDirective implements AfterContentInit {

    private readonly injector: Injector = inject(Injector);

    constructor(public template: TemplateRef<any>, private viewContainer: ViewContainerRef) {
        console.dir("Hello AltroTestDirective!");
    }

    ngAfterContentInit(): void {
        console.dir(this.viewContainer);
        this.viewContainer.createComponent(____TestComponent, { injector: this.injector });
    }
}