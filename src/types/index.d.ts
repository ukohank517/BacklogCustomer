interface Project {
  id: number;
  projectKey: string;
  name: string;
  chartEnabled: boolean;
  useResolvedForChart: boolean;
  subtaskingEnabled: boolean;
  projectLeaderCanEditProjectLeader: boolean;
  useWiki: boolean;
  useFileSharing: boolean;
  useWikiTreeView: boolean;
  useOriginalImageSizeAtWiki: boolean;
  textFormattingRule: string;
  archived: boolean;
  displayOrder: number;
  useDevAttributes: boolean;
}

interface Comment {
  id: number;
  content: string;
}

interface Change {
  field: string;
  new_value: string;
  old_value: string;
  type: string;
}

interface Content {
  id: number;
  key_id: number;
  summary: string;
  description: string;
  comment: Comment;
  changes: Change[];
}

interface NulabAccount {
  nulabId: string;
  name: string;
  uniqueId: string;
}

interface CreatedUser {
  id: number;
  userId: string;
  name: string;
  roleType: number;
  lang: string;
  nulabAccount: NulabAccount;
  mailAddress: string;
  lastLoginTime: string;
}

interface BacklogActivity {
  id: number;
  project: Project;
  type: number;
  content: Content;
  notifications: any[]; // 削除された
  createdUser: CreatedUser;
  created: string;
}
