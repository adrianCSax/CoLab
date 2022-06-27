import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInfoPopupComponent } from './room-info-popup.component';

describe('RoomInfoPopupComponent', () => {
  let component: RoomInfoPopupComponent;
  let fixture: ComponentFixture<RoomInfoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomInfoPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
