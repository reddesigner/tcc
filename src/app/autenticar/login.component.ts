import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_controllers/auth/service/auth.service';
import { MessageService } from '../_controllers/message/service/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginModel: any = {};
  public loginView = true;

  constructor(
    private serv: AuthService,
    private router: Router,
    private message: MessageService
  ) { }

  ngOnInit() {
  }

  onLogin() {
    // validação
    this.serv.login(this.loginModel).subscribe(
      (obj) => {
        //console.log('login.componente.ts ----- e ai... aconteceu algo?', obj);
        if (obj && obj.action && obj.action == 'logged in') {
          //console.log('login.componente.ts ----- logado... indo para /home!', obj.action);
          this.router.navigate(['/home/']);
        }
      }
    );
  }

  askForNewPassword() {
    // validação
    this.serv.newPassword(this.loginModel).subscribe(
      (obj) => {
        //console.log('login.componente.ts ----- e ai... aconteceu algo?', obj);
        if (obj && obj.action && obj.action == 'new password') {
          //console.log('login.componente.ts ----- logado... indo para /home!', obj.action);
          this.message.info(obj.message, true);
          this.changeView();
        }
      }
    );
  }

  changeView() {
    this.loginView = !this.loginView;
    this.loginModel = {};
  }

}
