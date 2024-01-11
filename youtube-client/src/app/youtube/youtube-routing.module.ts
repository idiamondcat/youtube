import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ContentComponent } from './pages/content/content.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'details/:id', component: ContentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoutubeRoutingModule {}
