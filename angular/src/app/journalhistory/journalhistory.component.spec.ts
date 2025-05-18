import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalhistoryComponent } from './journalhistory.component';

describe('JournalhistoryComponent', () => {
  let component: JournalhistoryComponent;
  let fixture: ComponentFixture<JournalhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalhistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
