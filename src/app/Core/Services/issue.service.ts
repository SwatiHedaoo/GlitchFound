import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { constant } from '../Constant/constant';

@Injectable({
  providedIn: 'root'
})
export class IssueService {



  public issueCreatedSubject = new Subject();
  public projectChangeSubject = new Subject<number>();

  constructor(private http:HttpClient) { }







// For Issue
  getAllIssue():Observable<any[]>{
    return this.http.get<any[]>(constant.apiCommonPart.allApi + constant.apiEndPoint.Issue.GetAllIssues);
  }
  addNewIssue(obj:any){
    return this.http.post(constant.apiCommonPart.allApi + constant.apiEndPoint.Issue.CreateIssue,obj);
  }
  updateIssue(obj:any){
    return this.http.post(constant.apiCommonPart.allApi + constant.apiEndPoint.Issue.UpdateIssue ,obj);
  }
  deleteIssue(id:any){
    return this.http.get(constant.apiCommonPart.allApi + constant.apiEndPoint.Issue.DeleteIssueById +id)
  }
  editIssue(id:any){
    return this.http.get(constant.apiCommonPart.allApi + constant.apiEndPoint.Issue.GetIssueById +id)
  }

  // For Attachment
  addAttachment():Observable<any[]>{
    return this.http.get<any[]>(constant.apiCommonPart.allApi + constant.apiEndPoint.attachment.AddAttachment);
  }
  uploadAttachment(obj:any){
    return this.http.post(constant.apiCommonPart.allApi + constant.apiEndPoint.attachment.uploadAttachment,obj);
  }
  getAllAttachmentByIssueId(id:number):Observable<any[]>{
    return this.http.get<any[]>(constant.apiCommonPart.allApi + constant.apiEndPoint.attachment.GetAllAttachmentByIssueId+id);
  }

  //  For Comments

  getAllComment(id:number):Observable<any[]>{
    return this.http.get<any[]>(constant.apiCommonPart.allApi + constant.apiEndPoint.comment.GetAllCommentByIssueId+id); //Dought(GetAllCommentByIssueId)
  }
  addNewComment(obj:any){
    return this.http.post(constant.apiCommonPart.allApi + constant.apiEndPoint.comment.AddComment,obj);
  }
  updateComment(id:any){
    return this.http.get(constant.apiCommonPart.allApi + constant.apiEndPoint.comment.UpdateComment + id);
  }
  deleteComment(id:any){
    return this.http.get(constant.apiCommonPart.allApi + constant.apiEndPoint.comment.DeleteCommentById +id, {})
  }

  getIssuesByFilter(obj:any){
    return this.http.post(constant.apiCommonPart.allApi + constant.apiEndPoint.filter.GetIssuesByFilter,obj);
  }

  getAllIssueTypes(){
    return this.http.get(constant.apiCommonPart.allApi + constant.apiEndPoint.issueType.GetAllIssueTypes);
  }
  addnewIssueType(){
    return this.http.get(constant.apiCommonPart.allApi + constant.apiEndPoint.issueType.AddNewType);

  }
  updateIssueType(){
    return this.http.get(constant.apiCommonPart.allApi + constant.apiEndPoint.issueType.UpdateIssueType);

  }
  deleteIssueType(id:any){
    return this.http.get(constant.apiCommonPart.allApi + constant.apiEndPoint.issueType.DeleteIssueTypeById +id,{});

  }
 }
