import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IssueService } from 'src/app/Core/Services/issue.service';
import { MasterService } from 'src/app/Core/Services/master.service';
import { ProjectsService } from 'src/app/Core/Services/projects.service';

@Component({
  selector: 'app-filter-issue',
  templateUrl: './filter-issue.component.html',
  styleUrls: ['./filter-issue.component.css'],
})
export class FilterIssueComponent {
  projectArr: any[] = [];
  issueArr: any[] = [];
  statusArr: any[] = [];
  userArr: any[] = [];

  filterObj = {
    reporter: 0,
    assignedTo:0,
    statusId: 0,
    projectId: 0,
    issueTypeId: 0,
    searchText: '',
  };
  constructor(
    private issueSrv: IssueService,
    private projectSrv: ProjectsService,
    private statusSrv: MasterService,
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.issueType();
    this.statusType();
    this.userType();
  }

  filterProject() {
    
    this.issueSrv.getIssuesByFilter(this.filterObj).subscribe((res: any) => {});
  }

  loadProjects() {
    this.projectSrv.getAllProject().subscribe((response: any) => {
      this.projectArr = response.data;
    });
  }

  issueType(){
    this.issueSrv.getAllIssueTypes().subscribe((response:any) =>{
     this. issueArr= response.data;
    });
  }

  statusType(){
    this.statusSrv.getAllStatus().subscribe((response:any) =>{
     this. statusArr= response.data;
    });
  }

  userType(){
    this.statusSrv.getAllUser().subscribe((response:any) =>{
     this. userArr= response.data;
    });
  }
}
