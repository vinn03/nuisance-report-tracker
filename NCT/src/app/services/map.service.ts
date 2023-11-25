import { Injectable } from '@angular/core';
import { Map, LatLng, Marker } from 'leaflet'; // or whatever library you are using
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: Map;
  private marker: Marker | undefined;

  private markerCoordinatesSubject = new BehaviorSubject<string | null>(null);

  setMap(map: Map) {
    this.map = map;
  }

  getMap(): Map | undefined {
    return this.map;
  }

  placeMarker(latlng: LatLng): void {
    if (this.map) {
        this.marker = new Marker(latlng);
        this.marker.addTo(this.map);
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

  removeMarker(): void {
    if (this.map && this.marker) {
      this.map.removeLayer(this.marker);
      this.marker = undefined;
    }
  }
}