import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class LoginService {

  public userInfo=new BehaviorSubject<UserInfo>(new UserInfo());

  public loggedIn = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient) {
  }

  authenticate() {
    return this.http.get<any>('rest/authenticate');
  }

  isAuthenticates(): Promise<any> {
    const promise = new Promise(
      (resolve, reject) => {
        resolve(this.loggedIn)
      });
    return promise;
  }

  login(username: string, password: string):any {
    if (username=="admin"&&password=='admin'){
      return true;
    }else {
      return false;
    }
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem("token");
    //return this.http.get<any>(`${environment.baseUrl}/api/auth/signOut`);
  }



  setUserInfo(value: UserInfo) {
    this.userInfo.next(value);
  }


  getRoles() {
    //return this.http.get<any>(`${environment.baseUrl}/api/auth/authenticate`);
    var sample_promise = new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        console.log("This is an asynchronous call which has a timeout of 20 milli seconds!");
         resolve(true);
      }, 2000);
    });
    return sample_promise;
  }

  getCaptcha() {
    return this.http.get<any>(`${environment.baseUrl}/api/core/captcha`);
  }
}

export class UserInfo {
  roles: string[] | undefined;
  username: string | undefined;
}
