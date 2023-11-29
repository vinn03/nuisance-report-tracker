import { Injectable } from '@angular/core';
import { Villain } from '../models/villain.model';
import { StorageService } from './storage.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VillainService {
  private villains: Villain[] = [];
  private selectedVillain: Villain | null = null;

  constructor(private storageService: StorageService) {
    this.storageService.loadVillainsFromStorage().pipe(
      tap((storedVillains) => {
        if (storedVillains) {
          storedVillains.data.forEach((villain: Villain) => {
            this.villains.push(villain);
          });
          console.log("Loaded villains from storage: ", this.villains);
          console.log(typeof(this.villains))
        }
      }),
      catchError((error) => {
        console.log("Error loading villains from storage: ", error);
        return of(null);
      })
    ).subscribe();
  }

  getVillains(): Villain[] {
    return this.villains;
  }

  addVillain(villain: Villain): void {
    this.villains.push(villain);
    this.storageService.saveVillainsToStorage(this.villains).pipe(
      tap(() => console.log("Saved villains to storage")),
      catchError((error) => {
        console.log("Error saving villains to storage: ", error);
        return of(null);
      })
    ).subscribe();
  }

  deleteVillain(villain: Villain): void {
    this.villains = this.villains.filter(v => v !== villain);
    this.storageService.saveVillainsToStorage(this.villains).pipe(
      tap(() => console.log("Saved villains to storage")),
      catchError((error) => {
        console.log("Error saving villains to storage: ", error);
        return of(null);
      })
    ).subscribe();
    console.log("Deleted Baddie: " + villain.name);
  }

  setSelection(villain: Villain): void {
    this.selectedVillain = villain;
  }

  getSelection(): Villain {
    return this.selectedVillain!;
  }
}