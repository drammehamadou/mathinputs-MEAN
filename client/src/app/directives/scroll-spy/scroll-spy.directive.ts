import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ScrollSpyService } from "./scroll-spy.service";

@Directive({
  selector: '[caeScrollSpy]'
})
export class ScrollSpyDirective implements AfterViewInit {

  @Input('caeScrollSpy') caeScrollSpy: string;

  constructor(private el: ElementRef, private scrollSpyService: ScrollSpyService) {}

  ngAfterViewInit() {
    this.onScroll(null);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const element: HTMLElement = this.el.nativeElement;
    const scrollTop = window.pageYOffset + 0.45 * window.innerHeight;
    const bodyRect = document.body.getBoundingClientRect();
    const elemRect = element.getBoundingClientRect();
    const elementOffsetTop = elemRect.top - bodyRect.top;

    let visible = false;
    if (
      (elementOffsetTop <= scrollTop && (elementOffsetTop + element.clientHeight) >= scrollTop)
      || (elemRect.top > 0 && elemRect.bottom < window.innerHeight)
    ) {
      visible = true;
    }

    this.scrollSpyService.setVisible(element.id, visible);
  }

}
