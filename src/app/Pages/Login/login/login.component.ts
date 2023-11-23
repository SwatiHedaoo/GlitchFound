import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  visible: boolean = false;
  changetype: boolean = true
  isFormSubmited: boolean = false;
  isApiCallInProgress = false
  loginObj: any = {
    userName: '',
    userPassword: ''
  }
  showRegister: boolean = false;
  usersObj = {
    "userId": 0,
    "emailId": "",  //=> this will be username while login
    "password": "",
    "role": 3,   // => call api  api/GlitchProd/GetAllRoles to get roles
    "createdDate": "2023-04-12T14:02:58.116Z",
    "isActive": true,
    "technicalStack": "Na",
    'fullName':''
  }
  rolesarr: any[] = [];

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) {
    this.getAllroles();
  }
  getAllroles() {
    this.http.get('https://onlinetestapi.gerasim.in/api/GlitchProd/GetAllRoles').subscribe((result: any) => {
      this.rolesarr = result.data
    })
  }
  saveUser() {
    this.usersObj.role = 3;
    this.http.post("http://onlinetestapi.gerasim.in/api/GlitchProd/CreateUser", this.usersObj).subscribe((result: any) => {
      if (result.result) {
        this.toastr.success('Registration Done. Do Login Now');
        this.usersObj = {
          "userId": 0,
          "emailId": "",
          "password": "",
          "role": 3,
          "createdDate": "2023-04-12T14:02:58.116Z",
          "isActive": true,
          "technicalStack": "",
          'fullName':''
        };
      } else {
        this.toastr.error(result.message);
      }

    })
  }
  onLogin() {

    this.isFormSubmited = true
    if (this.isApiCallInProgress == false) {
      this.isApiCallInProgress = true;
      this.http.post("http://onlinetestapi.gerasim.in/api/GlitchProd/Login", this.loginObj).subscribe((result: any) => {
        if (result.result) {

          localStorage.setItem('LoggedUserData', JSON.stringify(result.data))
          this.router.navigateByUrl('users')
        } else {
          this.toastr.warning('Check email or password');
        }
        this.isApiCallInProgress = false;
      })
    }
  }

  viewPassword() {
    this.visible = !this.visible
    this.changetype = !this.changetype
  }
}
