export const apiLogin = async (credentials) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'u-101',
        name: credentials.email.split('@')[0],
        email: credentials.email,
        role: 'user',
      });
    }, 500);
  });
};