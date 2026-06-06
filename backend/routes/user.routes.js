import {Router} from "express";
import { login, register, uploadProfilePicture, updateUserProfile, getUserAndProfile, updateProfileData, getAllUserProfile, downloadProfile, sendConnectionRequest, getMyConnectionsRequests, whatAreMyConnections , acceptConnectionRequest, getUserProfileAndUserBasedOnUsername,getMyNetwork, uploadBannerPicture } from "../controllers/user.controller.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

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