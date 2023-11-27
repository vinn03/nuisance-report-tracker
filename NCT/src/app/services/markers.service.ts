import { Injectable } from '@angular/core';
import { Marker } from 'leaflet';
import { MarkerInfo } from '../models/marker.model';

@Injectable({
  providedIn: 'root',
})

export class MarkersService {

  private markers: MarkerInfo[] = [];

  constructor() {}


  addMarker(marker: Marker, name: string): void { // add markers to service
    this.markers.push({marker: marker, markerName: name});
  }

  // removeMarker(location: string): void {
  //     const index = this.markers.findIndex(marker => marker.markerName === location);
  //     if (index !== -1) {
  //         this.markers.splice(index, 1);
  //     }
  // }

  getMarkers(): MarkerInfo[] {
      return this.markers;
  }

}
