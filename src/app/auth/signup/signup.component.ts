import {Component} from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})



export class SignupComponent{
  isLoading=false;

  constructor(public authService:AuthService){}

  onSignup(form:NgForm){
    if(form.invalid){
      //return;
    }else{
      this.authService.createUser(form.value.email,form.value.password);
      this.isLoading = true;
    }
    console.log(form.value);
  }



}