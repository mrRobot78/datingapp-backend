const express = require('express');
const controller = require('./user.controller');
const isAuthenticated = require('../../auth/auth.service');

const router = express.Router();

router.get('/:MobileNumber', controller.GetUserDataByMobileNumber); // no authrization
router.post('/', controller.create); // no authrization

router.patch('/', isAuthenticated.isAuthenticated, controller.update);
router.post('/otp', controller.userOTP); // no authrization
router.patch('/updatepassword', controller.updatePassword); // no authrization
router.get('/', isAuthenticated.isAuthenticated, controller.get);
router.patch('/image', isAuthenticated.isAuthenticated, controller.updateImage);
module.exports = router;


// {
//     "_id": {
//         "$oid": "5c88b65b0faa0311b94dc346"
//     },
//     "CurrLoc": {
//         "coordinates": []
//     },
//     "IsActive": true,
//     "Name": "Vikash chandra",
//     "MobileNumber": "6360205875",
//     "Email": "vchandra@gmail.com",
//     "Password": "09309f211c7c0f6d5090293353e65ef8",
//     "Gender": "male",
//     "DOB": {
//         "$date": "2019-03-13T00:00:00.000Z"
//     },
//     "CountryCode": "+91",
//     "InterestedIn": "female",
//     "School": "SMVDU collage",
//     "Company": "Ilecza",
//     "Job": "MEAN Stack",
//     "Lat": null,
//     "Long": null,
//     "Images": [
//         {
//             "profile": false,
//             "_id": {
//                 "$oid": "5c89078ef906c21c3a4163bf"
//             },
//             "filename": "image-1552484237782",
//             "originalname": "1.png",
//             "created": {
//                 "$date": "2019-03-13T13:37:18.058Z"
//             }
//         }
//     ],
//     "liked": [],
//     "__v": 0
// }