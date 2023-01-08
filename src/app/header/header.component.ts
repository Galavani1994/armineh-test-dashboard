import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../gaurd/login/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges, DoCheck {
  userInfo!:any;
  display_logout!: boolean;
  totalItem = 0;

  constructor( private router: Router, private loginService: LoginService) {
    this.loginService.loggedIn.subscribe(res => {
      this.display_logout = res
    });
    this.userInfo = this.loginService.userInfo.subscribe(res=>{
      this.userInfo=res;
    });
  }

  ngOnInit(): void {
  }

  logout() {
    /*this.loginService.logout().subscribe((a) => {
        this.router.navigate(['/home'])
      })*/
    this.loginService.logout();
    this.router.navigate(['/login'])

  }

  ngDoCheck(): void {
  }

  ngOnChanges(changes: any): void {
    console.log(changes);
    console.log("change");
  }
}
