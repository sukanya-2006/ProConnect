// import Post from "../models/posts.model.js";
// import Profile from "../models/profile.model.js"
// import User from "../models/user.model.js";
// import Comment from "../models/comments.model.js";
// import ConnectionRequest from "../models/connections.model.js"; 
// import crypto from 'crypto';
// import bcrypt from 'bcrypt';
// import PDFDocument from 'pdfkit';
// import fs from "fs";

import Post from "../models/posts.model.js";
import Profile from "../models/profile.model.js"
import User from "../models/user.model.js";
import Comment from "../models/comments.model.js";
import ConnectionRequest from "../models/connections.model.js"; 
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import PDFDocument from 'pdfkit';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



// const convertUserDataTOPDF = async (userData) => {
//     const doc = new PDFDocument({
//         margin: 50
//     });

//     const outputPath =
//         crypto.randomBytes(32).toString("hex") + ".pdf";

//     const stream = fs.createWriteStream(
//         "uploads/" + outputPath
//     );

//     doc.pipe(stream);

//     // ==========================
//     // PROFILE IMAGE
//     // ==========================

//     if (
//         userData?.userId?.profilePicture &&
//         userData.userId.profilePicture !== "default.jpg"
//     ) {
//         const imagePath = `uploads/${userData.userId.profilePicture}`;

//         if (fs.existsSync(imagePath)) {
//             try {
//                 doc.image(imagePath, {
//                     width: 120,
//                     align: "center"
//                 });

//                 doc.moveDown();
//             } catch (err) {
//                 console.log(
//                     "Image loading failed:",
//                     err.message
//                 );
//             }
//         }
//     }

//     // ==========================
//     // HEADER
//     // ==========================

//     doc
//         .fontSize(24)
//         .text(userData.userId.name, {
//             align: "center"
//         });

//     doc.moveDown(0.5);

//     doc
//         .fontSize(12)
//         .text(
//             `@${userData.userId.username}`,
//             {
//                 align: "center"
//             }
//         );

//     doc
//         .fontSize(12)
//         .text(
//             userData.userId.email,
//             {
//                 align: "center"
//             }
//         );

//     doc.moveDown(1);

//     // ==========================
//     // BIO
//     // ==========================

//     doc
//         .fontSize(18)
//         .text("Professional Summary");

//     doc.moveDown(0.3);

//     doc
//         .fontSize(12)
//         .text(
//             userData.bio ||
//             "No bio added."
//         );

//     doc.moveDown();

//     // ==========================
//     // CURRENT POSITION
//     // ==========================

//     doc
//         .fontSize(18)
//         .text("Current Position");

//     doc.moveDown(0.3);

//     doc
//         .fontSize(12)
//         .text(
//             userData.currentPost ||
//             "Not specified"
//         );

//     doc.moveDown();

//     // ==========================
//     // WORK HISTORY
//     // ==========================

//     doc
//         .fontSize(18)
//         .text("Work Experience");

//     doc.moveDown(0.3);

//     if (
//         userData.pastWork &&
//         userData.pastWork.length > 0
//     ) {
//         userData.pastWork.forEach((work) => {
//             doc
//                 .fontSize(14)
//                 .text(
//                     `${work.company}`
//                 );

//             doc
//                 .fontSize(12)
//                 .text(
//                     `Position: ${work.position}`
//                 );

//             doc
//                 .fontSize(12)
//                 .text(
//                     `Years: ${work.years}`
//                 );

//             doc.moveDown();
//         });
//     } else {
//         doc
//             .fontSize(12)
//             .text(
//                 "No work experience added."
//             );
//     }

//     doc.moveDown();

//     // ==========================
//     // EDUCATION
//     // ==========================

//     doc
//         .fontSize(18)
//         .text("Education");

//     doc.moveDown(0.3);

//     if (
//         userData.education &&
//         userData.education.length > 0
//     ) {
//         userData.education.forEach((edu) => {

//             doc
//                 .fontSize(14)
//                 .text(
//                     edu.school || "School"
//                 );

//             doc
//                 .fontSize(12)
//                 .text(
//                     `Degree: ${edu.degree || ""}`
//                 );

//             doc
//                 .fontSize(12)
//                 .text(
//                     `Field: ${edu.fieldOfStudy || ""}`
//                 );

//             doc.moveDown();
//         });
//     } else {

//         doc
//             .fontSize(12)
//             .text(
//                 "No education history added."
//             );
//     }

