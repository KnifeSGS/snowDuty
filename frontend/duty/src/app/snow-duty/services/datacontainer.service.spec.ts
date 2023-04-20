import { TestBed } from '@angular/core/testing';

import { DatacontainerService } from './datacontainer.service';

describe('DatacontainerService', () => {
  let service: DatacontainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatacontainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
