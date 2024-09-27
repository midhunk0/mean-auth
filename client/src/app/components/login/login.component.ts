import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ["../../app.component.css"]
})
export class LoginComponent {
    visible: any={ password: false, confirmPassword: false };
    constructor(private router: Router, private authService: AuthService){}

    toggleVisibility(field: string){
        this.visible[field]=!this.visible[field];
    }

    toRegister(){
        this.router.navigate(["./register"]);
    }

    doLogin(loginData: NgForm){
        const { credential, password }=loginData.value;
        this.authService.loginUserService({ credential, password }).subscribe(
            (res: any)=>{
                console.log(res.message)
                this.router.navigate(["./dashboard"]);
            },
            (err: any)=>{
                console.error(err.error.message);
            }
        )
    }
}
