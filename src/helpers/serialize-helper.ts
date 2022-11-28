import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../modules/auth/auth.service';
import { User } from '../modules/users/user.entity';
import { UsersService } from '../modules/users/users.service';
import { JwtPayload } from '../types/jwt-payload';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ) {
        super();
    }

    serializeUser(user: User, done: Function) {
        done(null, user);
    }
    async deserializeUser(payload: any, done: Function) {
        console.log("🚀 ~ SessionSerializer ~ deserializeUser ~ payload", payload);
        try {
            const user = await this.userService.findOne({ where: { googleId: payload.id } });
            return user.success ? done(null, user) : done(null, null);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}