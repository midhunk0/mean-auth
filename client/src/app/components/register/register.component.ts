import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ["../../app.component.css"]
})
export class RegisterComponent {
    visible: any={ password: false, confirmPassword: false };
    constructor(private router: Router, private authService: AuthService){}

    toggleVisibility(field: string){
        this.visible[field]=!this.visible[field];
    }

    toLogin(){
        this.router.navigate(["./login"]);
    }

    doRegister(registerData: NgForm){
        const { name, username, email, password, confirmPassword }=registerData.value;
        this.authService.registerUserService({ name, username, email, password, confirmPassword }).subscribe(
            (res: any)=>{
                console.log(res.message)
                this.router.navigate(["./dashboard"]);
            },
            (err)=>{
                console.error(err.error.message);
            }
        )
    }
}
