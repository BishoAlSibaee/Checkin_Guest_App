import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationExpiredComponent } from './reservation-expired.component';

describe('ReservationExpiredComponent', () => {
  let component: ReservationExpiredComponent;
  let fixture: ComponentFixture<ReservationExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationExpiredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
