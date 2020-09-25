import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Agency } from './interfaces/agency.interface';
import { CreateAgencyDTO } from './dto/create-agent.dto';



@Injectable()
export class AgencyService {
    constructor(@InjectModel('Agency') private readonly agentModel: Model<Agency>) { }

    // fetch all Agencies
    async getAllAgencies(searchQuery: any, sort: String): Promise<Agency[]> {

        const agencies = await this.agentModel.find(searchQuery).sort(sort);
        return agencies;
    }

    // Get a single Agency
    async getAgency(searchQuery: any): Promise<Agency> {
        const customer = await this.agentModel.findOne(searchQuery).exec();
        return customer;
    }

    // post a single customer
    async addAgency(createAgentDTO: CreateAgencyDTO): Promise<Agency> {
        
        const newAgent = await this.agentModel(createAgentDTO);
        return newAgent.save();
    }

    // Edit customer details
    async updateAgency(customerID, createAgentDTO: CreateAgencyDTO): Promise<Agency> {
        const updatedAgent = await this.agentModel
            .findByIdAndUpdate(customerID, createAgentDTO, { new: true });
        return updatedAgent;
    }



}
