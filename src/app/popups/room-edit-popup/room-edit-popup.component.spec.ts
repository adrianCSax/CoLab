import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomEditPopupComponent } from './room-edit-popup.component';

describe('RoomEditPopupComponent', () => {
  let component: RoomEditPopupComponent;
  let fixture: ComponentFixture<RoomEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomEditPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
