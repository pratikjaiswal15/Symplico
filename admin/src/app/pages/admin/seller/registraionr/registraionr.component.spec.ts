import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistraionrComponent } from './registraionr.component';

describe('RegistraionrComponent', () => {
  let component: RegistraionrComponent;
  let fixture: ComponentFixture<RegistraionrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistraionrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraionrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
