const express = require('express');
const controller = require('./userImgGallery.controller');
import { UPLOAD_PATH, upload } from '../../app';

const isAuthenticated = require('../../auth/auth.service');

const router = express.Router();

router.get('/', controller.GetAllImage); // no authrization
router.get('/:id', controller.GetAllImageById); // no authrization
router.post('/', upload.single('image'), controller.create); // no authrization
router.delete('/:id', controller.deleteImgById); // no authrization

module.exports = router;
