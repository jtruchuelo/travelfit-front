import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastItinerariesComponent } from './last-itineraries.component';

describe('LastItinerariesComponent', () => {
  let component: LastItinerariesComponent;
  let fixture: ComponentFixture<LastItinerariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastItinerariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastItinerariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
