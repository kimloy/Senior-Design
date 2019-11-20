import { Injectable } from '@angular/core';
import {environment} from './environment';
import { HttpClient } from '@angular/common/http';
import Pusher from 'pusher-js';

@Injectable()

export class PusherService {
  pusher: any;
  channel: any;

  constructor(private https: HttpClient) {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });
    this.channel = this.pusher.subscribe('my-channel');
  }
    mapStatus(currStatus, currSpotId) {
      this.https.post('http://localhost:3000/update', {spotId: currSpotId, status: currStatus})
        .subscribe(data => {});
    }
}
