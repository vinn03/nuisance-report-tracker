import { Injectable } from '@angular/core';
import { MarkerInfo } from '../models/marker-info.model';
import { Marker } from 'leaflet';

@Injectable({
  providedIn: 'root',
})

export class MarkersService {
  private markers: MarkerInfo[] = [];

  addMarker(marker: Marker, location: string): void {
    const existingMarker = this.markers.find(marker => marker.markerName === location);
    if (existingMarker) {
      existingMarker.markerCount++;
    } 
    else {
      const newMarker = {
        marker: marker,
        markerName: location,
        markerCount: 1
      }
      this.markers.push(newMarker);
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

    addCount(location: string): void {
        const marker = this.markers.find(marker => marker.markerName === location);
        if (marker) {
            marker.markerCount++;
        }
    }
}
