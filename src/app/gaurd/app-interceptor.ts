import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {MessagePreviewService} from "../util/message-preview.service";


@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(
    private router: Router,
              private messagePreviewService: MessagePreviewService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.messagePreviewService.spinner.next(true)
    if (localStorage.getItem('token') != null||undefined) {
      var token = '';
      // @ts-ignore
      token = localStorage.getItem('token')
      var authReq = req.clone({
        headers: new HttpHeaders({'Authorization': token,'Content-Type':'application/json'})
      });
      this.messagePreviewService.spinner.next(false)
      return next.handle(authReq).pipe(catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || (err.error && err.error.errorCode == '9401')) {
            this.router.navigate(['/login']);
          } else if (err.status ==200) {
            this.messagePreviewService.spinner.next(false)
          }
          else {
            this.messagePreviewService.previewError(err);
          }
        } else {
          this.messagePreviewService.previewError(err);
        }


        return new Observable<HttpEvent<any>>();

      }));

    }
     else {
      var authReq = req.clone();
     console.log('auth reg 2', authReq);
     this.messagePreviewService.spinner.next(false)
      return next.handle(authReq).pipe(catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || (err.error && err.error.errorCode == '9401')) {
            localStorage.removeItem('token')
            this.router.navigate(['/login']);
          } else if (err.status ==200) {
            this.messagePreviewService.spinner.next(false)
          }else {
            this.messagePreviewService.previewError(err);
          }
        } else {
          this.messagePreviewService.previewError(err);
        }
        this.messagePreviewService.spinner.next(false)
        return new Observable<HttpEvent<any>>();
      }));
    }



  }

}
