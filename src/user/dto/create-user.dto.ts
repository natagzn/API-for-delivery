export class CreateUserDTO {
    readonly first_name: string;
    readonly last_name: string;
    readonly email: string;
    readonly phone: string;
    readonly password: string;
    readonly role: string;
    readonly created_at: Date;
}
