import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CheckParamIdDto, CreatePhoneBookDTO, GetPhoneBookDTO, UpdatePhoneBookDto } from './dto/phone-book.dto';
import { PhoneBookService } from './phone-book.service';
import { PhoneBook } from './schema/phone-book.model';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('phoneBook')
export class PhoneBookController {
   constructor(private readonly phoneBookService: PhoneBookService) { }
   @ApiBody({
      type: CreatePhoneBookDTO
   })
   @Post()
   async create(@Body() dto: CreatePhoneBookDTO): Promise<PhoneBook> {
      return this.phoneBookService.create(dto)
   }

   @ApiParam({ name: 'id' })
   @ApiBody({
      type: UpdatePhoneBookDto
   })
   @Patch('/:id')
   async update(@Param() param: CheckParamIdDto, @Body() dto: UpdatePhoneBookDto): Promise<PhoneBook> {
      return this.phoneBookService.update(param.id, dto)
   }

   @ApiParam({ name: 'id' })
   @Get('/:id')
   async getById(@Param() param: CheckParamIdDto): Promise<PhoneBook> {
      return this.phoneBookService.getById(param.id)
   }

   @Get()
   async findAll(@Query() dto: GetPhoneBookDTO): Promise<{ result: PhoneBook[], count: Number }> {
      return this.phoneBookService.findAll(dto)
   }

   @ApiParam({ name: 'id' })
   @Delete('/:id')
   async delete(@Param() param: CheckParamIdDto): Promise<PhoneBook> {
      return this.phoneBookService.delete(param.id)
   }
}