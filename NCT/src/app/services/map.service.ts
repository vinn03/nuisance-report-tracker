import { Injectable } from '@angular/core';
import { Map, Marker } from 'leaflet'; // or whatever library you are using
import { BehaviorSubject } from 'rxjs';
import { LocationsService } from './locations.service';
import { VillainLocation } from '../models/location.model';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: Map;
  private markerCoordinatesSubject = new BehaviorSubject<string | null>(null);
  private locations: VillainLocation[] = [];
  private markers: Marker[] = [];

  constructor(private locationsService: LocationsService) {
    this.locations = this.locationsService.getLocations();
  }

  setMap(map: Map) {
    this.map = map;
  }

  getMap(): Map {
    return this.map;
  }

  placeMarker(lat: number, lng: number, name: string, count: number): Marker {
    const newMarker:Marker = L.marker([lat, lng]);
    newMarker.addTo(this.map).bindPopup(`<b>${name}</b><br>${count} nuisance(s) reported`);
    return newMarker;
  }

  initMarkers(): void {
    console.log("Initializing markers: ", this.locations);
    this.locations.forEach(location => {
      if (location.count > 0) {
       const marker:Marker = L.marker([location.lat, location.lng]).addTo(this.map).bindPopup(`<b>${location.name}</b><br>${location.count} nuisance(s) reported`);
        this.markers.push(marker);
      }
    });
  }

  reloadMarkers(): void {
    this.markers.forEach(marker => {
      this.map.removeLayer(marker);
    });
    this.markers = [];
    this.initMarkers();
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