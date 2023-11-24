import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddLocationService } from './add-location.service';


@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrl: './add-location.component.css'
})
export class AddLocationComponent implements OnInit{

  locations: string[] = [];
  newLocation: string = '';

  constructor(private addLocationService: AddLocationService) {}

  ngOnInit(): void {
    this.addLocationService.getLocations().subscribe((locations) => {
      this.locations = locations;
    });
  }

  addLocation(): void {
    if (this.newLocation.trim() !== '') {
      this.addLocationService.addLocation(this.newLocation);
      this.newLocation = '';
    }
  }

}