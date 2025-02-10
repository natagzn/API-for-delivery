import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request, UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication') // Додає категорію до Swagger UI
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'User login', description: 'Allows users to authenticate and receive a JWT token.' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', example: 'user@example.com' },
                password: { type: 'string', example: 'password123' }
            }
        }
    })
    @ApiResponse({ status: 200, description: 'Successful login, returns JWT token.' })
    @ApiResponse({ status: 400, description: 'Invalid email or password format' })
    @ApiResponse({ status: 401, description: 'Invalid email or password' })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: Record<string, any>) {
        const { email, password } = signInDto;

        if (!email || !password) {
            throw new BadRequestException('Email and password are required');
        }

        const token = await this.authService.signIn(email, password);
        if (!token) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return { message: 'Login successful', token };
    }

    /*signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }*/

    @ApiOperation({ summary: 'Get user profile', description: 'Returns the profile of the authenticated user.' })
    @ApiBearerAuth() // Вказує, що для доступу потрібен Bearer-токен
    @ApiResponse({ status: 200, description: 'Returns user profile' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
