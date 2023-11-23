import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { issueClass } from 'src/app/Core/Classess/issueClass';
import { IssueService } from 'src/app/Core/Services/issue.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
})
export class IssueComponent implements OnInit {
  issueClassObj = new issueClass();
  userdetail: any;
  projectdetails: any;

  usersArr: any[] = [];
  issueArr: any[] = [];
  projectarr: any[] = [];
  issuestatusarr: any[] = [];
  value: number[];
  imgUrl = 'http://storeapi.gerasim.in/customer/';

  attachmentObj: any = {
    "IssueAttachmentId": 0,
    "AttachmentFileName": "",
    "FileType": "",
    "IssueId": 0
  };
  attachmentObjArray: any []= []


  constructor(private http: HttpClient, private issueSrv: IssueService,private toastr:ToastrService) {
    this.issueClassObj.priority = 'Normal';
  }

  ngOnInit(): void {
    const local = localStorage.getItem('LoggedUserData');
    if (local != null) {
      this.userdetail = JSON.parse(local);
      this.issueClassObj.reporter = this.userdetail.userId;
    }

    const project = localStorage.getItem("selectedProjectData");
    if(project != "undefined") {
      this.issueClassObj.projectId = JSON.parse(project).projectId;
    }

    this.getAllIssueType();
    this.getallproject();
    this.getallissuestatus();
    this.getallusers();
  }

  issue(item: any) {}

  closeModal() {
    document.getElementById('myModals').style.display = 'none';
  }

  getAllIssueType() {
    this.http
      .get('http://onlinetestapi.gerasim.in/api/GlitchProd/GetAllIssueTypes')
      .subscribe((result: any) => {
        this.issueArr = result.data;
        const obj = this.issueArr.find(m=>m.issueType == 'Task');
        if(obj != undefined) {
          this.issueClassObj.issueType = obj.issueTypeId
        }
      });
  }
  onUploadFile(event: any) {
    debugger;
    if (event.currentTarget.files.length > 0) {
      const file = event.currentTarget.files[0];
      if (file.type == 'img/png' || file.type == 'image/png' || file.type == 'image/jpeg') {
        const formData = new FormData();
        formData.append('file', file);
        this.http.post('https://storeapi.gerasim.in/api/Customer/Upload', formData).subscribe((res: any) => {
          this.attachmentObj.AttachmentFileName = res;
          this.attachmentObjArray.push(this.attachmentObj);
          this.attachmentObj = {
            "IssueAttachmentId": 0,
            "AttachmentFileName": "",
            "FileType": "",
            "IssueId": 0
          };
        });
      } else {
        this.toastr.warning('please attach jpg and png image');
      }
    }
  }
  uploadAttachments(issueId: number) {
    debugger;
    this.attachmentObjArray.forEach(element => {
      element.IssueId = issueId;
    });
    this.http.post('http://onlinetestapi.gerasim.in/api/GlitchProd/UploadMultpleAttachment', this.attachmentObjArray)
      .subscribe((result: any) => {

      });
  }

  getallproject() {
    const selectproj = localStorage.getItem('projectId');
    this.http
      .get('https://onlinetestapi.gerasim.in/api/GlitchProd/GetAllProject')
      .subscribe((result: any) => {
        this.projectarr = result.data;
        this.projectdetails = this.projectarr.find(
          (m) => m.projectId == selectproj
        );
      });
  }

  getallissuestatus() {
    this.http
      .get('https://onlinetestapi.gerasim.in/api/GlitchProd/GetAllIssueStatus')
      .subscribe((result: any) => {
        this.issuestatusarr = result.data;
        const obj = this.issuestatusarr.find(m=>m.status == 'To Do');
        if(obj != undefined) {
          this.issueClassObj.statusId  = obj.statusId
        }
      });
  }

  getallusers() {
    debugger;
    this.http
      .get('http://onlinetestapi.gerasim.in/api/GlitchProd/GetProjectUsersByProjectId?id='+ this.issueClassObj.projectId)
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
    this.http.post('http://onlinetestapi.gerasim.in/api/GlitchProd/CreateIssue', this.issueClassObj )
      .subscribe((result: any) => {

        if(result.result){
          this.uploadAttachments(result.data.issueId);
          this.issueSrv.issueCreatedSubject.next(true);
          this.toastr.success(result.Message);
        }else{
          this.toastr.error(result.Message);
        }
        // this.issueSrv.issueCreatedSubject.next(true);
      });
  }
  ClosePopup() {
    this.issueSrv.issueCreatedSubject.next(false);
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
