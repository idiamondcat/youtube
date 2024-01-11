import { Component, DestroyRef, Input, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPageNumber } from '../../../redux/selectors/search.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  getNextVideos,
  getPrevVideos,
} from '../../../redux/actions/search.actions';
import { ITokens } from '../../../redux/state.models';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() tokens: ITokens | null;
  @Input() isDisabled = true;
  tokenChange$ = new Subject<string>();
  currentToken = '';
  currentPage = 1;
  destroyRef = inject(DestroyRef);

  constructor(private store: Store) {
    this.store
      .select(selectPageNumber)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.currentPage = res;
      });
  }

  onNext(): void {
    if (this.tokens?.nextPageToken) {
      this.currentToken = this.tokens?.nextPageToken || '';
      this.tokenChange$.next(this.currentToken);
      this.store.dispatch(getNextVideos());
    }
  }
  onPrev(): void {
    if (this.currentPage > 1) {
      this.currentToken = this.tokens?.prevPageToken || '';
      this.tokenChange$.next(this.currentToken);
      this.store.dispatch(getPrevVideos());
    }
  }
}
