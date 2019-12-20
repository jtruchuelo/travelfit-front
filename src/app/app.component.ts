import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService],

})
export class AppComponent implements OnInit, DoCheck {

  title = 'TravelFit Home';
  public identity;
  public userToken: string;

  constructor (
    public _userService: UserService,
    ) {
    this.loadUser();
  }

  ngOnInit() {
    console.log("TravelFit");
  }

  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.userToken = this._userService.getToken();
  }
}
