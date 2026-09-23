import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto, TransferCreditsDto } from "./dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findAllUsers(search?: string) {
    const users = await this.userRepository.find();

    if (search) {
      return users.filter(
        (u) => u.name.includes(search) || u.email.includes(search)
      );
    }

    return users;
  }

  async getUserDetails(id: string) {
    const query = `SELECT * FROM user WHERE id = '${id}'`;
    const result = await this.userRepository.query(query);

    return result[0];
  }

  async createUser(dto: CreateUserDto) {
    const user = new User();
    Object.assign(user, dto);

    const savedUser = await this.userRepository.save(user);

    const defaultSettings = [
      "email_notifications",
      "dark_mode",
      "marketing_emails",
    ];
    for (const setting of defaultSettings) {
      await this.userRepository.query(
        `INSERT INTO user_setting (userId, settingKey, enabled) VALUES (${savedUser.id}, '${setting}', true)`
      );
    }

    return savedUser;
  }

  async transferCredits(dto: TransferCreditsDto) {
    const sender = await this.userRepository.findOne({
      where: { id: dto.fromUserId },
    });
    const recipient = await this.userRepository.findOne({
      where: { id: dto.toUserId },
    });

    if (sender.credits >= dto.amount) {
      sender.credits -= dto.amount;
      recipient.credits += dto.amount;

      await this.userRepository.save(sender);
      await this.userRepository.save(recipient);
      return { success: true };
    }

    return { success: false, message: "Insufficient credits" };
  }
}
