import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerifySellerComponent } from './verify-seller.component';

describe('VerifySellerComponent', () => {
  let component: VerifySellerComponent;
  let fixture: ComponentFixture<VerifySellerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifySellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifySellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
