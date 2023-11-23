import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './Pages/Admin/user/user.component';
import { StatusComponent } from './Pages/Admin/status/status.component';
import { IssueComponent } from './Pages/Admin/issue/issue.component';
import { CreateProjectComponent } from './Pages/create-project/create-project.component';
import { AssignProjectComponent } from './Pages/assign-project/assign-project.component';
import { CreateTicketComponent } from './Pages/create-ticket/create-ticket.component';
import { LayoutComponent } from './Layout/layout/layout.component';
import { LoginComponent } from './Pages/Login/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserAssingmentComponent } from './Pages/User-Assignment/user-assingment/user-assingment.component';

import { ViewTicketPageComponent } from './Shared/ReusableComponent/view-ticket-page/view-ticket-page.component';

import { BoardComponent } from './Pages/board/board.component';
import { SubTaskComponent } from './Pages/sub-task/sub-task/sub-task.component';
import { FilterIssueComponent } from './Pages/filter-issue/filter-issue.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule } from 'primeng/editor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { IssuetypeComponent } from './Pages/Admin/issuetype/issuetype.component';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    StatusComponent,
    IssueComponent,
    CreateProjectComponent,
    AssignProjectComponent,
    CreateTicketComponent,
    LayoutComponent,
    LoginComponent,
    UserAssingmentComponent,


    ViewTicketPageComponent,

    BoardComponent,
    SubTaskComponent,
    FilterIssueComponent,
    IssuetypeComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    EditorModule ,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    })
  ],
  providers: [ { provide: LocationStrategy, useClass: HashLocationStrategy },],
  bootstrap: [AppComponent]
})
export class AppModule { }
