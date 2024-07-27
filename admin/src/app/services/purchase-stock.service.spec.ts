import { TestBed } from '@angular/core/testing';

import { PurchaseStockService } from './purchase-stock.service';

describe('PurchaseStockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurchaseStockService = TestBed.get(PurchaseStockService);
    expect(service).toBeTruthy();
  });
});
