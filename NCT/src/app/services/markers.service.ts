import { Injectable } from '@angular/core';
import { MarkerInfo } from '../models/marker-info.model';
import { Marker } from 'leaflet';

@Injectable({
  providedIn: 'root',
})

export class MarkersService {
  private markers: MarkerInfo[] = [];

  constructor() {}

  addMarkerToService(marker: Marker, locationName: string): void { // add markers to service
    const existingMarker = this.markers.find(marker => marker.markerName === locationName);
    if (existingMarker) {
      existingMarker.markerCount++;
      console.log("Updated marker count: ", existingMarker.markerCount);
    } 
    else {
      const newMarker = {
        marker: marker,
        markerName: locationName,
        markerCount: 1
      }
      this.markers.push(newMarker);
      console.log("Added new marker: ", newMarker);
    }
  }

  removeMarker(location: string): void {
      const index = this.markers.findIndex(marker => marker.markerName === location);
      if (index !== -1) {
          this.markers.splice(index, 1);
      }
  }

  getMarkers(): MarkerInfo[] {
      return this.markers;
  }

  getCount(location: string): number {
      const marker = this.markers.find(marker => marker.markerName === location);
      if (marker) {
          return marker.markerCount;
      }
          return 0;
  }
}
