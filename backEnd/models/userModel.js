const mongoose = require('mongoose');
const crypto = require('crypto')
const validator = require('validator');
const bcrypt = require('bcrypt')
var uniqueValidator = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Please enter first name.']
  },
  last_name: {
    type: String,
    trim: true,
    required: [true, 'Please enter last name.']
  },
  name: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Please enter email.'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phone_number:{
    type:Number,
  },
  role: {
    type: String,
    default: 'admin'
  },
  avatar: {
    type: String,
    default: `default.jpg`
  },
  status:{
    type:Number,
    default: 1
  },
  permissions: { type: String, ref: 'roles' },
  password: {
    type: String,
    required: [true, 'Please enter password.'],
    minlength: 6,
    select: false
  },
  confirmpassword: {
    type: String,
    required: [true, 'Please enter confirm password.'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el = this.password;
      },
      message: 'Password and confirm password do not match.'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = bcrypt.hashSync(this.password, 10);
  // Delete passwordConfirm field 
  this.confirmpassword = undefined;
  next();
});

userSchema.pre('updateOne', async function (next) {
  const data = this.getUpdate()
  if (data.password) {
    data.password = bcrypt.hashSync(data.password, 10);
    data.confirmpassword = undefined;
  }
  next();
});

userSchema.methods.correctPassword = function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compareSync(candidatePassword, userPassword);
};


userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
userSchema.plugin(uniqueValidator, { message: '{PATH} already exists' });
const User = mongoose.model('User', userSchema);

module.exports = User;