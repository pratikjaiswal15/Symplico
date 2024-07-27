import { TestBed } from '@angular/core/testing';

import { OrdersapiService } from './ordersapi.service';

describe('OrdersapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersapiService = TestBed.get(OrdersapiService);
    expect(service).toBeTruthy();
  });
});
