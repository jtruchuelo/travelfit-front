import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})

export class RegisterComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public status: string;
  public errorMsg: any;

  constructor(
    private _userService: UserService
  ) {
    this.pageTitle = 'Regístrate en TravelFit';
    this.user = new User (1, '', '', '', '', '');
  }

  ngOnInit() {
  }

  onSubmit(form) {

    this._userService.register(this.user).subscribe(
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
