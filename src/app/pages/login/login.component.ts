import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private snack:MatSnackBar, private login:LoginService, private router:Router){}

  loginData = {
    username : '',
    password: ''
  }

  formSubmit(){
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open("Username is required",'ok', {
        duration:2000,
        verticalPosition:'top'
      });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open("password is required",'ok', {
        duration:2000,
        verticalPosition:'top'
      });
      return;
    }

    // request to server to generate token

    this.login.generateToken(this.loginData).subscribe((data:any) => {
      console.log("success");
      console.log(data);
      // login
      this.login.loginUser(data.token);

      this.login.getCurrentUser().subscribe((user:any) => {
        this.login.setUser(user);
        console.log(user);

        // redirect -> ROLE - NORMAL -> admin dashboard
          if (this.login.getUserRole() == 'NORMAL'){
            // window.location.href='/normal'

              this.router.navigate(['user-dashboard'])
              this.login.loginStatusSubject.next(true)
              // window.location.reload();
          } else if (this.login.getUserRole() == 'ADMIN') {
              // window.location.href='/admin'
              this.router.navigate(['admin'])
              this.login.loginStatusSubject.next(true)
              // window.location.reload();

          }else {
           this.login.logout();
           // location.reload();
          }
      })

    }, (error) => {
      console.log(" error");
      this.snack.open("invalid details",'ok',{
          duration: 3000,
          verticalPosition:'top'
      })
    })
  }
}
