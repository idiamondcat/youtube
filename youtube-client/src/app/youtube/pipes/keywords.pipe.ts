import { Pipe, PipeTransform } from '@angular/core';
import IItem from '../models/item';

@Pipe({
  name: 'keywords',
})
export class KeywordsPipe implements PipeTransform {
  transform(items: IItem[], value: string): IItem[] {
    return value === ''
      ? items
      : items.filter(
          (item) =>
            item.snippet.tags?.some((tag) =>
              tag.toLowerCase().includes(value.toLowerCase())
            )
        );
  }
}
