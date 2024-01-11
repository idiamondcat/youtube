import {
  Component,
  DestroyRef,
  OnInit,
  Signal,
  ViewChild,
  inject,
} from '@angular/core';
import ISort from '../../models/sort';
import { OpenFiltersService } from '../../../core/services/open-filters.service';
import {
  Observable,
  combineLatest,
  debounceTime,
  filter,
  map,
  startWith,
} from 'rxjs';
import IItem from '../../models/item';
import { Store } from '@ngrx/store';
import {
  selectCombineCards,
  selectTokens,
} from '../../../redux/selectors/search.selectors';
import { SearchService } from '../../../core/services/search.service';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { search } from '../../../redux/actions/search.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ITokens } from '../../../redux/state.models';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public data: Observable<IItem[] | null>;
  public inputVal = '';
  public sortMethod = '';
  public isASC = true;
  public keyword = '';
  public isShow: Signal<boolean> = this.openFiltersService.currState;
  public tokens: Observable<ITokens>;
  private minLength = 3;
  destroyRef = inject(DestroyRef);
  @ViewChild(PaginatorComponent, { static: true })
  paginator: PaginatorComponent;

  constructor(
    private openFiltersService: OpenFiltersService,
    private store: Store,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.data = this.store.select(selectCombineCards);
    this.tokens = this.store.select(selectTokens);
    const searchStr = this.searchService.search$.pipe(
      debounceTime(500),
      filter((val) => val.length > this.minLength)
    );
    combineLatest({
      searchText: searchStr,
      token: this.paginator.tokenChange$.pipe(startWith('')),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => this.store.dispatch(search(res)));
  }

  changeSort(evt: ISort): void {
    this.sortMethod = evt.sortBy;
    this.isASC = evt.isASC;
  }

  showByKeyword(evt: string): void {
    this.keyword = evt;
  }
}
