import { Injectable } from '@angular/core';
import { Map, LatLng, Marker } from 'leaflet'; // or whatever library you are using

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: Map;
  private marker: Marker | undefined;

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

  getMarkerCoordinates(): LatLng | undefined {
    if (this.marker) {
      return this.marker.getLatLng();
    }
    return undefined;
  }

  removeMarker(): void {
    if (this.map && this.marker) {
      this.map.removeLayer(this.marker);
      this.marker = undefined;
    }
  }
}