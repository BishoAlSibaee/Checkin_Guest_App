import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfermationDialogComponent } from './confermation-dialog.component';

describe('ConfermationDialogComponent', () => {
  let component: ConfermationDialogComponent;
  let fixture: ComponentFixture<ConfermationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfermationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfermationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
