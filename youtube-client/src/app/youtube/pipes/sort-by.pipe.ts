import { Pipe, PipeTransform } from '@angular/core';
import IItem from '../models/item';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(items: IItem[], sortMethod: string, isASC: boolean): IItem[] {
    const sortItems: IItem[] = [...items];
    switch (sortMethod) {
      case 'date':
        return sortItems.sort((prev, next) => {
          return isASC
            ? Date.parse(prev.snippet.publishedAt) -
                Date.parse(next.snippet.publishedAt)
            : Date.parse(next.snippet.publishedAt) -
                Date.parse(prev.snippet.publishedAt);
        });
        break;
      case 'views':
        return sortItems.sort((prev, next) => {
          return isASC
            ? Number(prev.statistics?.viewCount) -
                Number(next.statistics?.viewCount)
            : Number(next.statistics?.viewCount) -
                Number(prev.statistics?.viewCount);
        });
        break;
      default:
        return sortItems;
        break;
    }
  }
}
