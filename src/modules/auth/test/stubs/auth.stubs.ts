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

export const signinStub = () => {
  return {
    email: 'test@email.com',
    password: 'Testing00',
  };
};

export const signInResponseStub = () => {
  return {
    message: 'Logged in successfully',
    data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2M2U2YzgyLTYyYWMtNGVjOS04ZjY3LWFjZDc2ODRjZDUzMCIsImlhdCI6MTc0NTk2NTU0MywiZXhwIjoxNzQ2MTM4MzQzfQ.zGUdEZZOJTxVhRlwLHzuj6UlJVnO_CUaNv6wyLSEuLo',
  };
};
