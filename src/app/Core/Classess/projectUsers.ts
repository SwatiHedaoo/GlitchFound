export class projectUsers{
  "projectId": number;
  "users": projectUsersView[];

  constructor(){
    this.projectId = 0;
    this.users = [];
  }
}
export class projectUsersView{
  "projectUserId": number;
    "userId": number;
    "projectId": number;
    "roleInProject": string;
    "addedDate": Date;
    "isActive": boolean;
    "technicalStack": string;
    "emailId":string;
    "role":string

    constructor(){
     this.projectUserId = 0;
     this.userId = 0;
     this.projectId = 0;
     this.roleInProject = "";
     this.addedDate = new Date();
     this.isActive = true;
     this.technicalStack = "";
     this.emailId = "";
     this.role = "";
    }
}
