import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appValidationIndicator]',
})
export class ValidationIndicatorDirective implements OnInit {
  constructor(
    private elem: ElementRef,
    private render: Renderer2,
    public control: NgControl
  ) {}

  ngOnInit(): void {
    this.addColor();
  }

  @HostListener('keyup', ['$event'])
  handleEvent(): void {
    this.addColor();
  }

  private addColor(): void {
    const { dirty, touched, invalid, valid } = this.control;
    if ((dirty || touched) && invalid) {
      this.render.removeClass(this.elem.nativeElement, 'color-valid');
      this.render.removeClass(this.elem.nativeElement, 'color-default');
      this.render.addClass(this.elem.nativeElement, 'color-error');
    } else if ((dirty || touched) && valid) {
      this.render.removeClass(this.elem.nativeElement, 'color-error');
      this.render.removeClass(this.elem.nativeElement, 'color-default');
      this.render.addClass(this.elem.nativeElement, 'color-valid');
    } else {
      this.render.removeClass(this.elem.nativeElement, 'color-error');
      this.render.removeClass(this.elem.nativeElement, 'color-valid');
      this.render.addClass(this.elem.nativeElement, 'color-default');
    }
  }
}
