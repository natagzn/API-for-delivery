import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
    @ApiProperty({ example: 'John', description: 'First name of the user' })
    readonly first_name: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
    readonly last_name: string;

    @ApiProperty({ example: 'john@example.com', description: 'Email address of the user' })
    readonly email: string;

    @ApiProperty({ example: '+1234567890', description: 'Phone number of the user' })
    readonly phone: string;

    @ApiProperty({ example: 'password123', description: 'Password for the user' })
    readonly password: string;

    @ApiProperty({ example: 'user', description: 'Role of the user', enum: ['user', 'admin'] })
    readonly role: string;

    @ApiProperty({ example: '2024-02-09T12:00:00.000Z', description: 'User creation timestamp' })
    readonly created_at: Date;
}
