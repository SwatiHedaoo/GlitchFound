import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/Login/login/login.component';
import { LayoutComponent } from './Layout/layout/layout.component';
import { CreateTicketComponent } from './Pages/create-ticket/create-ticket.component';
import { CreateProjectComponent } from './Pages/create-project/create-project.component';
import { AssignProjectComponent } from './Pages/assign-project/assign-project.component';
import { IssueComponent } from './Pages/Admin/issue/issue.component';
import { StatusComponent } from './Pages/Admin/status/status.component';
import { UserComponent } from './Pages/Admin/user/user.component';
import { UserAssingmentComponent } from './Pages/User-Assignment/user-assingment/user-assingment.component';

import { ViewTicketPageComponent } from './Shared/ReusableComponent/view-ticket-page/view-ticket-page.component';
import { BoardComponent } from './Pages/board/board.component';
import { FilterIssueComponent } from './Pages/filter-issue/filter-issue.component';
import { IssuetypeComponent } from './Pages/Admin/issuetype/issuetype.component';




const routes: Routes = [
  {
    path:'',
    component:LoginComponent,
   },
 {
  path:'login',
  component:LoginComponent,
 },

 {
  path:'',
  component:LayoutComponent,
  children:[
    {
      path:"issue",
      component:IssueComponent,
     },
     {
      path:"status",
      component:StatusComponent,
     },
     {
      path:"users",
      component:UserComponent,
     },
     {
      path:"createTicket",
      component:CreateTicketComponent,
     },
     {
      path:"createProject",
      component:CreateProjectComponent,
     },
     {
      path:"assignProject",
      component:AssignProjectComponent,
     },
     {
      path:"User-Assign",
      component:UserAssingmentComponent
     },
     {
      path:"browse/:id",
      component:ViewTicketPageComponent
     },
     {
      path:"Board",
      component:BoardComponent

     },
     {
      path:"filterIssue",
      component:FilterIssueComponent
     },
     {
      path:"issue-type",
      component:IssuetypeComponent
     }
  ]
 },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
