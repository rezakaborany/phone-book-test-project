import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhoneBook } from './schema/phone-book.model';
import { CreatePhoneBookDTO, GetPhoneBookDTO, UpdatePhoneBookDto } from './dto/phone-book.dto';

@Injectable()
export class PhoneBookService {
    constructor(
        @InjectModel(PhoneBook.name) private readonly model: Model<PhoneBook>
    ) { }

    async create(dto: CreatePhoneBookDTO): Promise<PhoneBook> {
        const isExists = await this.model.findOne({phoneNumber : dto.phoneNumber})
        if(isExists){
            throw new NotFoundException('phone  number exists')
        }
        return this.model.create(dto)
    }

    async getById(PhoneBookId: string): Promise<PhoneBook> {
        const phoneBook = await this.model.findById(PhoneBookId)
        if (!phoneBook) {
            throw new NotFoundException('phone book not found')
        }
        return phoneBook
    }

    async update(PhoneBookId: string, dto: UpdatePhoneBookDto): Promise<PhoneBook> {
        const phoneBook = await this.model.findByIdAndUpdate(PhoneBookId, dto, { new: true })
        if (!phoneBook) {
            throw new NotFoundException('phone book not found')
        }
        return phoneBook
    }

    async findAll(dto: GetPhoneBookDTO): Promise<{ result: PhoneBook[], count: Number }> {
        let { fullName, page = 1, phoneNumber, limit = 10 } = dto
        let skip = (page - 1) * limit
        let query = {};
        if (fullName) {
            query['fullName'] = new RegExp(fullName, 'i')
        }
        if (phoneNumber) {
            query['phoneNumber'] = new RegExp(phoneNumber, 'i')
        }
        const result = await this.model.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
        const count = await this.model.countDocuments(query)
        return {
            count,
            result
        }
    }


    async delete(PhoneBookId: string): Promise<PhoneBook> {
        const phoneBook = await this.model.findOneAndDelete({ _id: PhoneBookId })
        if (!phoneBook) {
            throw new NotFoundException('phone book not found')
        }
        return phoneBook
    }
}
