import { TestBed } from '@angular/core/testing';

import { ProductSellStockService } from './product-sell-stock.service';

describe('ProductSellStockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductSellStockService = TestBed.get(ProductSellStockService);
    expect(service).toBeTruthy();
  });
});
