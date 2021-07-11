import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainalertComponent } from './trainalert.component';

describe('TrainalertComponent', () => {
  let component: TrainalertComponent;
  let fixture: ComponentFixture<TrainalertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainalertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
