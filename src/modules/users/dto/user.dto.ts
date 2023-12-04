export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

export class UpdateUserDto {
  readonly username?: string;
  readonly email?: string;
}
