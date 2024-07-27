import { TestBed } from '@angular/core/testing';

import { ProductPurchaseStockService } from './product-purchase-stock.service';

describe('ProductPurchaseStockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductPurchaseStockService = TestBed.get(ProductPurchaseStockService);
    expect(service).toBeTruthy();
  });
});
