import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewOneMainCategoryComponent } from './view-one-main-category.component';

describe('ViewOneMainCategoryComponent', () => {
  let component: ViewOneMainCategoryComponent;
  let fixture: ComponentFixture<ViewOneMainCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOneMainCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOneMainCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
