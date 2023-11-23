import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { IssueService } from 'src/app/Core/Services/issue.service';
import { MasterService } from 'src/app/Core/Services/master.service';
import { ProjectsService } from 'src/app/Core/Services/projects.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit{
  projectList: any[];
  userList: any[];
  projectForm : any;
  isLoader : boolean;
  isbtnLoader : boolean;
  showMore : boolean;
  searchText : string;
  sortedProjectList : any[];
  todayDate : Date = new Date();
  loggedUserData: any;

  constructor(private mastSrv:MasterService, private projectSrv:ProjectsService,private toastr:ToastrService){
    this.projectList = [];
    this.userList = [];
    this.isLoader = false;
    this.isbtnLoader = false;
    this.showMore = false;
    this.searchText = "";
    this.sortedProjectList = [];

    this.projectForm = {
      "projectId":0,
      "shortName":"",
      "fullName":"",
      "startDate": "",
      "leadBy": null,
      "teamSize": null,
      "expectedEndDate":"",
      "technologyStack": "",
      "createdDate":new Date,
      "createdBy":28
    }
  }
  ngOnInit(): void {
    const data  =   localStorage.getItem('LoggedUserData')
    if(data != null) {
      const userData= JSON.parse(data);
      this.projectForm.createdBy =  userData.userId;
    }
    this.loadProjects();
    this.loadUsers();
    this.projectSrv.newProjectSubject.subscribe((res:any)=>{
      this.openModel();
    })
  }
  loadProjects(){
    this.isLoader = true;
    this.projectSrv.getAllProject().subscribe((response:any)=>{
      this.isLoader = false;
      this.projectList = response.data;
      this.sortedProjectList = this.projectList;
    })
  }
  loadUsers(){
    this.mastSrv.getAllUser().subscribe((response:any)=>{
      this.userList = response.data;
    })
  }
  openModel(){

    document.getElementById('myModal').style.display= 'block';
  }
  closeModal(form:NgForm){
    document.getElementById('myModal').style.display= 'none';
    form.reset();
    this.projectForm = {
      "projectId":0,
      "shortName":"",
      "fullName":"",
      "startDate": "",
      "leadBy": null,
      "teamSize": null,
      "expectedEndDate":"",
      "technologyStack": "",
      "createdDate":new Date,
      "createdBy":28
    }
  }
  saveProject(form:NgForm){
    if (form.invalid){
      this.toastr.warning("Form is invalid");
    }else{
    this.isbtnLoader = true;
    this.projectSrv.addNewProject(this.projectForm).subscribe((result:any)=>{
      this.isbtnLoader = false;
      if(result.result == true){
        this.toastr.success(result.message);
        this.loadProjects();
        this.closeModal(form);
        this.projectSrv.projectCreatedSubject.next(true);
      }else
      {
        this.toastr.error(result.message);
      }
    })
  }
  }
  onEdit(id:number){
    this.projectSrv.getProjectById(id).subscribe((res:any)=>{
      this.projectForm = res.data;
      document.getElementById('myModal').style.display= 'block';

      setTimeout(() => {
        const dat = new Date(this.projectForm.startDate);
        const day = ('0' + dat.getDate()).slice(-2);
        const month = ('0' + (dat.getMonth() + 1)).slice(-2);
        const today = dat.getFullYear() + '-' + (month) + '-' + (day);
        // tslint:disable-next-line:no-string-literal
        document.getElementById('txtStartDate')['value'] = today;
      }, 2000);
      setTimeout(() => {
        const dat = new Date(this.projectForm.expectedEndDate);
        const day = ('0' + dat.getDate()).slice(-2);
        const month = ('0' + (dat.getMonth() + 1)).slice(-2);
        const today = dat.getFullYear() + '-' + (month) + '-' + (day);
        // tslint:disable-next-line:no-string-literal
        document.getElementById('txtEndDate')['value'] = today;
      }, 2000);
    })
  }
  updateProject(form:NgForm){
    if (form.invalid){
      this.toastr.error("Form is invalid");
    }else{
    this.isbtnLoader = true;
    this.projectSrv.updateProject(this.projectForm).subscribe((result:any)=>{
      this.isbtnLoader = false;
      if(result.result == true){
        this.toastr.success(result.message);
        this.loadProjects();
        this.closeModal(form);
        this.projectSrv.projectCreatedSubject.next(true);
      }else
      {
        this.toastr.error(result.message);
      }
    })
  }
  }
  onDelete(id:number){
    const isDelete = confirm("Are you sure to delete record?");
    if(isDelete)
    this.projectSrv.deleteProject(id).subscribe((result:any)=>{
      if(result.result == true){
        this.toastr.success(result.message);
        this.loadProjects();
      }else
      {
        this.toastr.error(result.message);
      }
    })
  }
  onSearch(){

     this.sortedProjectList = this.projectList.filter(res =>{
       return res.shortName.toLocaleLowerCase().match(this.searchText ) ||
       res.fullName.toLocaleLowerCase().match(this.searchText)
     })
    }
}
