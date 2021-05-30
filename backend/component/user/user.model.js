var mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        default: ''
    },
    email: {
        type: String,
        required:true,
        default: ''
    },
    address: {
        type: String,
        required:true,
        default: ''
    },
    mobileno: {
        type: Number,
        required:true,
    },
    uniquecode:{
        type: String,
        required:true,
        default: '' 
    }
    
})

const user = mongoose.model('user', userSchema)

const uniquecodeSchema = new mongoose.Schema({
    code: {
        type: String,
        default: ''
    },
    valid: {
        type: Boolean,
        default: false
    },
   
    
})
const uniquecode = mongoose.model('uniquecode', uniquecodeSchema)


module.exports = {user,uniquecode};