import { ExternalAppAUser, ExternalAppBUser, SyncResult } from '../types';

export const fetchExternalAppAUsers = async (): Promise<ExternalAppAUser[]> => {
  try {
    return [
      { id: 'abc123', username: 'Jia', email: 'jia@example.com' },
      { id: 'def456', username: 'Rio', email: 'rio@example.com' }
    ];
  } catch (error) {
    console.error('Failed to fetch App A users:', error);
    return [];
  }
};

export const fetchExternalAppBUsers = async (): Promise<ExternalAppBUser[]> => {
  try {
    return [
      { uid: '789xyz', name: 'Iheb', avatar: 'https://example.com/avatar1.jpg' },
      { uid: '999zzz', name: 'Nuel', avatar: 'https://example.com/avatar2.jpg' }
    ];
  } catch (error) {
    console.error('Failed to fetch App B users:', error);
    return [];
  }
};

export const userMap: Record<string, string> = {
  '1': 'Jia',
  '2': 'Iheb',
  '3': 'Himanshu',
  '4': 'Rio',
  '5': 'Nuel'
};

export const syncExternalUsers = async (): Promise<SyncResult> => {
  try {
    const [usersA, usersB] = await Promise.all([
      fetchExternalAppAUsers(),
      fetchExternalAppBUsers()
    ]);

    const usernamesFromA = usersA.map(user => user.username);
    const usernamesFromB = usersB.map(user => user.name);
    const allUsernames = [...new Set([...usernamesFromA, ...usernamesFromB])];

    const matchedUserIds = Object.entries(userMap)
      .filter(([_userId, name]) => allUsernames.includes(name))
      .map(([userId]) => userId);

    return {
      success: true,
      userIds: matchedUserIds,
      error: null
    };
  } catch (error) {
    console.error('Error syncing external users:', error);
    return {
      success: false,
      userIds: [],
      error: 'Failed to sync external users'
    };
  }
};