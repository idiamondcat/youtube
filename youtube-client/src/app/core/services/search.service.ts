import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchSubj = new BehaviorSubject<string>('');
  public search$ = this.searchSubj.asObservable();

  public searchFn(value: string): void {
    this.searchSubj.next(value);
  }
}
