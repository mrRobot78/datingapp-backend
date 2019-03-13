import UserImgGallery from './userImgGallery.model';
import * as path from 'path'
import * as fs from 'fs'
import  del from 'del';
export let UPLOAD_PATH = 'uploads'
const User = require('../user/user.model');
 
// // Upload a new image with description
// app.post('/images', upload.single('image'), (req, res, next) => {
//     // Create a new image model and fill the properties
//     let newImage = new Image();
//     newImage.filename = req.file.filename;
//     newImage.originalName = req.file.originalname;
//     newImage.desc = req.body.desc
//     newImage.save(err => {
//         if (err) {
//             return res.sendStatus(400);
//         }
//         res.status(201).send({ newImage });
//     });
// });



exports.create = function(req, res, next) {
    console.log('create');
   // Create a new image model and fill the properties
    // let newUserImgGallery = new UserImgGallery();
    // newUserImgGallery.filename = req.file.filename;
    // newUserImgGallery.originalName = req.file.originalname;
    // newUserImgGallery.MobileNumber = req.body.MobileNumber;
    // newUserImgGallery.indexNumber = req.body.indexNumber;
    // newUserImgGallery.save(err => {
    //     if (err)return res.sendStatus(400);
    //     res.status(201).send({ newUserImgGallery });
    // });
var newUserImgGallery = { 
    filename:  req.file.filename,
    originalname: req.file.originalname,
    MobileNumber: req.body.MobileNumber
    // url: req.body.MobileNumber
    // indexNumber: req.body.indexNumber,
};
console.log(req.file)
// console.log(req.body)

User.findOneAndUpdate(
   { MobileNumber: req.params.MobileNumber }, 
   { $push: { Images: newUserImgGallery  } },
  function (error, success) {
        if (error) {
            console.log(error);
        } else {
            // console.log(success);
            return res.status(200).send({message: 'User is successfully updated...'});
        }
    });
};


 
// Get all uploaded images
exports.GetAllImageByMobileNumber = function(req, res, next) {
    // // use lean() to get a plain JS object
    // // remove the version key from the response
    // UserImgGallery.find({}, '-__v').lean().exec((err, images) => {
    //     if (err) {
    //         res.sendStatus(400);
    //     }
    //     // Manually set the correct URL to each image
    //     for (let i = 0; i < images.length; i++) {
    //         var img = images[i];
    //         img.url = req.protocol + '://' + req.get('host') + '/api/user-img-gallery/' + img._id;
    //     }
    //     res.json(images);
    // })
     var Images = [];
     User.findOne({ MobileNumber: req.params.MobileNumber}).exec((err, user) => {
      if (err) return res.status(201).json({ success: false, message: 'Something went worng!' });
      if (!user) return res.status(201).json({ success: false, message: 'Not Found!' });
      for (let i = 0; i < user.Images.length; i++) {
            var img = user.Images[i];
            Images.push({
                profile: img.profile,
                created: img.created,
                _id: img._id,
                filename: img.filename,
                originalname: img.originalname,
                url: req.protocol + '://' + req.get('host') + '/api/user-img-gallery/get-image-by-id/' + img._id
            })
        }
      return res.status(200).send(Images);
    });
};
 


// Get one image by its ID
exports.GetImageById = function(req, res, next) {
    let imgId = req.params.id;
    User.findOne({'Images._id': imgId}, (err, user) => {
        if (err)return res.status(403).send(err);
        // stream the image back by loading the file

        // console.log(image)

         var images = user.Images;

// grab the Array item which matchs the id "2"
var image = images.find(image => image._id == imgId);

// print
console.log(image)

        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
    })
};

 
// Delete one image by its ID
exports.deleteImgById = function(req, res, next) {
    console.log(req.params.id)
    let imgId = req.params.id;
 
    UserImgGallery.findByIdAndRemove(imgId, (err, image) => {
        if (err) return handleError(res, err);
        if (!image)return handleEntityNotFound(res, 'Image');
 
        del([path.join(UPLOAD_PATH, image.filename)]).then(deleted => {
            return res.status(200).send({message: 'User is successfully Deleted...'});
        })
    })
}


/*---------------------------------Error handler-----------------------------------------------------*/

function handleError(res, err) {
  return res.status(404).send('Something went worng!');
}

/*---------------------------------EntityNotFound Error handler-----------------------------------------------------*/

function handleEntityNotFound(res, entity) {
  return res.status(403).send(entity + ' not found!');
}