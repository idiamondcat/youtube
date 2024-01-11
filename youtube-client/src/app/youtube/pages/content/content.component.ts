import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import IItem from '../../models/item';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { selectVideoById } from '../../../redux/selectors/search.selectors';
import { removeCard } from '../../../redux/actions/custom-card.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  private id: string;
  public video$: Observable<IItem | null>;
  public safeUrl: SafeUrl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.id = params.id));
    this.video$ = this.store.select(selectVideoById(this.id));
    const url = `https://www.youtube.com/embed/${this.id}`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  removeVideo(): void {
    this.store.dispatch(removeCard({ id: this.id }));
    this.router.navigate(['/']);
  }
}
