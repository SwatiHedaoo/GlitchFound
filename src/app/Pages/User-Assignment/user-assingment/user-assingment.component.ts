import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { projectUsers, projectUsersView } from 'src/app/Core/Classess/projectUsers';
import { ProjectsService } from 'src/app/Core/Services/projects.service';

@Component({
  selector: 'app-user-assingment',
  templateUrl: './user-assingment.component.html',
  styleUrls: ['./user-assingment.component.css']
})
export class UserAssingmentComponent implements OnInit {
  projectArray: any[] = [];
  projectUserArray: any[] = [];
  userArray: any[] = [];
  roleArray: any[] = [];

  userEmailId: string = "";
  userRole: string = "";
  projectUserObj: projectUsers;
  innerObj : projectUsersView;
  constructor(private ProjectUsersrv: ProjectsService, private http: HttpClient,private toastr:ToastrService) {
    this.projectUserObj = new projectUsers();
    this.innerObj =new projectUsersView();
   }

  ngOnInit() {
    this.loadAllProjectUser();
    this.loadAllUser();
    this.loadAllProject();
    this.loadAllRole();
  }

  loadAllUser() {
    this.ProjectUsersrv.getAllUser().subscribe((response: any) => {
      this.userArray = response.data;
    })
  }
loadAllRole(){
  this.ProjectUsersrv.getAllRoles().subscribe((response: any) => {
    this.roleArray = response.data;
  })
}
setUserEmail(userId:any){
  debugger;
  this.userEmailId = userId.emailId;
}
setUserRole(roleId:any){
  this.userRole = this.roleArray.find(m=>m.roleId==roleId).role;
}
  loadAllProjectUser() {
    this.ProjectUsersrv.getAllProjectUser().subscribe((response: any) => {
      this.projectUserArray = response.data;
    })
  }

  loadAllProject() {
    this.ProjectUsersrv.getAllProject().subscribe((response: any) => {
      this.projectArray = response.data;
    })
  }

  add(){
    debugger;
    this.innerObj.emailId = this.userEmailId;
    this.innerObj.role = this.userRole;

    this.projectUserObj.users.push(this.innerObj);
    this.innerObj =new projectUsersView();
  }
  saveProjectUsers() {
    debugger;
    this.projectUserObj.users.forEach(element => {
      element.projectId = this.projectUserObj.projectId;
    });
    this.ProjectUsersrv.addBulkUsersToProject(this.projectUserObj).subscribe((response: any) => {
      if(response.result){
        this.loadAllUser();
        this.toastr.success(response.message);
      }else{
        this.toastr.error(response.message);
      }
    })
    this.onReset();
  }

  deleteProjectUser(id:number) {
    this.ProjectUsersrv.deleteProjectUser(id).subscribe((response: any) => {
      if(response.result){
        this.loadAllUser();
        this.toastr.success(response.message);
      }else{
        this.toastr.error(response.message);
      }

    })
  }

  onReset() {
    this.projectUserObj = new projectUsers();
    this.innerObj =new projectUsersView();
  }
  delete(index){
    this.projectUserObj.users.splice(index,1);
  }
}




