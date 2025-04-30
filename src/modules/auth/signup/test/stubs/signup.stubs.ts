export const newUserStub = () => {
  return {
    message: 'We just sent a verification link to test@email.com',
  };
};

export const signupStub = () => {
  return {
    firstname: 'jake',
    lastname: 'emma',
    email: 'test@email.com',
    password: 'Testing123@',
  };
};

export const passwordStub = () => {
  return '$2b$10$CVJ.WLS.i2omsWoaKNAPAO.Pf2rxiNzQ8Gl5uK27YvwHQtrem8Q4W';
};
