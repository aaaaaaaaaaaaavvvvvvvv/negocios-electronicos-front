import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  login() {
   /* this.loginService.login(this.email, this.password)
      .then( res => {
        this.router.navigate(['/']);
      })
      .catch(error =>{
        this.mensajeerror='Las credenciales son incorrectas.';
        this.flashMessages.show(error.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
      });*/
  }

}
