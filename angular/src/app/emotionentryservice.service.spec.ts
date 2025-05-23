import { TestBed } from '@angular/core/testing';

import { EmotionentryserviceService } from './emotionentryservice.service';

describe('EmotionentryserviceService', () => {
  let service: EmotionentryserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmotionentryserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
