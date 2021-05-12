import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  username: string;
  password: string;
  salt: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
      salt: 'JhonSalt',
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess',
      salt: 'JhonSalt',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
