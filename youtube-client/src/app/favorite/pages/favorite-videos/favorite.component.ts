import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFavoriteObj } from '../../../redux/selectors/search.selectors';
import IItem from '../../../youtube/models/item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  public data: Observable<IItem[] | null>;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.data = this.store.select(selectFavoriteObj);
  }
}
