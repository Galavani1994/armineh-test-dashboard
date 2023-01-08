import {MatPaginator} from "@angular/material/paginator";
import {BehaviorSubject, Observable} from "rxjs";
import {CollectionViewer, DataSource} from "@angular/cdk/collections";


export class CustomDatasource<T> implements DataSource<T> {
  prom: Promise<any>;
  pagi: MatPaginator;

  constructor(private observable: Observable<QueryResult<T>>, paginator: MatPaginator) {
    this.pagi = paginator;
    // @ts-ignore
    this.prom = observable.toPromise().then((data: QueryResult<T>) => {
      this._request.next(data.content);
      this.pagi.length = data.totalElements;
      return data;
    });
  }

  private _request = new BehaviorSubject<any[]>([]);

  get request(): BehaviorSubject<any[]> {
    return this._request;
  }

  set request(value: BehaviorSubject<any[]>) {
    this._request = value;
  }

  connect(collectionViewer: CollectionViewer): any {
    return this._request.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this._request.complete();
  }

  public refresh(observable: Observable<QueryResult<T>>) {
    // @ts-ignore
    this.prom = observable.toPromise().then((success: QueryResult<T>) => {
        this._request.next(success.content);
        this.pagi.length = success.totalElements;
        return success;
      }
    );
  }

  emptyDataSource() {
    this._request.next([]);
  }
}

export class QueryResult<T> {
  // @ts-ignore
  content: T[];
  // @ts-ignore
  totalElements: number;
}
