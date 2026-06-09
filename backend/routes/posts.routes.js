
// import multer from "multer";
// import {Router} from "express";
// import { activeCheck, createPost, deletePost, getAllPosts, get_comments_by_post, delete_comment_of_user, increment_likes} from "../controllers/posts.controller.js";
// import {commentPost} from "../controllers/user.controller.js";
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

// router.route('/').get(activeCheck);

// router.route("/post").post(upload.single('media'), createPost)
// router.route("/posts").get(getAllPosts)
// router.route("/delete_post").post(deletePost)
// router.route("/comment").post(commentPost);
// router.route("/get_comments").get(get_comments_by_post); 
// router.route("/delete_comment").delete(delete_comment_of_user);
// router.route("/increment_post_like").post(increment_likes);


// export default router;


import multer from "multer";
import { Router } from "express";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { activeCheck, createPost, deletePost, getAllPosts, get_comments_by_post, delete_comment_of_user, increment_likes} from "../controllers/posts.controller.js";
import {commentPost} from "../controllers/user.controller.js";

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

 router.route('/').get(activeCheck);

router.route("/post").post(upload.single('media'), createPost)
router.route("/posts").get(getAllPosts)
router.route("/delete_post").post(deletePost)
router.route("/comment").post(commentPost);
router.route("/get_comments").get(get_comments_by_post); 
router.route("/delete_comment").delete(delete_comment_of_user);
router.route("/increment_post_like").post(increment_likes);


export default router;