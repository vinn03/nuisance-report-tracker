import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VillainService } from '../../services/villain.service';
import { Villain } from '../../models/villain.model';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrl: './more-info.component.css'
})

export class MoreInfoComponent {

  selectedVillain:Villain;

  constructor(private villainService: VillainService) { 
    this.selectedVillain = this.villainService.getSelection();
  }


  changeStatus(): void {
    const password = prompt("Enter password: ");
    if (password === "BaggyJeans") {
      this.selectedVillain.status = 'RESOLVED';
      console.log("Changed status of Baddie: " + this.selectedVillain.name);
    }
  }
}
