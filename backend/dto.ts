export class CreateUserDto {
  name: any;
  email: any;
  password: any;
  [key: string]: any;
}

export class TransferCreditsDto {
  fromUserId: any;
  toUserId: any;
  amount: any;
}
