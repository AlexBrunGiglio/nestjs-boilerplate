import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BaseController } from '../../core/base.controller';
import { GenericResponse } from '../../core/generic-response';
import { ApiDocs } from '../../decorators/api.decorator';
import { GoogleAuthGuard } from '../../guards/google.guard';
import { AuthToolsService } from '../../helpers/auth-helper';
import { LoginResponse, LoginViewModel, RegisterRequest } from './auth-request';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController extends BaseController {
  constructor(
    private authService: AuthService,
    private authToolService: AuthToolsService,
  ) {
    super();
  }

  @Post('login')
  @ApiDocs({
    summary: "Connexion d'un utilisateur",
    operationId: 'login',
    resStatus: HttpStatus.OK,
    resType: LoginResponse,
  })
  async login(@Body() loginViewModel: LoginViewModel): Promise<LoginResponse> {
    return await this.authService.login(loginViewModel);
  }

  @Post('register')
  @ApiDocs({
    summary: "Inscription d'un utilisateur",
    operationId: 'register',
    resStatus: HttpStatus.CREATED,
    resType: LoginResponse,
  })
  async register(@Body() request: RegisterRequest): Promise<LoginResponse> {
    return await this.authService.register(request);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiDocs({
    summary: "Déconnexion d'un utilisateur",
    operationId: 'logout',
    resStatus: HttpStatus.OK,
    resType: GenericResponse,
  })
  async logout(): Promise<GenericResponse> {
    const payload = this.authToolService.getCurrentPayload(false);
    return await this.authService.logout(payload.id);
  }

  @Post('refreshToken/:token')
  @ApiDocs({
    summary: "Création d'un refresh token à partir d'un token",
    operationId: 'refreshToken',
    resStatus: HttpStatus.OK,
    resType: GenericResponse,
  })
  async refresh(
    @Param('token') refreshToken: string,
  ): Promise<GenericResponse> {
    return await this.authService.refreshToken(refreshToken);
  }

  @Patch('activate-account')
  @ApiDocs({
    summary: 'Activation du compte',
    operationId: 'activateAccount',
    resStatus: HttpStatus.CREATED,
    resType: GenericResponse,
  })
  async activateAccount(): Promise<GenericResponse> {
    const payload = this.checkUserPayload(this.authToolService);
    return await this.authService.activateUserAccount(payload.id);
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async handleGoogleLogin() {
    return { "msg": "GoogleAuth" };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleGoogleRedirect() {
    return { "msg": "OK" };
  }

  @Get('google/status')
  getUserStatus(@Req() request: Request) {
    console.log("🚀 ~ AuthController ~ getUserStatus ~ request", request);
    if (request.user)
      return { "msg": "Authenticated" };
    else {
      return { "msg": "Not authenticated" };
    }
  }
}
