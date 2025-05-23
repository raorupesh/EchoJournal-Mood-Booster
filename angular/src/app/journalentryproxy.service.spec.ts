import { TestBed } from '@angular/core/testing';

import { JournalentryproxyService } from './journalentryproxy.service';

describe('JournalentryproxyService', () => {
  let service: JournalentryproxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalentryproxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
