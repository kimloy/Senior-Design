import {Component, OnDestroy, OnInit} from '@angular/core';
import {Map} from './map.model';
import {MapService} from './map.service';
import {Subscription} from 'rxjs';
import {ChangeDetectorRef} from '@angular/core'
import { FilterSpotPipe} from '../filterSpot.pipe';
import { PusherService} from '../pusher.service';
import {subscribeOn} from 'rxjs/operators';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],

})

export class MapComponent implements OnInit, OnDestroy {
  maps: Map[] = [];
  private spotsSubs: Subscription;

  constructor(public mapService: MapService, private pusherService: PusherService, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.mapService.getSpots();
    this.spotsSubs = this.mapService.getSpotUpdateListener()
      .subscribe((maps: Map[]) => {
        this.maps = maps;
        console.log(this.maps);
      });

    this.pusherService.channel.bind('replaced', data => {
      data.new = true;
      const updateSpot = this.maps.find(maps => maps.id === data.id);
      const index = this.maps.indexOf(updateSpot);
      this.maps[index] = data;
      this.maps = this.maps.slice();
      this.ref.markForCheck();
    });
  }

  ngOnDestroy() {
    this.spotsSubs.unsubscribe();
  }

  drop(event: CdkDragDrop<any>) {
    alert('test');
  }
}