//     doc.moveDown();

//     // ==========================
//     // SKILLS
//     // ==========================

//     doc
//         .fontSize(18)
//         .text("Skills");

//     doc.moveDown(0.3);

//     if (
//         userData.skills &&
//         userData.skills.length > 0
//     ) {

//         doc
//             .fontSize(12)
//             .text(
//                 userData.skills.join(", ")
//             );

//     } else {

//         doc
//             .fontSize(12)
//             .text(
//                 "No skills added."
//             );
//     }

//     doc.moveDown();

//     // ==========================
//     // GENERATED DATE
//     // ==========================

//     doc
//         .fontSize(10)
//         .fillColor("gray")
//         .text(
//             `Generated on ${new Date().toLocaleDateString()}`
//         );

//     doc.end();

//     return outputPath;
// };

const convertUserDataTOPDF = async (userData) => {
    const doc = new PDFDocument({ margin: 50 });

    const cloudinaryUpload = await new Promise((resolve, reject) => {
        // const uploadStream = cloudinary.uploader.upload_stream(
        //     { folder: 'proconnect/resumes', resource_type: 'raw', format: 'pdf' },
        //     (error, result) => {
        //         if (error) reject(error);
        //         else resolve(result);
        //     }
        // );
        const uploadStream = cloudinary.uploader.upload_stream(
    { 
        folder: 'proconnect/resumes', 
        resource_type: 'raw', 
        format: 'pdf',
        flags: 'attachment'
    },
    (error, result) => {
        if (error) reject(error);
        else resolve(result);
    }
);

        doc.pipe(uploadStream);

        // PROFILE IMAGE
        // if (
        //     userData?.userId?.profilePicture &&
        //     userData.userId.profilePicture !== "default.jpg" &&
        //     userData.userId.profilePicture.startsWith("http")
        // ) {
        //     try {
        //         doc.image(userData.userId.profilePicture, { width: 120, align: "center" });
        //         doc.moveDown();
        //     } catch (err) {
        //         console.log("Image loading failed:", err.message);
        //     }
        // }

        // HEADER
        doc.fontSize(24).text(userData.userId.name, { align: "center" });
        doc.moveDown(0.5);
        doc.fontSize(12).text(`@${userData.userId.username}`, { align: "center" });
        doc.fontSize(12).text(userData.userId.email, { align: "center" });
        doc.moveDown(1);

        // BIO
        doc.fontSize(18).text("Professional Summary");
        doc.moveDown(0.3);
        doc.fontSize(12).text(userData.bio || "No bio added.");
        doc.moveDown();

        // CURRENT POSITION
        doc.fontSize(18).text("Current Position");
        doc.moveDown(0.3);
        doc.fontSize(12).text(userData.currentPost || "Not specified");
        doc.moveDown();

        // WORK HISTORY
        doc.fontSize(18).text("Work Experience");
        doc.moveDown(0.3);
        if (userData.pastWork && userData.pastWork.length > 0) {
            userData.pastWork.forEach((work) => {
                doc.fontSize(14).text(`${work.company}`);
                doc.fontSize(12).text(`Position: ${work.position}`);
                doc.fontSize(12).text(`Years: ${work.years}`);
                doc.moveDown();
            });
        } else {
            doc.fontSize(12).text("No work experience added.");
        }
        doc.moveDown();

        // EDUCATION
        doc.fontSize(18).text("Education");
        doc.moveDown(0.3);
        if (userData.education && userData.education.length > 0) {
            userData.education.forEach((edu) => {
                doc.fontSize(14).text(edu.school || "School");
                doc.fontSize(12).text(`Degree: ${edu.degree || ""}`);
                doc.fontSize(12).text(`Field: ${edu.fieldOfStudy || ""}`);
                doc.moveDown();
            });
        } else {
            doc.fontSize(12).text("No education history added.");
        }
        doc.moveDown();

        // SKILLS
        doc.fontSize(18).text("Skills");
        doc.moveDown(0.3);
        if (userData.skills && userData.skills.length > 0) {
            doc.fontSize(12).text(userData.skills.join(", "));
        } else {
            doc.fontSize(12).text("No skills added.");
        }
        doc.moveDown();

        // GENERATED DATE
        doc.fontSize(10).fillColor("gray").text(`Generated on ${new Date().toLocaleDateString()}`);

        doc.end();
    });

    return cloudinaryUpload.secure_url;
};


