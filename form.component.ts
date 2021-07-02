import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export interface IForm {
  location: string;
  fields: string;
  timesteps: string;
  units: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form: IForm = {
    location: '',
    fields: '',
    timesteps: '',
    units: '',
  };
  @Output() onSubmit = new EventEmitter<IForm>();
  constructor() {}

  handleSubmit(e: Event) {
    e.preventDefault();
    this.onSubmit.emit(this.form);
  }

  ngOnInit(): void {}
}
