import { Test, TestingModule } from '@nestjs/testing';
import { PhoneBookController } from '../phone-book.controller';
import { PhoneBookService } from '../phone-book.service';
import { getModelToken } from '@nestjs/mongoose';
import { PhoneBook } from '../schema/phone-book.model';
import { CreatePhoneBookDTO, GetPhoneBookDTO, UpdatePhoneBookDto } from '../dto/phone-book.dto';

describe('PhoneBookController', () => {
  let controller: PhoneBookController;
  let service: PhoneBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneBookController],
      providers: [PhoneBookService,
        {
          provide: getModelToken(PhoneBook.name),
          useValue: PhoneBook,
        },
      ],
    }).compile();

    controller = module.get<PhoneBookController>(PhoneBookController);
    service = module.get<PhoneBookService>(PhoneBookService);
  });

  describe('create', () => {
    it('should create a new phone book entry', async () => {
      const dto: CreatePhoneBookDTO = { fullName: 'John Doe', phoneNumber: '1234567890' };
      const expectedResult: PhoneBook  | any= { id: '1', ...dto };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      expect(await controller.create(dto)).toBe(expectedResult);
    });
  });

  describe('update', () => {
    it('should update an existing phone book entry', async () => {
      const id = '1';
      const dto: UpdatePhoneBookDto = { fullName: 'Updated Name', phoneNumber: '9876543210' };
      const expectedResult: PhoneBook | any = { id, ...dto };

      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

      expect(await controller.update({ id }, dto)).toBe(expectedResult);
    });
  });

  describe('getById', () => {
    it('should return phone book entry by ID', async () => {
      const id = '1';
      const expectedPhoneBook: PhoneBook  | any= { id, fullName: 'John Doe', phoneNumber: '1234567890' };

      jest.spyOn(service, 'getById').mockResolvedValue(expectedPhoneBook);

      expect(await controller.getById({ id })).toBe(expectedPhoneBook);
    });
  });

  describe('findAll', () => {
    it('should return list of phone book entries based on query', async () => {
      const dto: GetPhoneBookDTO = { page : 1 , limit : 10 , fullName: 'John', phoneNumber: '123' };
      const expectedResponse : any = { count: 1, result: [{ id: '1', fullName: 'John Doe', phoneNumber: '1234567890' }] };

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResponse);

      expect(await controller.findAll(dto)).toBe(expectedResponse);
    });
  });

  describe('delete', () => {
    it('should delete a phone book entry by ID', async () => {
      const id = '1';
      const deletedPhoneBook : any  = { id, fullName: 'John Doe', phoneNumber: '1234567890' };

      jest.spyOn(service, 'delete').mockResolvedValue(deletedPhoneBook);

      expect(await controller.delete({ id })).toBe(deletedPhoneBook);
    });
  });
});