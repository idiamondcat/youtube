import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  template: `
    <button class="btn">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent {}
