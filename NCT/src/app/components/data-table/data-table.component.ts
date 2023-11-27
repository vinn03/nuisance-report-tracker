import { Component } from '@angular/core';
import { VillainService } from '../../services/villain.service';
import { Villain } from '../../models/villain.model';
import { LocationsService } from '../../services/locations.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})

export class DataTableComponent {
  
    villains:Villain[] = [];
    showForm:boolean = false;
    sortColumn: string = '';
    sortDirection: string = 'None';
    createButtonText: string = "CREATE NUISANCE REPORT"

    constructor(private villainService: VillainService, private locationsService: LocationsService, private mapService: MapService) { 
      this.villains = villainService.getVillains();
    }

    sortTable(column: string): void {
      if (column === this.sortColumn) {
        this.sortDirection = this.sortDirection === 'Ascending' ? 'Descending' : 'Ascending';
      } 
      else {
        this.sortColumn = column;
        this.sortDirection = 'Ascending';
      }

      this.villains.sort((a: Villain, b:Villain) => {

        const aValue = (a as any)[column].toString().toLowerCase();
        const bValue = (b as any)[column].toString().toLowerCase();
      
        if (aValue < bValue) {
          return this.sortDirection === 'Ascending' ? -1 : 1;
        } else if (aValue > bValue) {
          return this.sortDirection === 'Ascending' ? 1 : -1;
        } else {
          return 0;
        }
      });
    }

    addVillain(villain:Villain): void {

      const newVillain:Villain = {
        id: this.villains.length + 1,
        name: villain.name,
        location: villain.location,
        reportee: villain.reportee,
        time: this.getCurrentDateTime(),
        status: 'OPEN',
        info: villain.info,
        image: villain.image
      };

      this.villainService.addVillain(newVillain);

      console.log("Added Baddie: " + newVillain.name);
      console.log(newVillain);
      
      this.showForm = false;
    }

    moreInfo(villain:Villain): void {
      this.villainService.setSelection(villain);
      console.log("Selected Baddie: " + villain.name);
    }
    
    deleteVillain(villain:Villain): void {
      this.villainService.deleteVillain(villain);
      this.locationsService.decreaseCount(villain.location);
      location.reload();
      console.log("Location count: ", this.locationsService.getLocationCount(villain.location));
    }

    toggleForm(): void {
      this.showForm = !this.showForm;
      if (this.showForm) {
        this.createButtonText = "CANCEL";
      }
      else {
        this.createButtonText = "CREATE NUISANCE REPORT";
      }
    }

    getCurrentDateTime(): string {
      const now = new Date();
      const year = now.getFullYear();
      const month = this.padZero(now.getMonth() + 1); // Months are 0-based
      const day = this.padZero(now.getDate());
      const hours = this.padZero(now.getHours() % 12 || 12); // Convert to 12-hour format
      const minutes = this.padZero(now.getMinutes());
      const ampm = now.getHours() >= 12 ? 'pm' : 'am';
  
      return `${year}-${month}-${day} (${hours}:${minutes}${ampm})`;
    }

    padZero(value: number): string {
      return value < 10 ? `0${value}` : `${value}`;
    }
}
