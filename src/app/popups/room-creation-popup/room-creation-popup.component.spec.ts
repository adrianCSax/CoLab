import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCreationPopupComponent } from './room-creation-popup.component';

describe('RoomCreationPopupComponent', () => {
  let component: RoomCreationPopupComponent;
  let fixture: ComponentFixture<RoomCreationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomCreationPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCreationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
