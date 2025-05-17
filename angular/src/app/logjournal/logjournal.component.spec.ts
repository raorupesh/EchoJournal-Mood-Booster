import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogjournalComponent } from './logjournal.component';

describe('LogjournalComponent', () => {
  let component: LogjournalComponent;
  let fixture: ComponentFixture<LogjournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogjournalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogjournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
