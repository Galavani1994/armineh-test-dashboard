import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {BaseInformationHeader} from "./baseInformationHeader.model";
import {Observable} from "rxjs";
import {SearchOption} from "../../util/SearchOption";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class BaseInformationHeaderService {

  constructor(private http: HttpClient) {
  }

  list(item: SearchOption<any>) {
    return this.http.post<any>(`${environment.baseUrl}/api/core/baseInformationHeader/list/grid`, item)
  }

  save(entity: BaseInformationHeader): Observable<HttpResponse<BaseInformationHeader>> {
    const copy: BaseInformationHeader = Object.assign({}, entity);
    return this.http.post<BaseInformationHeader>(`${environment.baseUrl}/api/core/baseInformationHeader/save`, copy, {observe: 'response'});
  }

  delete(id: any): any {
    return this.http.get<BaseInformationHeader>(`${environment.baseUrl}/api/core/baseInformationHeader/delete/` + id);
  }
}

