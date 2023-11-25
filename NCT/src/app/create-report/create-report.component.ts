import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  
  constructor(private fb: FormBuilder) {

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

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  closeForm(): void {
    this.formClosed.emit();
  }
}

