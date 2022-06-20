import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'find-room',
  templateUrl: './find-room.component.html',
  styleUrls: ['./find-room.component.scss']
})
export class FindRoomComponent implements OnInit {

  addFriend = new FormGroup({
    roomName: new FormControl('', [Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
