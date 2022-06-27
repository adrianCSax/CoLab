import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RoomCreationPopupComponent } from 'src/app/popups/room-creation-popup/room-creation-popup.component';

@Component({
  selector: 'create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  constructor(private popUp: MatDialog) { }

  isLoading = false;

  createRoom = new FormGroup({
    roomName: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
  }

  onCreateRoom() {
    if(!this.createRoom.valid) {
      return;
    }

    const roomName = this.createRoom.value.roomName;
    console.log(roomName);
    this.popUp.open(RoomCreationPopupComponent, {
      data: {roomName: roomName},
      panelClass: 'popup-base'
    });
    this.createRoom.reset();
  }
}
