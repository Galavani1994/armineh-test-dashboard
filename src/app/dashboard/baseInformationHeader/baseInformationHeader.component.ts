import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {BaseInformationHeaderService} from "./baseInformationHeader.service";
import {BaseInformationHeader} from "./baseInformationHeader.model";
import {MessagePreviewService} from "../../util/message-preview.service";
import {DeleteDialogService} from "../../util/notif/delete-dialog.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {SearchOption} from "../../util/SearchOption";

@Component({
  selector: 'base-info',
  templateUrl: './baseInformationHeader.component.html',
  styleUrls: ['./baseInformationHeader.component.scss']
})
export class BaseInformationHeaderComponent implements OnInit, AfterViewInit {

  insertMode: boolean = false;
  searchMode: boolean = false;
  panelOpenState: boolean = true;
  totalElements: any;
  // @ts-ignore
  pageEvent: PageEvent;

  displayedColumns: string[] = ['rowIndex', 'topic', 'operating'];
  entityList: BaseInformationHeader[] = [];

  // @ts-ignore
  @ViewChild('paginator') paginator: MatPaginator;

  // @ts-ignore
  dataSource: MatTableDataSource<baseInformationHeader>;

  entity: BaseInformationHeader = new BaseInformationHeader();
  filter: BaseInformationHeader = new BaseInformationHeader();
  primary: any = "accent";

  constructor(private service: BaseInformationHeaderService,
              private messagePreviewService: MessagePreviewService,
              private deleteDialogService: DeleteDialogService) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.loadAll();
    this.dataSource.paginator = this.paginator;
  }

  loadAll() {
    this.service.list(this.getSearchOption()).subscribe((result: any) => {
      this.entityList = result.content;
      this.totalElements = result.totalElements;
      // @ts-ignore
      this.dataSource = new MatTableDataSource<baseInformationHeader>(this.entityList);
    })
  }

  getSearchOption() {
    let searchOption = new SearchOption<any>();
    searchOption.object = this.filter;
    searchOption.pageNumber = this.paginator.pageIndex;
    searchOption.pageSize = this.paginator.pageSize;
    return searchOption;
  }

  toggleSearch() {
    this.searchMode = !this.searchMode;
  }

  togglePage() {
    this.insertMode = !this.insertMode;
  }

  cancel() {
    this.togglePage();
    let that = this;
    setTimeout(function () {
      that.loadAll();
    }, 0);
  }

  save() {
    this.service.save(this.entity).subscribe((res: any) => {
      if (res.body > 0) {
        this.messagePreviewService.previewSuccess();
        this.clearForm();
      } else {
        this.messagePreviewService.previewMessage('خطایی رخ داده است به پشتیبانی اطلاع دهید.');
      }
    }, (error) => {
      this.messagePreviewService.previewMessage('خطایی رخ داده است به پشتیبانی اطلاع دهید.');
      console.log(error);
    });
  }

  edit(item: any) {
    if (item != null) {
      this.entity = item;
    } else {
      this.entity = new BaseInformationHeader();
    }
    this.togglePage();
  }

  delete(id: any) {
    this.deleteDialogService.open().afterClosed().subscribe((result: any) => {
      if (result) {
        this.service.delete(id).subscribe((res: any) => {
          if (res) {
            this.loadAll();
            this.messagePreviewService.previewSuccess();
          } else {
            this.messagePreviewService.previewMessage('خطایی رخ داده است به پشتیبانی اطلاع دهید.');
          }
        }, (error: any) => {
          this.messagePreviewService.previewError(error);
        });
      }
    });
  }

  clearForm() {
    this.entity = new BaseInformationHeader();
  }

  public reloadGrid(event?: any) {
    this.loadAll();
    return event;
  }

  clearFilter() {
    this.filter = new BaseInformationHeader();
    this.loadAll()
  }
}

