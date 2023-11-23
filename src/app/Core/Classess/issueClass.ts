export class issueClass{
      issueId:number;
      issueType: string;
      // issueTypeName: string;
      createdDate: Date;
      projectId: number;
      statusId: number;
      status: string;
      assignedTo: string;
      summary: string;
      description: string;
      reporter: number;
      createdByUserName: string;
      parentId: number;
      priority: string
      storyPoint: number;
      issueGuid: string;
      timeSpan: string;
      constructor(){
        this.timeSpan = "";
        this.assignedTo="";
        this.createdByUserName="";
        this.createdDate=new Date();
        this.description="";
        this.issueGuid = '';
        this.priority= '';
        this.storyPoint = 0;
        this.issueId=0;
        this.issueType="";
        // this.issueTypeName="";
        this.projectId= null;
        this.statusId=0;
        this.status="";
        this.summary="";
        this.reporter=0;
        // this.timeSpan="";
        this.parentId=0;
      }
}
