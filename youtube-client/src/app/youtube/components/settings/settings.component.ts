import { Component, EventEmitter, Output } from '@angular/core';
import ISort from '../../models/sort';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  private isASC = true;

  @Output() sortMethodEvt = new EventEmitter<ISort>();
  @Output() findByKeywordEvt = new EventEmitter<string>();

  sort(val: string): void {
    if (this.isASC) this.isASC = false;
    else this.isASC = true;
    this.sortMethodEvt.emit({ sortBy: val, isASC: this.isASC });
  }

  searchKeyword(val: string): void {
    this.findByKeywordEvt.emit(val);
  }
}
