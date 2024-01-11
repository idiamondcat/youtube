import { Component, Input } from '@angular/core';
import IItem from '../../models/item';
import { Store } from '@ngrx/store';
import { toggle } from '../../../redux/actions/favorite.actions';
import { removeCard } from '../../../redux/actions/custom-card.actions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card: IItem;

  constructor(private store: Store) {}

  addtofavorite(): void {
    const id: string | null =
      typeof this.card.id === 'string' ? this.card.id : null;
    if (id) {
      this.store.dispatch(toggle({ id }));
    }
  }

  removeVideo(): void {
    if (typeof this.card.id === 'string') {
      this.store.dispatch(removeCard({ id: this.card.id }));
    }
  }
}
