import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    isLoggedIn = false;
    user = this.login.getUser();


    constructor(public login: LoginService, private router: Router) { }

    ngOnInit(): void {
        this.user = this.login.getUser();
        this.isLoggedIn = this.login.isLoggedIn();
        this.login.loginStatusSubject.asObservable().subscribe((data) => {
            this.user = this.login.getUser();
            this.isLoggedIn = this.login.isLoggedIn();
        })
    }

    public logout() {
        this.login.logout();
        window.location.reload();
    }

}
