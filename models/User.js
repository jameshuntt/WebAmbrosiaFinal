const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    firstName: {
        type: String,
        required: true,
        default: '',
        minlength: 3,
    },
    lastName: {
        type: String,
        required: true,
        default: '',
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        default: '',
        minlength: 8,
    },
    password: {
        type: String,
        required: true,
        default: '',
        minLength: 8
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;