import { TestBed } from '@angular/core/testing';

import { LedgersService } from './ledgers.service';

describe('LedgersService', () => {
  let service: LedgersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LedgersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
