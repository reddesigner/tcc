import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_controllers/auth/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginModel: any = {};

  constructor(
    private serv: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin() {
    // validação
    this.serv.login(this.loginModel).subscribe(
      (obj) => {
        //console.log('login.componente.ts ----- e ai... aconteceu algo?', obj);
        if (obj.action && obj.action == 'logged in') {
          //console.log('login.componente.ts ----- logado... indo para /home!', obj.action);
          this.router.navigate(['/home/']);
        }
      }
    );
  }

}
