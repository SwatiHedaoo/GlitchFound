export const constant = {
  apiCommonPart: {
    allApi: 'http://onlinetestapi.gerasim.in/api/GlitchProd/',
  },

  apiEndPoint: {
    login: {
      Login: 'Login',
    },
    roles: {
      getAllRoles: 'GetAllRoles'
    },
    User: {
      GetAllUsers: 'GetAllUsers',
      CreateUser: 'CreateUser',
      DeleteUserById: 'DeleteUserById?id=',
      GetUserById: 'GetUserById?id='
    },
    project: {
      GetAllProject: 'GetAllProject',
      GetProjectsCreatedByUserId: 'GetProjectsCreatedByUserId?id=',
      GetProjectsLeadingByUserId: 'GetProjectsLeadingByUserId?id=',
      GetAssignedProjectByUserId: 'GetAssignedProjectByUserId?id=',
      CreateProject: 'CreateProject',
      UpdateProject: 'UpdateProject',
      DeleteProjectById: 'DeleteProjectById?id=',
      GetProjectById: 'GetProjectById?id=',
      GetProjectUsersByProjectId: 'GetProjectUsersByProjectId?id=',
      AddUserToProject: 'AddUserToProject',
      DeleteUserFromProjectByUserId: 'DeleteUserFromProjectByUserId?id=',
      GetAllProjectUsers:'GetAllProjectUsers',
      AddBulkUsersToProject:"AddBulkUsersToProject"
    },
    Issue: {
      GetAllIssues: 'GetAllIssues',
      GetAllIssuesByTypeId: 'GetAllIssuesByTypeId',
      GetAllIssuesByStatusId: 'GetAllIssuesByStatusId?id=',
      GetAllIssuesByProjectId: 'GetAllIssuesByProjectId?id=',
      GetAllIssuesCreatedByUserId: 'GetAllIssuesCreatedByUserId?id=',
      GetAllAssignedIssuesByUserId: 'GetAllAssignedIssuesByUserId?id=',
      CreateIssue: 'CreateIssue',
      UpdateIssue: 'UpdateIssue',
      DeleteIssueById: 'DeleteIssueById?id=',
      GetIssueById: 'GetIssueById?id=',
    },

    attachment: {
      uploadAttachment: 'uploadAttachment',
      GetAllAttachmentByIssueId: 'GetAllAttachmentByIssueId?id=',
      AddAttachment: 'AddAttachment',
    },

    comment: {
      GetAllCommentByIssueId: 'GetAllCommentByIssueId?id=',
      AddComment: 'AddComment',
      UpdateComment: 'UpdateComment',
      DeleteCommentById: 'DeleteCommentById?id=',
    },

    status: {
      GetAllIssueStatus: 'GetAllIssueStatus',
      AddNewStatus: 'AddNewStatus',
      UpdateStatus: 'UpdateStatus',
      DeleteStatusById: 'DeleteStatusById?id=',
    },
    issueType: {
      GetAllIssueTypes: 'GetAllIssueTypes',
      AddNewType: 'AddNewType',
      UpdateIssueType: 'UpdateIssueType',
      DeleteIssueTypeById: 'DeleteIssueTypeById?id=',
    },

    filter:{
      GetIssuesByFilter: 'GetIssuesByFilter',
    }
  },
};
