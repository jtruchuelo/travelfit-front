import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  providers: [ContactService]
})
export class ContactoComponent implements OnInit {

  public pageTitle: string;
  public name: string;
  public email: string;
  public subject: string;
  public message: string;
  public status: string;

  constructor(
    private _contactService: ContactService
  ) {
    this.pageTitle = 'Contacta con nosotros';
  }

  ngOnInit() {
  }

  onSubmit(form) {

    let message= {};
    message['name'] = this.name;
    message['email'] = this.email;
    message['subject'] = this.subject;
    message['message'] = this.message;

    this._contactService.contact(message).subscribe(
      response => {
        if (response.status == "success") {
          this.status = response.status;
          form.reset();
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
        this.status = error.error.status;
      }
    );
  }
}
