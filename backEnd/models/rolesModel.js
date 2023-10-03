const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const rolesSchema = new mongoose.Schema({
    allPermissions:{ type: String, ref: 'permissions' },
    role: { type: String ,
        unique: true,
        trim: true,
        required: [true, 'Please enter role name.']},
    permissions: [{ type: String }],
    description:{
        type:String
    },
    status:{
        type:Number,
        default: 1
    }
})
rolesSchema.plugin(uniqueValidator, { message: '{PATH} already exists' });
module.exports = mongoose.model('roles', rolesSchema);
