
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from 'src/app/Core/Services/master.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  statusArray: any[] = [];

  statusObj: any = {
    "statusId": 0,
    "status": "",
    "isActive": true
  }

  constructor(private masterSrv: MasterService,private toastr:ToastrService) {

  }

  ngOnInit() {
    this.getStatus();
  }

  getStatus() {
    this.masterSrv.getAllStatus().subscribe((result: any) => {
      this.statusArray = result.data;
    })
  }

  addStatus() {
    this.masterSrv.addNewStatus(this.statusObj).subscribe((result: any) => {
     // this.statusObj = result;
     if(result.result){
      this.getStatus();
      this.toastr.success(result.message);
      this.onReset();
      this.closeStatus();
     }
     else{
      this.toastr.error(result.message);
     }
    })
  }

  updateStatus() {
    this.masterSrv.updateStatus(this.statusObj).subscribe((result: any) => {
      //this.statusObj = result;
      if(result.result){
        this.getStatus();
        this.toastr.success(result.message);
        this.onReset();
        this.closeStatus();
      }else{
        this.toastr.error(result.message);
      }
    })
  }

  onEdite(status: any) {
    this.openStatus();
    this.statusObj = status;
  }

  onDelete(id: number) {
    this.masterSrv.deleteStatus(id).subscribe((result: any) => {
      if(result.result){
        this.getStatus();
        this.toastr.success(result.message);
      }
      else{
        this.toastr.error(result.message);
      }
    })
  }

  openStatus() {
    this.onReset();
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = "block";
    }
  }


  closeStatus() {
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = "none";
    }
  }

  onReset() {
    this.statusObj = {
      "statusId": 0,
      "status": "",
      "isActive": true
    }
  }

}
