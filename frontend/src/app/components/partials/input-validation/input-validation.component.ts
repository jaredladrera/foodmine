import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATOR_MESSAGES: any = {
  required: 'Should not be empty',
  email: 'Email is not valid',
  minlength: 'Field is too short',
  notMatch: 'Password and confirm does not match'
}

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {

  @Input() control!: AbstractControl;
  @Input() showErrorWhen: boolean = true;
  @Input() errorMessages: string[] = []

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation()
  }

  ngOnInit(): void {

    //for validation status change
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });

    //for input value change
    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    })
  }

  checkValidation() {
    const errors = this.control.errors;
    if(!errors) {
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATOR_MESSAGES[key]);
  }

}
