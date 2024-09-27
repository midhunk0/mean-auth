import { Component } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
    standalone: true,
    selector: "app-edit",
    templateUrl: "./edit.component.html",
    styleUrls: ["../../app.component.css"],
    imports: [FormsModule]
})

export class EditComponent{
    constructor(private router: Router, private authService: AuthService){}

    goBack(){
        this.router.navigate(["./dashboard"]);
    }

    doUpdate(updateData: NgForm){
        const { name }=updateData.value;
        this.authService.updateUserService({ name }).subscribe(
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