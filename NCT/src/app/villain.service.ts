import { Injectable } from '@angular/core';
import { Villain } from './villain.model';

@Injectable({
  providedIn: 'root',
})
export class VillainService {
  private villains: Villain[] = [];

  getVillains(): Villain[] {
    return this.villains;
  }

  addVillain(villain: Villain): void {
    this.villains.push(villain);
  }
}