export const register = async (req, res) => {
    try {
       const {name, email, password, username} = req.body;

       if(!name || !email || !password || !username ) return res.status(400).json({message: "All fields are required"})

       const user = await User.findOne({
           email
       });

       if (user) return res.status(400).json({message: "User already exists"})

       const hashedPassword = await bcrypt.hash(password, 10);
    //    const newUser = new User ({
    //     name,
    //     email,
    //     password: hashedPassword,
    //     username
    //    });

    //    await newUser.save();
       
    //    const profile = new Profile({userId: newUser._id});
    //    await profile.save();

    //    return res.json({message: "User created"})
     const token = crypto.randomBytes(32).toString("hex");

const newUser = new User({
   name,
   email,
   password: hashedPassword,
   username,
   token
});

await newUser.save();

const profile = new Profile({
   userId: newUser._id
});

await profile.save();

return res.json({
   token,
   message: "User created"
});

    } catch (error) {
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return res.status(400).json({message: `${field} already exists`})
      }
     return res.status(500).json({message: error.message})
   }
}






export const login = async (req, res) => {
      try {
       const { email, password} = req.body;

       if( !email || !password) return res.status(400).json({message: "All fields are required"})

       const user = await User.findOne({
           email
       });
       if (!user) return res.status(404).json({message: "user not found"})
       
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(404).json({message: "Invalid Credentials"})
       

     const token = crypto.randomBytes(32).toString("hex");
     
     await User.updateOne({_id: user._id},{token});
     return res.json({token})
    } catch(error) {
    return res.status(500).json({message: error.message})

}
}






// export const uploadProfilePicture = async (req, res) => {
//     const {token} = req.body;

//     try{

//         const user = await User.findOne({token: token});

//         if(!user) {
//             return res.status(404).json({message: "user not found"})
//         }

//         user.profilePicture = req.file.filename;

//         await user.save();


//         return res.json({message: "Profile Picture updated"})

//     } catch (error) {
//        return res.status(500).json({message: error.message})
//     }
// }


