import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {LoginRequest} from "./login-request.model";
import {enableDebugTools} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username !: string;
  password !: string;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    //this.getCaptcha();
  }

  isRegister: boolean = false;
  captchaImg: any;


  toggleForm() {
    this.isRegister = !this.isRegister;
  }

  login() {
    /* this.loginService.login(this.username,this.password).subscribe((res:any) =>{
       if (res==true){
         localStorage.setItem("token", "Bearer Access token received");
         this.loginService.loggedIn.next(true);
         this.router.navigate(['/dashboard']);
       }
     },()=>{
       console.log("error occurred")
     })*/
    if (this.username=='admin' && this.password=='admin') {
      localStorage.setItem("token", "Bearer Access token received");
      this.loginService.loggedIn.next(true);
      this.router.navigate(['/dashboard/panel']);
    }


  }

  getCaptcha() {
    this.loginService.getCaptcha().subscribe(res => {
      this.captchaImg = res.realCaptcha;
    })
  }
}
