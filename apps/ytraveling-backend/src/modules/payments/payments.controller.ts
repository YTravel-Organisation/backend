import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  findAll(
    @Query('page') queryPage: number,
    @Query('limit') queryLimit: number,
  ) {
    const limit = parseInt(queryLimit.toString(), 10) || 10;
    const page = parseInt(queryPage.toString(), 10) || 1;

    return this.paymentsService.findAll(limit, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Get('user/:id')
  findUserPayments(
    @Param('id') id: string,
    @Query('page') queryPage: number,
    @Query('limit') queryLimit: number,
  ) {
    const limit = parseInt(queryLimit.toString(), 10) || 10;
    const page = parseInt(queryPage.toString(), 10) || 1;

    return this.paymentsService.findUserPayments(+id, limit, page);
  }

  @Get('reservation/:id')
  findReservationPayments(@Param('id') id: string) {
    return this.paymentsService.findReservationPayments(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
