import { Injectable } from '@angular/core';
import { VillainLocation } from '../models/location.model';
import { StorageService } from './storage.service';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Villain } from '../models/villain.model';

@Injectable({
  providedIn: 'root'
})

export class LocationsService {
  private locations: VillainLocation[] = [];

  constructor(private storageService: StorageService) {
    this.storageService.loadLocationsFromStorage().pipe(
      tap((storedLocations) => {
        if (storedLocations) {
          storedLocations.data.forEach((item: any) => {
            this.locations.push(item);
          });
          console.log("Loaded locations from storage: ", this.locations);
          console.log(typeof(this.locations))
        }
      }),
      catchError((error) => {
        console.log("Error loading locations from storage: ", error);
        return of(null);
      })
    ).subscribe();
  }

  addLocation(location: VillainLocation): void {
    this.locations.push(location);
    this.storageService.saveLocationsToStorage(this.locations).pipe(
      tap(() => console.log("Saved locations to storage")),
      catchError((error) => {
        console.log("Error saving locations to storage: ", error);
        return of(null);
      })
    ).subscribe();
  }

  getLocations() : VillainLocation[] {
    return this.locations;
  }

  getLocationsObservable(): Observable<VillainLocation[]> {
    return of(this.locations);
  }

  updateLocation(location: VillainLocation): void {
    const index = this.locations.findIndex((loc) => loc.name === location.name);
    if (index !== -1) {
      this.locations[index] = location;
    }
    this.storageService.saveLocationsToStorage(this.locations).pipe(
      tap(() => console.log("Saved locations to storage")),
      catchError((error) => {
        console.log("Error saving locations to storage: ", error);
        return of(null);
      })
    ).subscribe();
  }
}
