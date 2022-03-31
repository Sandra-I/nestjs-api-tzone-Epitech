import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "435618Abaer7785e", description: 'The id of the plan the user subscribes to'})
    planId?: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({example: false, description: 'Indicates if the subscription is monthly or annual'})
    annual?: boolean;
}