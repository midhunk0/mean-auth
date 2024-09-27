import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })

export class AuthService{
    private apiUrl="http://localhost:8000";
    
    constructor(private http: HttpClient){}

    registerUserService(userData: any){
        return this.http.post(`${this.apiUrl}/register`, userData, { withCredentials: true });
    }

    loginUserService(userData: any){
        return this.http.post(`${this.apiUrl}/login`, userData, { withCredentials: true });
    }

    profileUserService(){
        return this.http.get(`${this.apiUrl}/profile`, { withCredentials: true });
    }

    updateUserService(userData: any){
        return this.http.put(`${this.apiUrl}/update`, userData, { withCredentials: true });
    }

    logoutUserService(){
        return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
    }

    deleteUserService(){
        return this.http.delete(`${this.apiUrl}/delete`, { withCredentials: true });
    }
}