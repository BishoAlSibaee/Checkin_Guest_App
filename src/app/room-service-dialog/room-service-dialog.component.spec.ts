import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomServiceDialogComponent } from './room-service-dialog.component';

describe('RoomServiceDialogComponent', () => {
  let component: RoomServiceDialogComponent;
  let fixture: ComponentFixture<RoomServiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomServiceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
