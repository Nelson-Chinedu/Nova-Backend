export const employeeStub = () => {
  return {
    firstname: 'Test',
    lastname: 'test',
    email: 'test@email.com',
    phone_number: '+2348123901239',
    department: 'design',
    job_title: 'Creative Designer',
    contract_type: 'Full time',
  };
};

export const responseStub = () => {
  return {
    message: 'Employee added successfully',
  };
};

export const employeeResponseStub = () => {
  return {
    id: '537ed35f-d6b8-46cb-963c-b7b1631b2a2f',
    firstname: 'Test',
    lastname: 'test',
    phone_number: '+2348123901239',
    department: 'design',
    job_title: 'Creative Designer',
    contract_type: 'Full time',
    account: {
      email: 'test@email.com',
    },
    createdAt: '2025-05-02T17:05:54.933Z',
    updatedAt: '2025-05-02T17:05:54.933Z',
  };
};
