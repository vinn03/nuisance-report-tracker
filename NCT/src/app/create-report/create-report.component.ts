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

  constructor(private fb: FormBuilder) {

    this.villainForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      reportee: ['', Validators.required],
      time: ['', Validators.required],
      status: ['', Validators.required],
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
}

