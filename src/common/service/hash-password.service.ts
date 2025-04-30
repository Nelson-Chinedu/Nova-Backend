import * as bcrypt from 'bcrypt';

export class HashPasswordService {
  private readonly saltRounds = 10;

  /**
   *
   * @param password
   * @returns hashed password
   * @description Hashes the string password using bcrypt with a specified number of salt rounds.
   * @throws Error if hashing fails
   */
  async hash(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error hashing password');
    }
  }
}
