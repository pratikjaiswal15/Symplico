import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VieweOneCategoryComponent } from './viewe-one-category.component';

describe('VieweOneCategoryComponent', () => {
  let component: VieweOneCategoryComponent;
  let fixture: ComponentFixture<VieweOneCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VieweOneCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VieweOneCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
