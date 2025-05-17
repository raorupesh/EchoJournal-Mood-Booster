import { TestBed } from '@angular/core/testing';

import { JournalenteryproxyService } from './journalenteryproxy.service';

describe('JournalenteryproxyService', () => {
  let service: JournalenteryproxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalenteryproxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
