import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService, UserInfo} from "./login/login.service";

@Injectable({providedIn: 'root'})
export class AppGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    /*return this.loginService.getRoles().toPromise().then((userinfo: UserInfo) => {
      this.loginService.setUserInfo(userinfo);
      return true;
    }, () => {
      this.loginService.setUserInfo(new UserInfo());
      this.router.navigate(['/login']);
      return false;
    });*/
    return this.loginService.getRoles().then((userinfo: any) => {
      this.loginService.setUserInfo(userinfo);
      return true;
    }, () => {
      this.loginService.setUserInfo(new UserInfo());
      this.router.navigate(['/login']);
      return false;
    });
  }
}

