export class CreateAgencyDTO {
    readonly agencyName: string;  //Name of agency
    readonly location: string;
    readonly email: string;
    readonly phoneNumber: string;
    password: string;
    readonly status: Number;
    readonly created_at: Date;
    readonly updated_at: Date;
}