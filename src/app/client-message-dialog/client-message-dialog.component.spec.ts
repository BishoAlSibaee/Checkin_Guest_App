import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMessageDialogComponent } from './client-message-dialog.component';

describe('ClientMessageDialogComponent', () => {
  let component: ClientMessageDialogComponent;
  let fixture: ComponentFixture<ClientMessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMessageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
