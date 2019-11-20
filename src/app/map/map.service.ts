import {Map} from './map.model';
import {Injectable} from '@angular/core';
import { Subject } from 'rxjs'; // Observables that helps us pass data around.
import {HttpClient} from '@angular/common/http'; // can inject the client inside the service too.
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class MapService {
  private spots: Map [] = [];
  private spotsUpdated = new Subject<Map[]>();

  constructor(private http: HttpClient) {
  }

  getSpots() {
    this.http
      .get<{ message: string; maps: any }>(
        'http://localhost:3000/api/maps'
      )
      .pipe(map((mapData) => {
        return mapData.maps.map(spot => {
          return {
            spotId: spot.spotId,
            status: spot.status,
            id: spot._id
          };
        });
      }))
      .subscribe(transformedSpots => {
        this.spots = transformedSpots;
        this.spotsUpdated.next([...this.spots]);
      });
  }

  getSpotUpdateListener() {
    return this.spotsUpdated.asObservable();
  }
}


