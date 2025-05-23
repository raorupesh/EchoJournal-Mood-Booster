import { TestBed } from '@angular/core/testing';

import { EmotionentryproxyService } from './emotionentryproxy.service';

describe('EmotionentryproxyService', () => {
  let service: EmotionentryproxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmotionentryproxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
