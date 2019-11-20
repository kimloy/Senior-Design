import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import {MapComponent} from './map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule} from '@angular/forms';
import { FilterSpotPipe} from './filterSpot.pipe';
import {PusherService} from './pusher.service';
import {DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    FilterSpotPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    DragDropModule
  ],
  providers: [PusherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
