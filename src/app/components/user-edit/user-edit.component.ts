import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public identity;
  public userToken;
  public status;

  constructor(
    private _userService: UserService
  ) {
    this.pageTitle = 'Editar usuario';
    this.user = new User (1, '', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.userToken = this._userService.getToken();
    this.user = this.identity;
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this._userService.update(this.identity, this.userToken).subscribe(
      response => {
        console.log(response);
        if (response && response.status == 'success') {
          this.status = 'success';
          this.identity.name = this.user.name;
          this.identity.lastname = this.user.lastname;
          this.identity.username = this.user.username;
          this.identity.email = this.user.email;

          localStorage.setItem('identity', JSON.stringify(this.identity));
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    )
  }
}
