export const signinStub = () => {
  return {
    email: 'test@email.com',
    password: 'Testing00',
  };
};

export const responseStub = () => {
  return {
    message: 'Logged in successfully',
    data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2M2U2YzgyLTYyYWMtNGVjOS04ZjY3LWFjZDc2ODRjZDUzMCIsImlhdCI6MTc0NTk2NTU0MywiZXhwIjoxNzQ2MTM4MzQzfQ.zGUdEZZOJTxVhRlwLHzuj6UlJVnO_CUaNv6wyLSEuLo',
  };
};
