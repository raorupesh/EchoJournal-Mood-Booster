import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodechoComponent } from './moodecho.component';

describe('MoodechoComponent', () => {
  let component: MoodechoComponent;
  let fixture: ComponentFixture<MoodechoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodechoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodechoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
