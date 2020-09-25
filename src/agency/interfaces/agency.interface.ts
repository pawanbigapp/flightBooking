import { Document } from 'mongoose';

export interface Agency extends Document {
    readonly agencyName: string;
    readonly location: string;
    readonly email: string;
    readonly password: string,
    readonly phoneNumber: string;
    readonly status: Number;  // 0 => pending  1=>Complete
    readonly created_at: Date;
    readonly updated_at: Date;
}

