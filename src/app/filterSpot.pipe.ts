import {Pipe, PipeTransform} from '@angular/core';
import {Map} from './map/map.model';

@Pipe({
  name: 'filterSpot'
})

export class FilterSpotPipe implements PipeTransform {
  transform(maps: Map [], args: any[]) {
    const currSpot = maps.filter(maps => maps.spotId === args[0]);
    return (currSpot);
  }
}


