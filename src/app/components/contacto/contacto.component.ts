import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public pageTitle: string;

  constructor() {
    this.pageTitle = 'Contacto';
  }

  ngOnInit() {
  }

}
