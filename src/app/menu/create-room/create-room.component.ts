import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  constructor() { }

  isLoading = false;

  createRoom = new FormGroup({
    roomName: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
  }
}
