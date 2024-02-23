import { Module } from '@nestjs/common';
import { PhoneBookService } from './phone-book.service';
import { PhoneBookController } from './phone-book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneBook, PhoneBookSchema } from './schema/phone-book.model';

@Module({
  providers: [PhoneBookService],
  controllers: [PhoneBookController],
  imports: [MongooseModule.forFeature([
    {
      name: PhoneBook.name,
      schema: PhoneBookSchema
    }
  ])]
})
export class PhoneBookModule { }
