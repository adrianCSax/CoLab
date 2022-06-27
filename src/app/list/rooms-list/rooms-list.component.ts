import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Room } from 'src/app/models/room.model';
import { RoomCreationPopupComponent } from 'src/app/popups/room-creation-popup/room-creation-popup.component';
import { RoomEditPopupComponent } from 'src/app/popups/room-edit-popup/room-edit-popup.component';
import { RoomInfoPopupComponent } from 'src/app/popups/room-info-popup/room-info-popup.component';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {

  private roomsSubscription!: Subscription;
  private currentUser!: string;
  rooms:Room[] = [];
  isLoading = false;

  constructor(private roomService: RoomsService, private authService: AuthService, private popUp: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.currentUser = this.authService.getId();
    this.roomService.getRooms(this.currentUser);
    this.roomsSubscription = this.roomService.getRoomsUpdateListener()
      .subscribe((rooms: Room[]) => {
        this.isLoading = false;
        this.rooms = rooms;
      });
  }

  getCurrentUser() {
    return this.currentUser;
  }

  ngOnDestroy() {
    this.roomsSubscription.unsubscribe();
  }

  onDeleteRoom(room: Room) {
    this.roomService.deleteRoom(this.currentUser, room);
  }

  openInfoPopup(room: Room) {
    this.popUp.open(RoomInfoPopupComponent, {
      data: room,
      panelClass: 'popup-base'
    });
  }

  onEditRoom(room: Room) {
    this.popUp.open(RoomEditPopupComponent, {
      data: room,
      panelClass: 'popup-base'
    });
  }

  joinRoom(room: Room) {
    this.roomService.joinRoom(room);
  }

}
