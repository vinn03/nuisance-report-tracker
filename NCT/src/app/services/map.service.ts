import { Injectable } from '@angular/core';
import { Map, LatLng, Marker } from 'leaflet'; // or whatever library you are using
import { BehaviorSubject } from 'rxjs';
import { MarkersService } from './markers.service';
import { MarkerInfo } from '../models/marker-info.model';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: Map;
  private markerCoordinatesSubject = new BehaviorSubject<string | null>(null);

  constructor(private markersService: MarkersService) { }

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

  initMarkers(): void {
    const markers: MarkerInfo[] = this.markersService.getMarkers();
    markers.forEach((marker) => {
      const markerObj: Marker = marker.marker;
      const latLng: LatLng = markerObj.getLatLng();
      L.marker(latLng).addTo(this.map).bindPopup(`<b>${marker.markerName}</b><br>${marker.markerCount} nuisance(s) reported`);;
    });
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