import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainCategoryComponent } from './main-category.component';

describe('MainCategoryComponent', () => {
  let component: MainCategoryComponent;
  let fixture: ComponentFixture<MainCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
