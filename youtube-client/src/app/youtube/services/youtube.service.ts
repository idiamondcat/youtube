import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import IResp from '../models/resp';
import IItem from '../models/item';
import { IStoreObject, ITokens } from '../../redux/state.models';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private http: HttpClient) {}

  searchItems(val: string, token: string): Observable<IStoreObject> {
    let tokens: ITokens;
    const currToken = token ? token : '';
    const params: HttpParams = new HttpParams()
      .set('maxResults', 20)
      .set('type', 'video')
      .set('part', 'snippet')
      .set('q', val)
      .set('pageToken', currToken);
    return this.http.get<IResp>('search', { params }).pipe(
      map((data) => {
        const itemsIds: string = data.items
          .map((item) => {
            const itemId: string =
              typeof item.id === 'string' ? item.id : item.id.videoId;
            return itemId;
          })
          .join(',');
        tokens = this.getTokens(data);
        return itemsIds;
      }),
      switchMap((itemsIds: string) => {
        return this.getItems(itemsIds);
      }),
      map((elems: IResp) => ({ items: this.changeData(elems), tokens })),
      catchError((err) => {
        console.log(err);
        return of(err);
      })
    );
  }

  changeData(data: IResp): { [key: string]: IItem } {
    return data.items.reduce(
      (acc, curr) => {
        acc[curr.id as unknown as string] = curr;
        return acc;
      },
      {} as { [key: string]: IItem }
    );
  }

  getTokens(data: IResp): ITokens {
    const { nextPageToken, prevPageToken } = data;
    return { nextPageToken, prevPageToken };
  }

  getItems(id: string): Observable<IResp> {
    const params: HttpParams = new HttpParams()
      .set('id', id)
      .set('part', 'snippet,statistics');
    return this.http.get<IResp>('videos', { params }).pipe(
      catchError((err) => {
        console.log(err);
        return of(err);
      })
    );
  }
}
