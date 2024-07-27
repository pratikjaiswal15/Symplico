import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateMainCategoryComponent } from './update-main-category.component';

describe('UpdateMainCategoryComponent', () => {
  let component: UpdateMainCategoryComponent;
  let fixture: ComponentFixture<UpdateMainCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMainCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMainCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
