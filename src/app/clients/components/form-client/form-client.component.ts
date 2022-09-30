import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StateClient } from 'src/app/core/enums/state-client';
import { Client } from 'src/app/core/models/client';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})
export class FormClientComponent implements OnInit {

  @Input() init!: Client;

  public states = Object.values(StateClient);

  public form!: FormGroup;

  @Output() submitted = new EventEmitter<Client>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.init);

    this.form = this.fb.group({
      tva: [this.init.tva],
      state: [this.init.state],
      id: [this.init.id],
      name: [this.init.name],
      totalCaHt: [this.init.totalCaHt],
      comment: [this.init.comment],
    });
  }
  

  public onSubmit(){
      this.submitted.emit(this.form.value);
  }
}
