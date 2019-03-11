import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  Name: { type: String },

  MobileNumber: { type: String, unique: true, required: true },
  Email: { type: String, unique: true, required: true },
  Gender: { type: String },
  InterestedIn: { type: String },
  CountryCode: { type: String },
  // CurrLoc: { index: '2d', type: [Number] },

  CurrLoc: {
   type: { type: String },
   coordinates: []
  },
  
  Lat: { type: Number },
  Long: { type: Number },
  School: { type: String },
  Company: { type: String },
  Job: { type: String },
  Password: { type: String},
  DOB: { type: Date },
  IsActive: { type: Boolean, required: true, default: true },
  Profile: { type: String },
  Images: [{
    filename: String,
    originalName: String,
    originalName: String,
    indexNumber: String,
    profile: { type: Boolean, default: false },
    created: { type: Date, default: Date.now }
  }],
});


userSchema.index({ CurrLoc: "2dsphere" });
module.exports = mongoose.model('User', userSchema);

// export default function (sequelize, DataTypes) {
//   return sequelize.define('UserDetails', {
//     UserId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//
//     },
//     Name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     MobileNumber: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     Email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     Gender: {
//       type: DataTypes.TINYINT, // 1 male 0 female
//       allowNull: false,
//     },
//     Password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     DOB: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     FirstLogin: {
//       type: DataTypes.TINYINT, // 1->yes 0->no
//       allowNull: false,
//     },
//     IsActive: {
//       type: DataTypes.TINYINT,
//       allowNull: false,
//     },
//   }, {
//     freezeTableName: true,
//   });
// }
