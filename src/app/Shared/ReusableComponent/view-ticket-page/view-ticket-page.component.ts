import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IssueService } from 'src/app/Core/Services/issue.service';
import { MasterService } from 'src/app/Core/Services/master.service';

@Component({
  selector: 'app-view-ticket-page',
  templateUrl: './view-ticket-page.component.html',
  styleUrls: ['./view-ticket-page.component.css'],
})
export class ViewTicketPageComponent implements OnInit {
  commentObj = {
    "commentId": 0,
    "issueId": 0,
    "userId": 0,
    "comment": " ",
    "createdOn": new Date(),
  };
  attachmentObjArray: any []= []
  usersArr:any[]=[]
  attachmentObj: any = {
    "IssueAttachmentId": 0,
    "AttachmentFileName": "",
    "FileType": "",
    "IssueId": 0
  };
  isVisible : boolean = false;
  @Input() issueId: number = 0;
  @Output() onUpdateEvent = new EventEmitter<boolean>()
  ticketData: any = {};
  logTime: any;
  comment: any[] = [];
  attchment: any[] = [];
  logTimeObj:any={

      "logId": 0,
      "logDate": "",
      "logComments": "",
      "time": 0,
      "issueId": 0
  }
  status:any[]=[];
  isEditDescription:boolean = false;
  isEditSummary:boolean = false;

  loggedUser: any;
  imgUrl = 'http://storeapi.gerasim.in/customer/';
  allUsers: any []= [];
  wholeUsers: any[]= [];
  isCreator: boolean = false;
  constructor(private http: HttpClient, private activateRoute: ActivatedRoute,
     private mastersrv:MasterService,private issueSrv:IssueService,private toastr:ToastrService) {
    this.activateRoute.params.subscribe((res: any) => {
      if(res.id != undefined) {
        this.issueId = res.id;

        this.logTimeObj.issueId=this.issueId;
        this.getIssue(this.issueId);
        this.getAttachment(this.issueId);
        this.getComment(this.issueId);
      }
    });
  }
  ngOnInit(): void {
    if(this.issueId != 0) {
      this.logTimeObj.issueId=this.issueId;
        this.getIssue(this.issueId);
        this.getAttachment(this.issueId);
        this.getComment(this.issueId);
    }
    this.getAllIssueStatus();
    this.getAllUser();
    const loggedUserData =  localStorage.getItem('LoggedUserData');
    if(loggedUserData != null) {
      const user=  JSON.parse(loggedUserData);
      this.loggedUser =  user;
    }
  }

  editSummary () {
    if(this.loggedUser.userId == this.ticketData.reporter) {
      this.isEditSummary = true;
    }
  }

  editDescription() {
    if(this.loggedUser.userId == this.ticketData.reporter) {
      this.isEditDescription = true;
    }
  }
  onUploadFile(event: any) {

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
          this.uploadAttachments();
        });
      } else {
        alert('please attach jpg and png');
      }
    }
  }
  uploadAttachments() {

    this.attachmentObjArray.forEach(element => {
      element.IssueId = this.ticketData.issueId;
    });
    this.http.post('http://onlinetestapi.gerasim.in/api/GlitchProd/UploadMultpleAttachment', this.attachmentObjArray)
      .subscribe((result: any) => {
        this.getAttachment(this.ticketData.issueId);
      });
  }
  getAllIssueStatus() {
    this.http.get("http://onlinetestapi.gerasim.in/api/GlitchProd/GetAllIssueStatus").subscribe((result: any) => {
      this.status = result.data;
    })
  }
  getAllUserByProjectId() {
    this.http.get("http://onlinetestapi.gerasim.in/api/GlitchProd/GetProjectUsersByProjectId?id=" + this.ticketData.projectId).subscribe((result: any) => {
      this.allUsers = result.data;
    })
  }
  getAllUser() {
    this.http.get("http://onlinetestapi.gerasim.in/api/GlitchProd/GetAllUsers").subscribe((result: any) => {
      this.wholeUsers = result.data;
    })
  }
  onLog() {
    this.http
      .post('http://onlinetestapi.gerasim.in/api/GlitchProd/AddLog', this.logTimeObj)
      .subscribe((res: any) => {
       if(res.result){
        this. GetAllLogsByIssueId(this.issueId)
        this.toastr.success(res.result)
       }else{
        this.toastr.error(res.result)
       }
      });
  }

  GetAllLogsByIssueId(id: number) {
    this.http
      .get(
        'http://onlinetestapi.gerasim.in/api/GlitchProd/GetAllLogsByIssueId?id=' +
          id
      )
      .subscribe((res: any) => {
        this.logTime = res.data;
      });
  }

  AddComment(){
    this.commentObj.userId = this.loggedUser.userId;
    this.commentObj.issueId = this.issueId;
     this.mastersrv.addComment(this.commentObj).subscribe((res:any) =>{
      if(res.result){
        this.isVisible = false;
        this.getComment(this.issueId);
      }
     })
  }
  getIssue(id: number) {
    debugger
    this.issueSrv.editIssue(id)
      .subscribe((res: any) => {
        this.ticketData = res.data;
        if(this.loggedUser.userId == this.ticketData.reporter) {
          this.isCreator = true;
        } else {
          this.isCreator = false;
        }
        this.getAllUserByProjectId();
      });
  }

  getAttachment(id: number) {
    this.issueSrv.getAllAttachmentByIssueId(id)
      .subscribe((res: any) => {
        this.attchment = res.data;
      });
  }
  attachPhoto: string = '';
  openAttach(url: string){
    this.attachPhoto = url;
    const modle = document.getElementById("attachModel");
    if(modle != null) {
      modle.style.display = 'block';
    }
  }
  closeAttach(){
    this.attachPhoto = '';
    const modle = document.getElementById("attachModel");
    if(modle != null) {
      modle.style.display = 'none';
    }
  }
  getComment(id: number) {
    this.issueSrv.getAllComment(id)
      .subscribe((res: any) => {
        this.comment = res.data;
      });
  }
  onUpdate(){
    this.issueSrv.updateIssue(this.ticketData).subscribe((res:any)=>{
       if(res.result){
       this.isEditDescription= false;
       this.isEditSummary=false;
       this.onUpdateEvent.emit(true)
       //this.getIssue(this.issueId);
       }
    })
  }
  onCancel(){
    this.isEditSummary =! this.isEditSummary;
  }


}
