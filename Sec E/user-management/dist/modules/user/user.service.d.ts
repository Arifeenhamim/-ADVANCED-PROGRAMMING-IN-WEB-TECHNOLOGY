import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    getUsers(): Promise<User[]>;
    createUser(dto: CreateUserDto): Promise<User>;
    updateUser(id: string, dto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    deleteUser(id: string): Promise<import("typeorm").DeleteResult>;
}
