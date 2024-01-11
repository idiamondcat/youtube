import { Component } from '@angular/core';
import { OpenFiltersService } from '../../services/open-filters.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private openFiltersService: OpenFiltersService,
    private router: Router,
    public auth: AuthService
  ) {}

  showSettingsFn(): void {
    this.openFiltersService.changeState();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.auth.isLogin.next(false);
    this.router.navigate(['auth']);
  }
}
