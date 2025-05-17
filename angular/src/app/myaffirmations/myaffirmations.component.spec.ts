import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaffirmationsComponent } from './myaffirmations.component';

describe('MyaffirmationsComponent', () => {
  let component: MyaffirmationsComponent;
  let fixture: ComponentFixture<MyaffirmationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyaffirmationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyaffirmationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
