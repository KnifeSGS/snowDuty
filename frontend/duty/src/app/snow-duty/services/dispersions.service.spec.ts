import { TestBed } from '@angular/core/testing';

import { DispersionsService } from './dispersions.service';

describe('DispersionsService', () => {
  let service: DispersionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispersionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
