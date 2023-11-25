import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationsService } from '../services/locations.service';
import { VillainLocation } from '../location.model';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrl: './create-report.component.css'
})

export class CreateReportComponent {

  @Output() villainAdded = new EventEmitter<any>();
  @Output() formClosed = new EventEmitter<void>();

  villainForm: FormGroup;
  showForm:boolean = false;
  locationNames: string[] = [];
  
  constructor(private fb: FormBuilder,
              private locationsService: LocationsService) {

    this.villainForm = this.fb.group({
      name: ['', Validators.required],
      reportee: ['', Validators.required],
      location: ['', Validators.required],
      time: ['', Validators.required],
      info: ['', Validators.required]
    });

  }

  onSubmit(): void {
    if (this.villainForm.valid) {
      this.villainAdded.emit(this.villainForm.value);
      this.villainForm.reset();
    }
  }

  closeForm(): void {
    this.formClosed.emit();
  }

  updateOptions(): void {
    // Assuming you have a LocationsService injected and available
    const updatedLocations = this.locationsService.getLocations();

    if (updatedLocations.length > 0) {

      // Clear the list of location names
      this.locationNames = [];

      // Append each location name to the options
      for (const location of updatedLocations as VillainLocation[]) {
        this.locationNames.push(location.name);
      }
    }
  }
}

