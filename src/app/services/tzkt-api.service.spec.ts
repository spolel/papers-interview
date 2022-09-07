import { TestBed } from '@angular/core/testing';

import { TzktAPIService } from './tzkt-api.service';

describe('TzktAPIService', () => {
  let service: TzktAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TzktAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
