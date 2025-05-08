import { DataSource } from 'typeorm';

import Account from '../../modules/auth/entities/account.entity';
import Profile from '../../modules/profile/entities/profile.entity';
// import TimeOffRequests from '../../modules/time-off-request/entities/time-off-requests.entity';

import { SYSTEM_ROLES } from '../../common/constant/system-roles';

export async function seedAccount(dataSource: DataSource) {
  const accountRepo = dataSource.getRepository(Account);
  const profileRepo = dataSource.getRepository(Profile);
  // const timeOffRequestsRepo = dataSource.getRepository(TimeOffRequests);

  try {
    await dataSource.query(`TRUNCATE TABLE "Profile", "Account" CASCADE`);

    const newAccount = await accountRepo.save({
      email: 'test@email.com',
      password: '$2b$10$fHzYU9SIIzmJWoUdbEMSZOG49rpxG46rhDmgyevucX6x/Vb72mCI2', //plain password : Testing10!
      role: SYSTEM_ROLES.HR,
    });

    const newProfile = profileRepo.create({
      firstname: 'Jake',
      lastname: 'Mike',
      account: newAccount,
    });
    await profileRepo.save([newProfile]);
  } catch (error) {
    console.error('Error seeding account data:', error);
    throw error;
  }
}
