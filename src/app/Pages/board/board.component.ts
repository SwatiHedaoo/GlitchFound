import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService } from 'src/app/Core/Services/issue.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  status: any[] = [];
  ticketList: any[] = [];
  filteredTicketList: any[] = [];
  selectedProjectData: any;

  searchObj: any = {
    "Reporter": 0,
    "AssignedTo": 0,
    "StatusId": 0,
    "ProjectId": 0,
    "IssueTypeId": 0,
    "SearchText": ""
  }
  allUsers: any[] = [];
  selecetdUserId: number = 0;
  openIssueId: number =0;
  openGuid: string ='';
  loggedUser: any ;
  constructor(private http: HttpClient, private router: Router, private issueService: IssueService) {

    const user = localStorage.getItem("LoggedUserData");
    if (user != null) {
      this.loggedUser = JSON.parse(user);
    }
    const projetcId = localStorage.getItem("selectedProjectData");
    if (projetcId != null) {
      this.selectedProjectData = JSON.parse(projetcId);
    }
    this.issueService.issueCreatedSubject.subscribe(projectId => {

      this.GetAllIssuesByProjectId();
    })
    this.issueService.projectChangeSubject.subscribe(project => {

      this.selectedProjectData = project;
      this.GetAllIssuesByProjectId();
    })

  }
  // onDragStart(event: DragEvent,obj:any) {
  //   console.log('start' + obj)
  //   // Set the data to be transferred during the drag operation
  //   event.dataTransfer?.setData('text/plain',obj.issueGuid);
  // }

  // onDragOver(event: DragEvent,obj:any) {
  //   console.log('on drop' + obj)
  //   // Prevent the default behavior to allow dropping
  //   event.preventDefault();
  // }

  // onDrop(event: DragEvent) {
  //   debugger
  //   // Prevent the default behavior to handle the drop
  //   event.preventDefault();

  //   const data = event.dataTransfer?.getData('text/plain');
  //   const draggableElement = document.getElementById(data!);
  //   const droppableElement = event.target as HTMLElement;

  //   droppableElement.appendChild(draggableElement);
  // }

  draggedTask = null;

  onDragStart(event, ticket) {
    this.draggedTask = ticket;
    //event.dataTransfer.setData('text/plain', this.draggedTask.innerHTML);
  }

  onDragOver(event, status) {
    event.preventDefault();
  }

  onDrop(event, status) {
    debugger;
    event.preventDefault();


    const ticket = this.filteredTicketList.find(m => m.issueId == this.draggedTask.issueId);
    if (ticket) {
      ticket.statusId = Number(event.currentTarget.id);
    }
    const originTicket = this.ticketList.find(m => m.issueId == this.draggedTask.issueId);
    if (originTicket) {
      originTicket.statusId = Number(event.currentTarget.id);
      this.updateTicketStatus(originTicket);
    }

    this.draggedTask = null;
  }

  ngOnInit(): void {
    this.getAllIssueStatus();

    this.getAllUserByProjectId();
    if(this.loggedUser.role == 1) {
      this.GetAllIssuesByProjectId();
    } else {
      this.GetAllAssignedIssuesByUserId();
    }
  }
  onUpdate() {
    if(this.loggedUser.role == 1) {
      this.GetAllIssuesByProjectId();
    } else {
      this.GetAllAssignedIssuesByUserId();
    }
  }
  GetAllAssignedIssuesByUserId() {
    this.http.get("http://onlinetestapi.gerasim.in/api/GlitchProd/GetAllAssignedIssuesByUserId?id=" + this.loggedUser.userId).subscribe((result: any) => {
        this.ticketList = result.data;
        this.filteredTicketList = result.data;
      })
  }

  getIssueByStatusId(statusId: number) {
    return this.filteredTicketList.filter(m => m.statusId == statusId);
  }

  openTicket(issueId: number) {
    this.router.navigate(['browse', issueId]);
  }
  openTicketModel(issueId: number,guid: string) {
    this.openIssueId = issueId;
    this.openGuid = guid;
    const model = document.getElementById("myModal");
    if(model !=null) {
      model.style.display = "block";
    }
  }
  closeTicketModel() {
    this.openIssueId = 0;
    this.openGuid = '';
    const model = document.getElementById("myModal");
    if(model !=null) {
      model.style.display = "none";
    }
  }

  selectUser(id: number) {
    debugger
    if (this.selecetdUserId === id) {
      this.selecetdUserId = 0;
      this.filteredTicketList = this.ticketList
    } else {
      this.selecetdUserId = id;
      this.filteredTicketList = this.ticketList.filter(m => m.assignedTo == this.selecetdUserId);
    }
  }
  getAllIssueStatus() {
    this.http.get("http://onlinetestapi.gerasim.in/api/GlitchProd/GetAllIssueStatus").subscribe((result: any) => {
      this.status = result.data;
    })
  }
  getAllUserByProjectId() {
    this.http.get("http://onlinetestapi.gerasim.in/api/GlitchProd/GetProjectUsersByProjectId?id=" + this.selectedProjectData.projectId).subscribe((result: any) => {
      this.allUsers = result.data;
    })
  }
  GetAllIssuesByProjectId() {
    if (this.selectedProjectData && this.selectedProjectData.projectId) {
      this.http.get("http://onlinetestapi.gerasim.in/api/GlitchProd/GetAllIssuesByProjectId?id=" + this.selectedProjectData.projectId).subscribe((result: any) => {
        this.ticketList = result.data;
        this.filteredTicketList = result.data;
      })
    }
  }

  updateTicketStatus(obj: any) {

    this.http.post("http://onlinetestapi.gerasim.in/api/GlitchProd/UpdateIssue", obj).subscribe((result: any) => {

    })
  }

  filterIssues(search: string) {
    this.filteredTicketList = this.ticketList.filter(m => m.summary.toLowerCase().startsWith(search.toLowerCase()))
    // this.http.post("http://onlinetestapi.gerasim.in/api/GlitchProd/GetIssuesByFilter", this.searchObj).subscribe((result: any) => {
    //   this.ticketList = result.data;
    //   this.filteredTicketList = result.data;
    // })
  }

}
