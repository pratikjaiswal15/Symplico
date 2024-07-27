import { TestBed } from '@angular/core/testing';

import { OurOrdersService } from './our-orders.service';

describe('OurOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OurOrdersService = TestBed.get(OurOrdersService);
    expect(service).toBeTruthy();
  });
});
