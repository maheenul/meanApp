import {Injectable} from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: "root"})

export class AuthService{

  constructor(
    private http:HttpClient,
    private router: Router

    ){

  }

  private tokenTimer: any
  private token;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;

  getIsAuth(){
    return this.isAuthenticated;
  }

  createUser(email:string, password: string){
    const authData: AuthData = {
      email:email,
      password:password
    };
    this.http.post("http://localhost:3000/api/user/signup",authData)
    .subscribe(
      response=>{
        console.log(response);
      }
    )
  }

  login(email:string, password:string){
    const authData: AuthData = {
      email:email,
      password:password
    };

    this.http.post<{token:string,expiresIn:number}>("http://localhost:3000/api/user/login",authData)
    .subscribe(resp=>{
      const token = resp.token;
      this.token = token;

      if(token){

        const expiresIn = resp.expiresIn;
        console.log(expiresIn);

        this.setAuthTimer(expiresIn);

        this.isAuthenticated=true;
        this.authStatusListener.next(this.isAuthenticated);

        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresIn*1000);
        this.saveAuthData(token, expirationDate);

        this.router.navigate(["/"]);
      }

    })
  }

  logout(){
    this.token = null;
    this.isAuthenticated=false;
    console.log("logout service");
    this.authStatusListener.next(this.isAuthenticated);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  getToken(){
    console.log(this.token)
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusListener.next(true);

    }
  }

  private setAuthTimer(duration:number){
    console.log("Setting timer : " + duration);
    this.tokenTimer = setTimeout(()=>{
      this.logout();
    }, duration*1000 );
  }

  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationDate.toISOString());
    console.log(expirationDate);
  }

 private clearAuthData(){
   localStorage.removeItem("token");
   localStorage.removeItem("expiration");
 }

 private getAuthData(){
   const token = localStorage.getItem("token");
   const expirationDate = localStorage.getItem("expiration");
   if(!token || !expirationDate){
     return;
   }
   return{
     token: token,
     expirationDate: new Date(expirationDate)
   }
 }


}
