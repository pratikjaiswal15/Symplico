import { TestBed } from '@angular/core/testing';

import { ProductPurchaseService } from './product-purchase.service';

describe('ProductPurchaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductPurchaseService = TestBed.get(ProductPurchaseService);
    expect(service).toBeTruthy();
  });
});
