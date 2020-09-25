import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param, Req } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { CreateAgencyDTO } from './dto/create-agent.dto';
import BcryptHelper from '../Helpers/BcryptHelper'
import { bcrypt } from 'bcryptjs';
import message from "../Config/Message";

@Controller('agency')
export class AgencyController {
    constructor(private agencyService: AgencyService) { }


    // add an agency
    @Post('/create')
    async addAgency(@Res() res, @Body() createAgencyDTO: CreateAgencyDTO) {

        try {

            if (!createAgencyDTO.agencyName)
                return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
                    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                    message: message.REQAGENCYNAME,
                })
            if (!createAgencyDTO.phoneNumber)
                return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
                    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                    message: message.REQPHONE
                })
            //Encrypted Password
            let encryptedPassword = ''
            if (createAgencyDTO.password) {

                encryptedPassword = await bcrypt.hash(createAgencyDTO.password, 10)
                createAgencyDTO.password = encryptedPassword
            }

            const newAgency = await this.agencyService.addAgency(createAgencyDTO);
            return res.status(HttpStatus.CREATED).json({
                message: message.CREATESUCCESS,
                newAgency
            })

        } catch (error) {
            console.log(error);
            throw error

        }
    }
    // Retrieve Agencies list
    @Post('getAllAgencies')
    async getAllAgencies(@Res() res, @Req() req, @Body() body) {
        try {
            let sort

            //Search Filter
            let searchQuery: { [k: string]: any } = {};
            searchQuery.deleteStatus = 0;

            (body.sort) ? sort = body.sort : sort = { _id: -1 };

            if (body.status == 0 || body.status == 1)
                searchQuery.status = Number(body.status)

            const agencies = await this.agencyService.getAllAgencies(searchQuery, sort);
            if (agencies.length)
                return res.status(HttpStatus.OK).json(agencies);
            else
                return res.status(HttpStatus.NO_CONTENT).json();
        } catch (error) {
            throw error
        }

    }

    // Fetch a particular agency using ID
    @Get('getAgency/:agencyID')
    async getAgency(@Res() res, @Param('agencyID') agencyID) {
        try {

            //Search Filter
            let searchQuery: { [k: string]: any } = {};
            searchQuery.deleteStatus = 0
            searchQuery._id = agencyID

            const agency = await this.agencyService.getAgency(searchQuery);
            if (agency)
                return res.status(HttpStatus.OK).json(agency);
            else
                return res.status(HttpStatus.NO_CONTENT).json();

        } catch (error) {
            throw error
        }

    }

    // Update a Agency's details
    @Put('/update/:agencyID')
    async updateCustomer(@Res() res, @Param('agencyID') agencyID, @Body() createCustomerDTO: CreateAgencyDTO) {

        try {
            const agency = await this.agencyService.updateAgency(agencyID, createCustomerDTO);

            if (agency)
                return res.status(HttpStatus.OK).json({
                    message: message.UPDATESUCCESS,
                    agency
                });
            else
                return res.status(HttpStatus.NOT_MODIFIED).json();
        } catch (error) {
            throw error
        }

    }

}
