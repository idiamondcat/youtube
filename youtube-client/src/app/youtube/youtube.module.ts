import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CustomButtonComponent } from '../shared/components/custom-button/custom-button.component';
import { KeywordsPipe } from './pipes/keywords.pipe';
import { YoutubeRoutingModule } from './youtube-routing.module';
import { ContentComponent } from './pages/content/content.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MatIconModule } from '@angular/material/icon';
import { SortByPipe } from './pipes/sort-by.pipe';
import { BorderDirective } from './directives/border.directive';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../redux/reducers/main';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [
    CardComponent,
    SettingsComponent,
    MainPageComponent,
    ContentComponent,
    PaginatorComponent,
    KeywordsPipe,
    SortByPipe,
    BorderDirective,
  ],
  exports: [CardComponent, MainPageComponent],
  imports: [
    CommonModule,
    CustomButtonComponent,
    YoutubeRoutingModule,
    MatIconModule,
    StoreModule.forFeature('videos', reducers),
  ],
})
export class YoutubeModule {}
