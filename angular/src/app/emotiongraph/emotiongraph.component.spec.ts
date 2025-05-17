import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotiongraphComponent } from './emotiongraph.component';

describe('EmotiongraphComponent', () => {
  let component: EmotiongraphComponent;
  let fixture: ComponentFixture<EmotiongraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmotiongraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmotiongraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
