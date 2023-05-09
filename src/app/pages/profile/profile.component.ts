import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
    user = this.login.getUser();

    constructor(private login : LoginService) {
    }

    ngOnInit(): void {
        // @ts-ignore
        this.user = this.login.getUser();
        //
        // this.login.getCurrentUser().subscribe((user) => {
        //     this.user = user;
        // },(error) => {
        //     alert(error);
        // })
    }

}
