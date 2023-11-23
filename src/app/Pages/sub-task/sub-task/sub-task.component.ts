import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { issueClass } from 'src/app/Core/Classess/issueClass';

@Component({
  selector: 'app-sub-task',
  templateUrl: './sub-task.component.html',
  styleUrls: ['./sub-task.component.css']
})
export class SubTaskComponent {
  projectdetails:any
  issueClassObj = new issueClass();
  userdetail: any;
  usersArr: any[] = [];
  issueArr: any[] = [];
  projectarr: any[] = [];
  issuestatusarr: any[] = [];

  constructor(private http: HttpClient,private toastr:ToastrService) {
   this. getAllIssues()
    this.getAllIssueType();
    this.getallproject();
    this.getallissuestatus();
    this.getallusers();

    const local = localStorage.getItem('LoggedUserData');
    if (local != null) {
      this.userdetail = JSON.parse(local);
      this.issueClassObj.reporter = this.userdetail.userId;
    }

  }


  issue(item: any) {}

  openModal(){

    const modalDiv=document.getElementById('myModals');
 if(modalDiv!=null){
 modalDiv.style.display='block';
 }
    }

  closeModal(){
    document.getElementById('myModals').style.display= 'none';

  }

  getAllIssueType() {
    this.http
      .get('http://onlinetestapi.gerasim.in/api/GlitchProd/GetAllIssueTypes')
      .subscribe((result: any) => {
        this.issueArr = result.data;
      });
  }

  getallproject() {
    const selectproj =localStorage.getItem('projectId');
    this.http
      .get('https://onlinetestapi.gerasim.in/api/GlitchProd/GetAllProject')
      .subscribe((result: any) => {
        this.projectarr = result.data;
        this.projectdetails = this.projectarr.find(m=>m.projectId==selectproj)
      });
  }

  getallissuestatus() {
    this.http
      .get('https://onlinetestapi.gerasim.in/api/GlitchProd/GetAllIssueStatus')
      .subscribe((result: any) => {
        this.issuestatusarr = result.data;
      });
  }

  getallusers() {
    this.http
      .get('https://onlinetestapi.gerasim.in/api/GlitchProd/GetAllUsers')
      .subscribe((result: any) => {
        this.usersArr = result.data;
      });
  }

  getAllIssues() {
    this.http
      .get('http://onlinetestapi.gerasim.in/api/GlitchProd/GetAllIssues')
      .subscribe((result: any) => {});
  }
  getAllIssueById(id: number) {
    this.http
      .get(
        'http://onlinetestapi.gerasim.in/api/GlitchProd/GetAllIssuesByTypeId?id=' +
          id
      )
      .subscribe((result: any) => {});
  }
  getAllIssueByStatusId(id: number) {
    this.http
      .get(
        'http://onlinetestapi.gerasim.in/api/GlitchProd/GetAllIssuesByStatusId?id=' +
          id
      )
      .subscribe((result: any) => {});
  }
  getAllIssueByCreateId(id: number) {
    this.http
      .get(
        'http://onlinetestapi.gerasim.in/api/GlitchProd/GetAllIssuesCreatedByUserId?id=' +
          id
      )
      .subscribe((result: any) => {});
  }
  getAllIssueByProjectId(id: number) {
    this.http
      .get(
        'http://onlinetestapi.gerasim.in/api/GlitchProd/GetAllIssuesByProjectId?id=' +
          id
      )
      .subscribe((result: any) => {});
  }
  getAllAssignedIssueByUserId(id: number) {
    this.http
      .get(
        'http://onlinetestapi.gerasim.in/api/GlitchProd/GetAllAssignedIssuesByUserId?id=' +
          id
      )
      .subscribe((result: any) => {});
  }
  uploadAttachment(obj: any) {
    this.http
      .post('http://onlinetestapi.gerasim.in/api/GlitchProd/uploadAttachment', obj)
      .subscribe((result: any) => {});
  }

  createIssue() {
    this.http
      .post(
        'http://onlinetestapi.gerasim.in/api/GlitchProd/CreateIssue',
        this.issueClassObj
      )
      .subscribe((result: any) => {
        if(result.result){
          this.toastr.success(result.message);
          this.getAllIssues();
          this.closeModal();
        }else{
          this.toastr.error(result.message);
        }
      });
  }
  updateIssue(obj: any) {
    this.http
      .post('http://onlinetestapi.gerasim.in/api/GlitchProd/UpdateIssue', obj)
      .subscribe((result: any) => {});
  }

  onReset() {
    this.issueClassObj = new issueClass();
  }
}
