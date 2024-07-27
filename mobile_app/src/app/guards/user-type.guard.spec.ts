import { TestBed } from '@angular/core/testing';

import { UserTypeGuard } from './user-type.guard';

describe('UserTypeGuard', () => {
  let guard: UserTypeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserTypeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
