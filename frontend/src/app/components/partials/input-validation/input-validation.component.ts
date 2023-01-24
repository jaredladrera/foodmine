import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATOR_MESSAGES: any = {
  required: 'Should not be empty',
  email: 'Email is not valid'
}

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit {

  @Input() control!: AbstractControl;
  @Input() showErrorWhen: boolean = true;
  @Input() errorMessages: string[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
