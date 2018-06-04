import { Component } from '@angular/core';

import { AuthService } from './_controllers/auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public auth: AuthService,
    private router: Router
  ) {

  }

  onLogOut() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
