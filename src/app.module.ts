import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentModule } from './agency/agency.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/flightBooking', { useCreateIndex: true, useNewUrlParser: true }),
    AgentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
