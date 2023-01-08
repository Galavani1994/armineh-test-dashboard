import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseInformationHeaderComponent } from './baseInformationHeader.component';

describe('OrdersComponent', () => {
  let component: BaseInformationHeaderComponent;
  let fixture: ComponentFixture<BaseInformationHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseInformationHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseInformationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
