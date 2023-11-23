import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { constant } from '../Constant/constant';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  public newUserSubject = new Subject();
  constructor(private http:HttpClient) { }

  // For Status
  getAllStatus():Observable<any[]>{
    return this.http.get<any[]>(constant.apiCommonPart.allApi + constant.apiEndPoint.status.GetAllIssueStatus);
  }
  addNewStatus(obj:any){
    return this.http.post(constant.apiCommonPart.allApi + constant.apiEndPoint.status.AddNewStatus,obj);
  }
  updateStatus(obj:any){
    return this.http.post(constant.apiCommonPart.allApi + constant.apiEndPoint.status.UpdateStatus,obj);
  }

  deleteStatus(id:any){
    return this.http.get(constant.apiCommonPart.allApi + constant.apiEndPoint.status.DeleteStatusById +id)
  }

  // For User
  getAllUser():Observable<any[]>{
    return this.http.get<any[]>(constant.apiCommonPart.allApi + constant.apiEndPoint.User.GetAllUsers);
  }
  addNewUser(obj:any){
    return this.http.post(constant.apiCommonPart.allApi + constant.apiEndPoint.User.CreateUser,obj);
  }
  EditUser(id:any){
    return this.http.get(constant.apiCommonPart.allApi + constant.apiEndPoint.User.GetUserById + id);
  }
  deleteUser(id:any){
    return this.http.get(constant.apiCommonPart.allApi + constant.apiEndPoint.User.DeleteUserById +id)
  }

  // For IssueType
  getAllIssueType():Observable<any[]>{
    return this.http.get<any[]>(constant.apiCommonPart.allApi + constant.apiEndPoint.issueType.GetAllIssueTypes);
  }
  addNewIssueType(obj:any){
    return this.http.post(constant.apiCommonPart.allApi + constant.apiEndPoint.issueType.AddNewType,obj);
  }
  updateIssueType(obj:any){
    return this.http.post(constant.apiCommonPart.allApi + constant.apiEndPoint.issueType.UpdateIssueType,obj);
  }
  deleteIssueType(id:any){
    return this.http.get(constant.apiCommonPart.allApi + constant.apiEndPoint.issueType.DeleteIssueTypeById +id)
  }

  addComment(obj:any){
    return this.http.post(constant.apiCommonPart.allApi + constant.apiEndPoint.comment.AddComment,obj);
  }

}

