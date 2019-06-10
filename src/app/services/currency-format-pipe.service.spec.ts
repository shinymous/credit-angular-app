import { TestBed } from '@angular/core/testing';

import { CurrencyFormatPipeService } from './currency-format-pipe.service';

describe('CurrencyFormatPipeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyFormatPipeService = TestBed.get(CurrencyFormatPipeService);
    expect(service).toBeTruthy();
  });
});