export const uploadProfilePicture = async (req, res) => {
    const { token } = req.body;
    try {
        const user = await User.findOne({ token });
        if (!user) return res.status(404).json({ message: "user not found" });

        user.profilePicture = req.file.path; // Cloudinary returns full URL in req.file.path
        await user.save();

        return res.json({ message: "Profile Picture updated" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}




export const updateUserProfile = async (req, res) => {

    try{

        const {token, ...newUserData} = req.body;
        
        const user = await User.findOne({token: token});

        if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        const {username, email} = newUserData;

        const existingUser = await User.findOne({ $or : [{username}, {email}]});
        
        if (existingUser){
           if (existingUser || String(existingUser._id) !== String(user._id)) {
            return res.status(404).json({message: "User already exists"})
        }
        }
        
        Object.assign(user, newUserData);
        await user.save();

        return res.json({message: "User updated"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


export const getUserAndProfile = async (req, res) => {
    try {
        const {token} = req.query;
        console.log("TOKEN RECEIVED:", token)

        const user = await User.findOne({token: token});
        console.log("USER:", user)

        if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        const userProfile = await Profile.findOne({ userId: user._id})
        .populate('userId', 'name email username profilePicture bannerPicture');

        console.log("PROFILE:", userProfile)

        if(!userProfile) {
            return res.status(404).json({message: "Profile not found"})
        }
         
        return res.json(userProfile)

    } catch (error) {
        console.log("ERROR:", error.message)
        return res.status(500).json({message: error.message})
    }
}



export const updateProfileData = async(req, res) => {

    try {
        const { token, ...newProfileData} = req.body;

        const userProfile = await User.findOne({token: token});

        if (!userProfile) {
            return res.status(404).json({message: "User not found"})
        }
        
        const profile_to_update = await Profile.findOne({userId : userProfile._id})

        Object.assign(profile_to_update, newProfileData);

        await profile_to_update.save();

        return res.json({message: "Profile updated"})

    } catch(error) {
        return res.status(500).json({message: error.message})
    }
}


export const getAllUserProfile = async (req, res) => {
    try {

        const profiles = await Profile.find().populate("userId", "name username email profilePicture");

        return res.json({profiles})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}



// export const downloadProfile = async (req, res) => {
//     const user_id = req.query.id;

//     const userProfile = await Profile.findOne({ userId : user_id})
//        .populate('userId', 'name username email profilePicture bannerPicture');


//     let outputPath = await convertUserDataTOPDF(userProfile);


//     return res.json({"message": outputPath})
// }

export const downloadProfile = async (req, res) => {
    const user_id = req.query.id;

    try {
        const userProfile = await Profile.findOne({ userId: user_id })
           .populate('userId', 'name username email profilePicture bannerPicture');

        const doc = new PDFDocument({ margin: 50 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${userProfile.userId.name}_resume.pdf"`);

        doc.pipe(res);

        // HEADER
        doc.fontSize(24).text(userProfile.userId.name, { align: "center" });
        doc.moveDown(0.5);
        doc.fontSize(12).text(`@${userProfile.userId.username}`, { align: "center" });
        doc.fontSize(12).text(userProfile.userId.email, { align: "center" });
        doc.moveDown(1);

        // BIO
        doc.fontSize(18).text("Professional Summary");
        doc.moveDown(0.3);
        doc.fontSize(12).text(userProfile.bio || "No bio added.");
        doc.moveDown();

        // CURRENT POSITION
        doc.fontSize(18).text("Current Position");
        doc.moveDown(0.3);
        doc.fontSize(12).text(userProfile.currentPost || "Not specified");
        doc.moveDown();

        // WORK HISTORY
        doc.fontSize(18).text("Work Experience");
        doc.moveDown(0.3);
        if (userProfile.pastWork && userProfile.pastWork.length > 0) {
            userProfile.pastWork.forEach((work) => {
                doc.fontSize(14).text(`${work.company}`);
                doc.fontSize(12).text(`Position: ${work.position}`);
                doc.fontSize(12).text(`Years: ${work.years}`);
                doc.moveDown();
            });
        } else {
            doc.fontSize(12).text("No work experience added.");
        }
        doc.moveDown();

        // EDUCATION
        doc.fontSize(18).text("Education");
        doc.moveDown(0.3);
        if (userProfile.education && userProfile.education.length > 0) {
            userProfile.education.forEach((edu) => {
                doc.fontSize(14).text(edu.school || "School");
                doc.fontSize(12).text(`Degree: ${edu.degree || ""}`);
                doc.fontSize(12).text(`Field: ${edu.fieldOfStudy || ""}`);
                doc.moveDown();
            });
        } else {
            doc.fontSize(12).text("No education history added.");
        }
        doc.moveDown();

        // SKILLS
        doc.fontSize(18).text("Skills");
        doc.moveDown(0.3);
        if (userProfile.skills && userProfile.skills.length > 0) {
            doc.fontSize(12).text(userProfile.skills.join(", "));
        } else {
            doc.fontSize(12).text("No skills added.");
        }
        doc.moveDown();

        doc.fontSize(10).fillColor("gray").text(`Generated on ${new Date().toLocaleDateString()}`);

        doc.end();

    } catch (err) {
        console.log("PDF ERROR:", err.message);
        return res.status(500).json({message: err.message});
    }
}



// export const downloadProfile = async (req, res) => {
//     const user_id = req.query.id;

//     try {
//         const userProfile = await Profile.findOne({ userId: user_id })
//            .populate('userId', 'name username email profilePicture bannerPicture');

//         console.log("GENERATING PDF FOR:", userProfile?.userId?.name);
        
//         let outputPath = await convertUserDataTOPDF(userProfile);
        
//         console.log("PDF GENERATED:", outputPath);

//         return res.json({"message": outputPath})
//     } catch (err) {
//         console.log("PDF ERROR:", err.message);
//         return res.status(500).json({message: err.message})
//     }
// }





export const sendConnectionRequest = async (req, res) => {
     const { token , connectionId} = req.body;

     try {
         const user = await User.findOne({token});
         
         if(!user) {
            return res.status(404).json({message: "User not found"})
         }
         console.log("connectionId =", connectionId);
         console.log("typeof =", typeof connectionId);
         const connectionUser = await User.findOne({ _id: connectionId });
         console.log("connectionUser =", connectionUser);

         if(!connectionUser) {
            return res.status(404).json({message:"Connection User not found"})
         }

         const existingRequest = await ConnectionRequest.findOne({
          userId: user._id,
          connectionId: connectionUser._id
        })

         if (existingRequest) {
            return res.status(400).json({message: "Request already sent"})
         }

         const request = new  ConnectionRequest ({
            userId: user._id,
            connectionId: connectionUser._id
         })

         await request.save();

         return res.json({message: "Request sent"})


     } catch (err) {
        return res.status(500).json({message: err.message})
     }

}



export const getMyConnectionsRequests = async (req, res) => {

    const { token } = req.query;

    try {

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const connections = await ConnectionRequest.find({
            userId: user._id
        })
        .populate(
            "connectionId",
            "name username email profilePicture"
        );

        return res.json({ connections });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
}

export const whatAreMyConnections = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({token});

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const connections = await ConnectionRequest.find({
            $or: [
                { userId: user._id },
                { connectionId: user._id }
            ]
        })
        .populate('userId', 'name username email profilePicture')
        .populate('connectionId', 'name username email profilePicture');

        return res.json(connections);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const getMyNetwork = async (req, res) => {

    const { token } = req.query;

    try {

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const connections = await ConnectionRequest.find({
            $or: [
                { userId: user._id },
                { connectionId: user._id }
            ],
            status_accepted: true
        })
        .populate(
            "userId",
            "name username email profilePicture"
        )
        .populate(
            "connectionId",
            "name username email profilePicture"
        );

        return res.json({
            connections
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }
}


export const acceptConnectionRequest =  async (req, res) => {
    const { token, requestId, action_type} = req.body;

    try {
        const user = await User.findOne({token});

          if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        const connection = await ConnectionRequest.findOne({_id: requestId});

         if(!connection) {
            return res.status(404).json({message: "Connection not found"})
        }

        if ( action_type === "accept") {
           connection.status_accepted = true;
        } else {
            connection.status_accepted = false;

        }

        await connection.save();
         return res.json({message:"Request Updated"})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}



export const commentPost = async ( req, res ) => {
    const { token, post_id, commentBody} = req.body;

    try {
        
        const user = await User.findOne({token: token}).select("_id");
        
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        const post = await Post.findOne({
            _id: post_id
        });
       
         if(!post) {
            return res.status(404).json({message: "Post not found"})
        }

        const comment = new Comment({
            userId : user._id,
            postId: post._id,
            body: commentBody
        });

        await comment.save();


        return res.status(200).json({message: "Comment Added"})

    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}


export const getUserProfileAndUserBasedOnUsername = async (req, res) => {
    const {username} = req.query;

    try {
        const user = await User.findOne({
            username
        });
    
    if (!user) {
        return res.status(404).json({message: "User not found"})
    }
    const userProfile = await Profile.findOne({userId: user._id})
    .populate('userId', 'name username email profilePicture bannerPicture');

    return res.json({"profile" : userProfile})
} catch(err) {
    return res.status(500).json({message: err.message})
}
}


// export const uploadBannerPicture = async (req, res) => {
//    try {

//       const token = req.body.token;

//       const user = jwt.verify(
//          token,
//          process.env.JWT_SECRET
//       );

//       const profile = await Profile.findOne({
//          userId: user._id
//       });

//       profile.bannerPicture = req.file.path;

//       await profile.save();

//       res.status(200).json({
//          success: true
//       });

//    } catch(error) {
//       console.log(error);

//       res.status(500).json({
//          success: false
//       });
//    }
// }


// export const uploadBannerPicture = async (req, res) => {
//     try {

//         console.log("BODY:", req.body);
//         console.log("FILE:", req.file);

//         const token = req.body.token;

//         const user = jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         );

//         console.log("USER:", user);

//         const profile = await Profile.findOne({
//             userId: user._id
//         });

//         console.log("PROFILE:", profile);

//         profile.bannerPicture = req.file.path;

//         await profile.save();

//         res.status(200).json({
//             success: true
//         });

//     } catch(error) {
//         console.log(error);

//         res.status(500).json({
//             success: false,
//             error: error.message
//         });
//     }
// }
export const uploadBannerPicture = async (req, res) => {
    const { token } = req.body;
    try {
        const user = await User.findOne({ token });
        if (!user) return res.status(404).json({ message: "user not found" });

        user.bannerPicture = req.file.path; // Cloudinary returns full URL in req.file.path
        await user.save();

        return res.json({ message: "Banner Picture Updated" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// export const uploadBannerPicture = async (req, res) => {
//     const { token } = req.body;

//     try {

//         const user = await User.findOne({
//             token: token
//         });

//         if (!user) {
//             return res.status(404).json({
//                 message: "user not found"
//             });
//         }

//         user.bannerPicture = req.file.filename;

//         await user.save();

//         return res.json({
//             message: "Banner Picture Updated"
//         });

//     } catch (error) {
//         return res.status(500).json({
//             message: error.message
//         });
//     }
// }