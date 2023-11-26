import { Component } from '@angular/core';
import { VillainService } from '../../services/villain.service';
import { Villain } from '../../models/villain.model';
import { MapService } from '../../services/map.service';

// TODO: implement marker appearence on main map upon villian creation

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})

export class DataTableComponent {
    villains:Villain[] = [];
    showForm:boolean = false;

    constructor(private villainService: VillainService) { 
      this.villains = villainService.getVillains();
    }

    addVillain(villain:Villain): void {

      const newVillain:Villain = {
        id: this.villains.length + 1,
        name: villain.name,
        location: villain.location,
        reportee: villain.reportee,
        time: villain.time,
        status: 'OPEN',
        info: villain.info
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

    toggleForm(): void {
      this.showForm = !this.showForm;
    }
}
