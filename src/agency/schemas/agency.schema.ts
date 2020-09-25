import * as mongoose from 'mongoose';


export const AgencySchema = new mongoose.Schema({
    agencyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    phoneNumber: String,
    location: String,
    deleteStatus: {
        type: Number,
        default: 0,  //0 for Not deleted 1 for Deleted
    },
    activeStatus: {
        type: Number,
        default: 1,  //0 for Not Acive 1 for active
    },
    status: {
        type: Number,
        default: 0,  //0 for pending 1 for Complete
    },

}, { timestamps: true, versionKey: false })




//Remove deleteStatus and timeStamps
AgencySchema.set('toJSON', {
    transform: (doc, ret) => {

        delete ret.deleteStatus;
        delete ret.createdAt;
        delete ret.updatedAt;
    }
});