import { TestBed } from '@angular/core/testing';

import { SellStockService } from './sell-stock.service';

describe('SellStockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellStockService = TestBed.get(SellStockService);
    expect(service).toBeTruthy();
  });
});
