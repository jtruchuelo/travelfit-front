import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // ESTO

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public status: string;
  public userToken: string;
  public identity;

  constructor(
    private _userServices: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    public activeModal: NgbActiveModal
  ) {
    this.pageTitle = 'Iniciar sesión en TravelFit';
    this.user = new User (1, '', '', '', '', '');
  }
  ngOnInit() {
    this.logout();
  }

  onSubmit(form) {

    this._userServices.login(this.user).subscribe(
      response => {
        console.log(response);
        if (response.status != 'error') {
          this.status = 'success';
          this.userToken = response.userToken;
          this.identity = response.user;

          console.log(this.userToken);
          console.log(this.identity);

          localStorage.setItem('userToken', this.userToken);
          localStorage.setItem('identity', JSON.stringify(this.identity));

          this.activeModal.close();
          this._router.navigate(['home']);
        } else {
          this.status = 'error';
        }
        form.reset();
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  logout() {
    localStorage.getItem('userToken') ? this._userServices.logout(localStorage.getItem('userToken')).subscribe() : null;

    this._route.params.subscribe(params =>{
      let logout = +params['sure'];
      if(logout == 1){

        localStorage.removeItem('identity');
        localStorage.removeItem('userToken');

        this.identity = null;
        this.userToken = null;

        this._router.navigate(['home']);
      }
    });
  }
}

@Component({
  selector: 'login-modal-component',
  template: '<button type="button" class="btn btn-success mx-1" (click)="open()">Iniciar sesión</button>'
})
export class NgbdModalComponent {
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(LoginComponent);
  }
}
