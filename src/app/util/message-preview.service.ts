import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NotificationService} from "./notif/snack/notification.service";

@Injectable({providedIn: 'root'})
export class MessagePreviewService {

  spinner: BehaviorSubject<any> = new BehaviorSubject('');

  constructor(private notificationService: NotificationService) {
  }

  previewSuccess() {
    this.notificationService.success('عملیات با موفقیت انجام شد');
  }

  previewMessage(message: string) {
    this.notificationService.info(message);
  }

  public previewError(error: any) {
    if (!error) return;

    if (error.error && error.error.message) {
      this.notificationService.error(error.error.message);
    } else {
      this.notificationService.error(error.message);
    }
  }
}

export interface GeneralResponse {
  message: string;
  statusCode: string;
  result: any;
}
