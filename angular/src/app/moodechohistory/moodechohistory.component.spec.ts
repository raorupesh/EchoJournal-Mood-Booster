import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodechohistoryComponent } from './moodechohistory.component';

describe('MoodechohistoryComponent', () => {
  let component: MoodechohistoryComponent;
  let fixture: ComponentFixture<MoodechohistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodechohistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodechohistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
