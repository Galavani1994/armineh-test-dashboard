/**
 * Created by a.azizkhani on 12/8/2018.
 */
export class SearchOption<T> {

  constructor(object?: T) {
    this.object = object;
    this.pageSize = -1;
    this.pageNumber = 0;
    this.sortField = "";
    this.sortClass = "";
  }

  object: T | undefined;
  pageSize: number;
  pageNumber: number;
  sortField: string | undefined | null;
  sortClass: string;
  direction: string | undefined | null;
}
