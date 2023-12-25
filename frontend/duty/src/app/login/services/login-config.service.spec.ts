import { TestBed } from '@angular/core/testing';

import { LoginConfigService } from './login-config.service';

describe('LoginConfigService', () => {
  let service: LoginConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
