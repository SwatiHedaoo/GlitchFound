import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from 'src/app/Core/Services/master.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  usersarr: any[] = [];
  rolesarr: any[] = []

  usersObj = {
    "userId": 0,
    "emailId": "",  //=> this will be username while login
    "password": "",
    "role": '',   // => call api  api/GlitchProd/GetAllRoles to get roles
    "createdDate": "2023-04-12T14:02:58.116Z",
    "isActive": true,
    "technicalStack": ""
  }

  constructor(private mstrsrv: MasterService, private http: HttpClient,private toastr:ToastrService) {

  }


  ngOnInit(): void {
    this.getalluser();
    this.getAllroles();
    this.mstrsrv.newUserSubject.subscribe((res:any)=>{
      this.openmodal();
    })
  }


  openmodal() {
    const modaldiv = document.getElementById('myModal');
    if (modaldiv != null)
      modaldiv.style.display = 'block'
  }

  closemodal() {
    const modaldiv = document.getElementById('myModal');
    if (modaldiv != null)
      modaldiv.style.display = 'none'
  }

  getAllroles() {
    this.http.get('https://onlinetestapi.gerasim.in/api/GlitchProd/GetAllRoles').subscribe((result: any) => {
      this.rolesarr = result.data
    })
  }

  getalluser() {
    this.mstrsrv.getAllUser().subscribe((result: any) => {
      this.usersarr = result.data
    })
  }

  saveUser() {
    this.mstrsrv.addNewUser(this.usersObj).subscribe((result: any) => {
      if (result.result) {
       this.toastr.success(result.message);
        this.usersObj = {
          "userId": 0,
          "emailId": "",
          "password": "",
          "role": '',
          "createdDate": "2023-04-12T14:02:58.116Z",
          "isActive": true,
          "technicalStack": ""
        };
        this.closemodal();
        this.getalluser();
      } else {
        this.toastr.error(result.message);
      }

    })
  }

  edituser(id: number) {
    this.mstrsrv.EditUser(id).subscribe((result: any) => {
      this.usersObj = result.data
    })
  }

  deleteuser(id: number) {
    this.mstrsrv.deleteUser(id).subscribe((result: any) => {
      this.getalluser();
    })
  }
}
