import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewAllPurchaseComponent } from './view-all-purchase.component';

describe('ViewAllPurchaseComponent', () => {
  let component: ViewAllPurchaseComponent;
  let fixture: ComponentFixture<ViewAllPurchaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
