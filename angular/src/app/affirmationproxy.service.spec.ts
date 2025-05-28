import { TestBed } from '@angular/core/testing';

import { AffirmationproxyService } from './affirmationproxy.service';

describe('AffirmationproxyService', () => {
  let service: AffirmationproxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffirmationproxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
