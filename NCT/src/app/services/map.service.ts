import { Injectable } from '@angular/core';
import { Map, LatLng, Marker } from 'leaflet'; // or whatever library you are using
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: Map;

  private markerCoordinatesSubject = new BehaviorSubject<string | null>(null);

  setMap(map: Map) {
    this.map = map;
  }

  getMap(): Map {
    return this.map;
  }

  placeMarker(marker: Marker, locationName: string, count: number): void {
    if (this.map) {
      marker.addTo(this.map);
      marker.bindPopup(`<b>${locationName}</b><br>${count} nuisance(s) reported`);
    }
  }

  get markerCoordinates$() {
    return this.markerCoordinatesSubject.asObservable();
  }

  setMarkerCoordinates(coordinates: string) {
    this.markerCoordinatesSubject.next(coordinates);
  }

  getMarkerCoordinates(): string | null {
    return this.markerCoordinatesSubject.getValue();
  }

  removeMarker(marker: Marker): void {
    if (this.map) {
      this.map.removeLayer(marker);
    }
  }
}