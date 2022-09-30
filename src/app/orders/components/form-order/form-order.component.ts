import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateOrder } from 'src/app/core/enums/state-order';
import { Order } from 'src/app/core/models/order';

@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.scss']
})
export class FormOrderComponent implements OnInit {

  // déclarer une propriéte qui vient du parent
  @Input() init!: Order;

  // transformer l'enum en tableau
  public states = Object.values(StateOrder);

  //donner un nom au formulaire
  public form!: FormGroup;

  public error !: string;

  // evenement disponible à l'export
  @Output() submitted = new EventEmitter<Order>();

  constructor(
    // utilisation de formBuilder pour associer un input à une propriété d'un objet
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.init);
    //associer des valeurs à un objet
    this.form = this.fb.group({
      tjmHt: [this.init.tjmHt],
      nbJours: [this.init.nbJours],
      tva: [this.init.tva],
      state: [this.init.state],
      typePresta: [this.init.typePresta],
      client: [this.init.client, Validators.required],
      comment: [this.init.comment],
      id: [this.init.id],
    });
  }

  public onSubmit(){
    // envoyer la valeur this.form.value au parent
    // if (this.form.status === 'VALID'){
      this.submitted.emit(this.form.value);
    // } else {
    //   console.log('champ client obligatoire');
    //   this.error = 'champ client obligatoire';
    // }
  }
}
