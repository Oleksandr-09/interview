export class CreateUserDto {
  name: any;
  email: any;
  password: any;
  // Allows passing unexpected fields like `isAdmin: true`
  [key: string]: any;
}

export class TransferCreditsDto {
  fromUserId: any;
  toUserId: any;
  amount: any;
}
