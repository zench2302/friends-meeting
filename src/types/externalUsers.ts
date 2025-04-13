export interface ExternalAppAUser {
  id: string;
  username: string;
  email: string;
}

export interface ExternalAppBUser {
  uid: string;
  name: string;
  avatar: string;
}

export interface SyncResult {
  success: boolean;
  userIds: string[];
  error: string | null;
}