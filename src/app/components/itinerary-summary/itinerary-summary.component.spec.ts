import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerarySummaryComponent } from './itinerary-summary.component';

describe('ItinerarySummaryComponent', () => {
  let component: ItinerarySummaryComponent;
  let fixture: ComponentFixture<ItinerarySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItinerarySummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItinerarySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
