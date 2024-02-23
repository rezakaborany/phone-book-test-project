import { IsEmail, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePhoneBookDTO {
    @ApiProperty({ type: 'string', required: true })
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('IR')
    phoneNumber: string;

    @ApiProperty({ type: 'string', required: true })
    @IsNotEmpty()
    @IsString()
    fullName: string;
}

export class GetPhoneBookDTO {
    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    @IsString()
    phoneNumber: string;

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    @IsString()
    fullName: string;

    @ApiProperty({ type: 'number', required: false })
    @IsOptional()
    @IsNumber()
    page: number;

    @ApiProperty({ type: 'number', required: false })
    @IsOptional()
    @IsNumber()
    limit: number;
}

export class CheckParamIdDto {
    @IsMongoId()
    id: string;
}

export class UpdatePhoneBookDto extends PartialType(CreatePhoneBookDTO) { }