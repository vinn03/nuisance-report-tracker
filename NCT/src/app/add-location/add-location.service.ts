
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddLocationService {
  private locations: string[] = [];
  private locationsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  getLocations(): Observable<string[]> {
    return this.locationsSubject.asObservable();
  }

  addLocation(location: string): void {
    this.locations.push(location);
    this.locationsSubject.next([...this.locations]);
  }
}