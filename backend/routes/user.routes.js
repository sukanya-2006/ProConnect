// import {Router} from "express";
// import { login, register, uploadProfilePicture, updateUserProfile, getUserAndProfile, updateProfileData, getAllUserProfile, downloadProfile, sendConnectionRequest, getMyConnectionsRequests, whatAreMyConnections , acceptConnectionRequest, getUserProfileAndUserBasedOnUsername,getMyNetwork, uploadBannerPicture } from "../controllers/user.controller.js";
// import multer from "multer";

// const router = Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({storage: storage})

// import express from 'express';
// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';
// const router = Router();

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'proconnect',
//         allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
//     }
// });

import { Router } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { login, register, uploadProfilePicture, updateUserProfile, getUserAndProfile, updateProfileData, getAllUserProfile, downloadProfile, sendConnectionRequest, getMyConnectionsRequests, whatAreMyConnections, acceptConnectionRequest, getUserProfileAndUserBasedOnUsername, getMyNetwork, uploadBannerPicture } from "../controllers/user.controller.js";

const router = Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
   cloudinary: cloudinary,
   params: {
        folder: 'proconnect',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
     }
});

const upload = multer({ storage });

router.route("/update_profile_picture")
.post(upload.single('profile_picture'), uploadProfilePicture)
router.route("/update_banner_picture")
.post(upload.single('banner_picture'), uploadBannerPicture)

router.route('/register').post(register);
router.route('/login').post(login);
router.route("/user_update").post(updateUserProfile);
router.route("/get_user_and_profile").get(getUserAndProfile);
router.route("/update_profile_data").post(updateProfileData);
router.route("/user/get_all_users").get(getAllUserProfile);
router.route("/user/download_resume").get(downloadProfile);
router.route("/user/get_my_network").get(getMyNetwork);
router.route("/user/send_connection_request").post(sendConnectionRequest);
router.route("/user/get_connections").get(whatAreMyConnections);
router.route("/user/get_my_connections_request").get(getMyConnectionsRequests);
router.route("/user/accept_connection_request").post(acceptConnectionRequest);
router.route("/user/get_profile_based_on_username").get(getUserProfileAndUserBasedOnUsername);


export default router;