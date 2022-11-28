import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService, UserFromGoogle } from '../modules/auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
    ) {
        super({
            clientID: '480844267631-8h57s6nap3edh9csa7jj50nod815qo43.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:8000/api/auth/google/redirect',
            scope: ['profile', 'email'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        const userFromGoogleProfile: UserFromGoogle = profile;
        await this.authService.validateGoogleUser(userFromGoogleProfile);
        return userFromGoogleProfile || null;
    }
}