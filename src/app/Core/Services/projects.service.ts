import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { constant } from '../Constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  public projectCreatedSubject = new Subject();
  public newProjectSubject = new Subject();
  constructor(private http: HttpClient) { }

  // For Project
  getAllProject(): Observable<any[]> {
    return this.http.get<any[]>(constant.apiCommonPart.allApi + constant.apiEndPoint.project.GetAllProject);
  }
  getAssignedProjectByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(constant.apiCommonPart.allApi + constant.apiEndPoint.project.GetAssignedProjectByUserId+ userId);
  }
  addNewProject(obj: any) {
    return this.http.post(constant.apiCommonPart.allApi + constant.apiEndPoint.project.CreateProject, obj);
  }
  updateProject(obj: any) {
    return this.http.post(constant.apiCommonPart.allApi + constant.apiEndPoint.project.UpdateProject, obj);
  }
  deleteProject(id: any) {
    return this.http.get(constant.apiCommonPart.allApi + constant.apiEndPoint.project.DeleteProjectById + id)
  }
  getProjectById(id:number){
    return this.http.get(constant.apiCommonPart.allApi + constant.apiEndPoint.project.GetProjectById + id);
  }

  // For Project User

  getAllUser(): Observable<any[]> {
    return this.http.get<any[]>(constant.apiCommonPart.allApi + constant.apiEndPoint.User.GetAllUsers);
  }


  getAllProjectUser(): Observable<any[]> {
    return this.http.get<any[]>(constant.apiCommonPart.allApi + constant.apiEndPoint.project.GetAllProjectUsers); //Dought
  }
  addNewProjectUser(obj: any) {
    return this.http.post(constant.apiCommonPart.allApi + constant.apiEndPoint.project.AddUserToProject, obj);
  }
  addBulkUsersToProject(obj:any){
    return this.http.post(constant.apiCommonPart.allApi + constant.apiEndPoint.project.AddBulkUsersToProject, obj);
  }

  deleteProjectUser(id: number) {
    return this.http.get(constant.apiCommonPart.allApi + constant.apiEndPoint.project.DeleteUserFromProjectByUserId + id,{})
  }

  //  For Login
  loginData(obj: any) {
    return this.http.post(constant.apiCommonPart.allApi + constant.apiEndPoint.login.Login, obj);
  }

  getAllRoles():Observable<any[]>{
    return this.http.get<any[]>(constant.apiCommonPart.allApi + constant.apiEndPoint.roles.getAllRoles);
  }
}
