import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from 'src/app/Core/Services/master.service';

@Component({
  selector: 'app-issuetype',
  templateUrl: './issuetype.component.html',
  styleUrls: ['./issuetype.component.css']
})
export class IssuetypeComponent {

  issueTypeObj:any={
    "issueTypeId": 0,
    "issueType": ""
  }
  issueTypeArray:any[]=[]
  constructor(private masterSrv:MasterService, private toastr:ToastrService){
this.getAllIssueType()
  }
  getAllIssueType() {
    this.masterSrv.getAllIssueType().subscribe((result: any) => {
      this.issueTypeArray = result.data;
    })
  }

  addIssueType() {
    this.masterSrv.addNewIssueType(this.issueTypeObj).subscribe((result: any) => {
     // this.issueTypeObj = result;
     if(result.result){
      this.getAllIssueType();
      this.toastr.success(result.message);
      this.onReset();
      this.closeIssue();
    }else{
      this.toastr.error(result.message);
    }

    })
  }

  updateIssueType() {
    this.masterSrv.updateIssueType(this.issueTypeObj).subscribe((result: any) => {
      //this.issueTypeObj = result;
      if(result.result){
      this.getAllIssueType();
      this.toastr.success(result.message);
      this.onReset();
      this.closeIssue();
      }else{
        this.toastr.error(result.message);
      }
    })
  }

  onEdite(issue: any) {
    this.openIssue();
    this.issueTypeObj = issue;
  }

  onDelete(id: number) {
    this.masterSrv.deleteIssueType(id).subscribe((result: any) => {
      if(result.result){
        this.getAllIssueType();
        this.toastr.success(result.message);
      }else{
        this.toastr.error(result.message);
      }
    })
  }

  openIssue() {
    debugger;
    //this.onReset();
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = "block";
    }
  }


  closeIssue() {
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = "none";
    }
  }

  onReset() {
    this.issueTypeObj =
      {
        "IssueTypeId": 0,
        "IssueType": ""

    }
  }
}
