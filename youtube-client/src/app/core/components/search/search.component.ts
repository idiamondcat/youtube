import { Component } from '@angular/core';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [CustomButtonComponent],
})
export class SearchComponent {
  constructor(private searchService: SearchService) {}

  search(val: string): void {
    this.searchService.searchFn(val);
  }
}
