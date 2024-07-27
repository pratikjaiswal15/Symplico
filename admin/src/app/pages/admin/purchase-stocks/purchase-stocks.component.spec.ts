import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PurchaseStocksComponent } from './purchase-stocks.component';

describe('PurchaseStocksComponent', () => {
  let component: PurchaseStocksComponent;
  let fixture: ComponentFixture<PurchaseStocksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
