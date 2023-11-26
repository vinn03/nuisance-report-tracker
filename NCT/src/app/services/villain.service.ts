import { Injectable } from '@angular/core';
import { Villain } from '../models/villain.model';

@Injectable({
  providedIn: 'root',
})
export class VillainService {
  private villains: Villain[] = [];
  private selectedVillain: Villain | null = null;

  getVillains(): Villain[] {
    return this.villains;
  }

  addVillain(villain: Villain): void {
    this.villains.push(villain);
  }

  setSelection(villain: Villain): void {
    this.selectedVillain = villain;
  }

  getSelection(): Villain {
    return this.selectedVillain!;
  }
}