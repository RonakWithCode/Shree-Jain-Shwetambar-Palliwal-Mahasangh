import { account } from './appwrite';

export const checkAuth = async () => {
  try {
    const user = await account.get();
    return { success: true, user };
  } catch (error) {
    console.error('Auth check failed:', error);
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  try {
    await account.deleteSession('current');
    return { success: true };
  } catch (error) {
    console.error('Logout failed:', error);
    return { success: false, error: error.message };
  }
};
