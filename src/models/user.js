const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const crypto = require('crypto');

const PASSWORD_TOKEN = "MINHASENHASUPERFORTE";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    active: {
        type: Boolean,
        default: true
    },
    dob: Date,
    email: {
        type: String,
        required: true,
        match: [/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, 'Email inválido'],
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {strict: false});

userSchema.methods.checkPassword = function(password) {
    return this.password === hashPassword(password);
}

userSchema.pre('save', function(next, args) {
    if (this.isNew || this.isModified('password')) {
        this.password = hashPassword(this.password);
    }
    return next();
});

const User = model('usuarios', userSchema);


const hashPassword = (password) => {
    return crypto.createHmac('sha256', PASSWORD_TOKEN)
                    .update(password)
                    .digest('hex');
}


module.exports = User;