import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoginErrorComponent } from './view-login-error.component';

describe('ViewLoginErrorComponent', () => {
  let component: ViewLoginErrorComponent;
  let fixture: ComponentFixture<ViewLoginErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoginErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLoginErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
