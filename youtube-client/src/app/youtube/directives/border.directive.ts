import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBorder]',
})
export class BorderDirective implements OnInit {
  @Input() date: string | null | undefined;

  constructor(
    private elem: ElementRef,
    private render: Renderer2
  ) {}

  ngOnInit(): void {
    this.addColor();
  }

  private addColor(): void {
    const currDate: Date = new Date();
    if (this.date) {
      const videoDate: Date = new Date(this.date);
      const diff: number = Math.abs(currDate.getTime() - videoDate.getTime());
      const diffMonths: number = Math.ceil(diff / (1000 * 60 * 60 * 24 * 30));
      const diffDays: number = Math.ceil(diff / (1000 * 60 * 60 * 24));
      if (diffMonths < 6) {
        if (diffMonths > 1) {
          this.render.addClass(
            this.elem.nativeElement,
            'color-before-half-year'
          );
        } else {
          if (diffDays >= 7) {
            this.render.addClass(this.elem.nativeElement, 'color-before-month');
          } else {
            this.render.addClass(this.elem.nativeElement, 'color-new');
          }
        }
      } else {
        this.render.addClass(this.elem.nativeElement, 'color-after-half-year');
      }
    }
  }
}
