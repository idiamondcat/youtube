import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { CustomButtonComponent } from '../shared/components/custom-button/custom-button.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { ShellComponent } from './components/shell/shell.component';
import { AuthModule } from '../auth/auth.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HeaderComponent, PageNotFoundComponent, ShellComponent],
  exports: [ShellComponent],
  imports: [
    CommonModule,
    RouterModule,
    SearchComponent,
    CustomButtonComponent,
    FormsModule,
    SharedModule,
    AuthModule,
    MatIconModule,
  ],
})
export class CoreModule {}
