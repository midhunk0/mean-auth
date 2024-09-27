import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ["../../app.component.css"]
})
export class DashboardComponent {
    username: any="guest";
    constructor(private router: Router, private authService: AuthService){}

    ngOnInit(){
        this.authService.profileUserService().subscribe(
            (res: any)=>{
                this.username=res.user.name;
            },
            (err: any)=>{
                console.error(err.error.message);
            }
        )
    }

    doLogout(){
        this.authService.logoutUserService().subscribe(
            (res: any)=>{
                console.log(res.message)
                this.router.navigate(["./login"]);
            },
            (err: any)=>{
                console.error(err.error.message);
            }
        )
    }

    doEdit(){
        this.router.navigate(["./edit"]);
    }

    doDelete(){
        this.authService.deleteUserService().subscribe(
            (res: any)=>{
                console.log(res.message)
                this.router.navigate(["./register"]);
            },
            (err: any)=>{
                console.error(err.error.message);
            }
        )
    }
}
