import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IssueService } from 'src/app/Core/Services/issue.service';
import { MasterService } from 'src/app/Core/Services/master.service';
import { ProjectsService } from 'src/app/Core/Services/projects.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {
  projectList: any[];
  recentProject:any;
  selectedProject: any;
  isModelOpen: boolean = false;
  isSideBar: boolean = false;
  loggedUser: any;
  constructor(private projectSrv: ProjectsService,private issueService: IssueService,private mastSrv:MasterService,private router: Router) {
    this.projectList = [];
    this.recentProject = '';
    this.selectedProject = '';
  }
  ngOnInit(): void {
    this.loadProjects();
    this.issueService.issueCreatedSubject.subscribe(res=>{
      this.closeModel()
    })
    this.projectSrv.projectCreatedSubject.subscribe((res:any)=>{
      this.loadProjects();
    })
  }
  openSidebar() {
    debugger;
    this.isSideBar = !this.isSideBar;
  }
  loadProjects() {
    const isProject =  localStorage.getItem('selectedProjectData');
    const loggedUserData =  localStorage.getItem('LoggedUserData');
    if(loggedUserData != null) {
      const user=  JSON.parse(loggedUserData);
      this.loggedUser =  user;
      if(user.role == 1) {
        this.projectSrv.getAllProject().subscribe((response: any) => {
          this.projectList = response.data;
            this.recentProject = this.projectList[0];
            localStorage.setItem('selectedProjectData',JSON.stringify(this.recentProject));
        })
      } else {
        this.projectSrv.getAssignedProjectByUserId(user.userId).subscribe((response: any) => {
          this.projectList = response.data;
            this.recentProject = this.projectList[0];
            localStorage.setItem('selectedProjectData',JSON.stringify(this.recentProject));
        })
      }
    }

  }
  changeProject(id: number) {
    this.selectedProject = this.projectList.find(m=>m.projectId == id);

    this.issueService.projectChangeSubject.next(this.selectedProject);
    debugger;
    localStorage.setItem('selectedProjectData',JSON.stringify(this.selectedProject));
  }
  openModel() {
    const model = document.getElementById("newTicketModel");
    if(model !== null) {
      this.isModelOpen = true;
      model.style.display = "block";
    }
  }
  closeModel() {
    const model = document.getElementById("newTicketModel");
    if(model !== null) {
      this.isModelOpen = false;
      model.style.display = "none";
    }
  }
  openProjectModal(){

    this.projectSrv.newProjectSubject.next(true);
  }
  openUserModel(){
    this.mastSrv.newUserSubject.next(true);
  }
  Logout(){
    localStorage.removeItem('LoggedUserData')
    this.router.navigateByUrl("login")
  }

}
