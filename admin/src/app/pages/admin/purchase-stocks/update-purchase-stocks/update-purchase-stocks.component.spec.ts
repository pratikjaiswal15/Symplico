import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdatePurchaseStocksComponent } from './update-purchase-stocks.component';

describe('UpdatePurchaseStocksComponent', () => {
  let component: UpdatePurchaseStocksComponent;
  let fixture: ComponentFixture<UpdatePurchaseStocksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePurchaseStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePurchaseStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
