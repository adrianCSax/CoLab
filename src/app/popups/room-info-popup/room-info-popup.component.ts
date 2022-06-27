import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { FriendIndex } from 'src/app/models/friend-index.model';
import { FriendOptions } from 'src/app/models/friend-options.model';
import { Friend } from 'src/app/models/friend.model';
import { Room } from 'src/app/models/room.model';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'room-info-popup',
  templateUrl: './room-info-popup.component.html',
  styleUrls: ['./room-info-popup.component.scss']
})
export class RoomInfoPopupComponent implements OnInit {

  participants!: Friend[];
  tags!: string[];
  isAdmin!: boolean;
  addFriends!: Friend[];
  friendListOptions!: FriendOptions;
  unselectedFriend!: FriendIndex;

  constructor(
    public popupRef: MatDialogRef<RoomInfoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Room,
    private roomService: RoomsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.participants = this.data.participants;
    this.tags = this.data.tags;
    this.isAdmin = this.authService.getId() === this.data.admin;
    console.log(this.participants);
  }


  closePopup() {
    this.popupRef.close();
  }

  joinRoom() {
    this.roomService.joinRoom(this.data);
  }


}
