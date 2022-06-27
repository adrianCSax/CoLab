import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartLoginComponent } from './auth/start-login/start-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './auth/signin/signin.component';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { MenuComponent } from './menu/menu.component';
import { CreateRoomComponent } from './menu/create-room/create-room.component';
import { FindRoomComponent } from './menu/find-room/find-room.component';
import { FriendsListComponent } from './menu/friends-list/friends-list.component';
import { LabComponent } from './lab/lab.component';
import { LogoComponent } from './logo/logo.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth_interceptor';
import { TopBarComponent } from './top-bar/top-bar.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RoomCreationPopupComponent } from './popups/room-creation-popup/room-creation-popup.component';
import { FriendSublistComponent } from './list/friend-list/friend-sublist.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { RoomsListComponent } from './list/rooms-list/rooms-list.component';
import { RoomInfoPopupComponent } from './popups/room-info-popup/room-info-popup.component';
import { RoomEditPopupComponent } from './popups/room-edit-popup/room-edit-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    StartLoginComponent,
    SigninComponent,
    MenuComponent,
    CreateRoomComponent,
    FindRoomComponent,
    FriendsListComponent,
    LabComponent,
    LogoComponent,
    TopBarComponent,
    RoomCreationPopupComponent,
    FriendSublistComponent,
    RoomsListComponent,
    RoomInfoPopupComponent,
    RoomEditPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatListModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
