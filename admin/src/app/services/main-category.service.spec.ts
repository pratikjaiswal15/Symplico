import { TestBed } from '@angular/core/testing';

import { MainCategoryService } from './main-category.service';

describe('MainCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainCategoryService = TestBed.get(MainCategoryService);
    expect(service).toBeTruthy();
  });
});
