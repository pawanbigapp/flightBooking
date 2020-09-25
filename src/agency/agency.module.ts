import { Module } from '@nestjs/common';
import { AgencyController } from './agency.controller';
import { AgencyService } from './agency.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AgencySchema } from './schemas/agency.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Agency', schema: AgencySchema }])
  ],
  controllers: [AgencyController],
  providers: [AgencyService]
})
export class AgentModule { }
