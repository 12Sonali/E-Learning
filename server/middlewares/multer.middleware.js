import path from "path";

import multer from "multer";

const upload = multer ({
    dest : "uploads/",
    limits : { fileSize: 50 * 1024 * 1024 }, // 50 mb in size max limit
    storage : multer.diskStorage ({
        destination : "uploads/",
        filename : (_req, file, cb ) => {
            console.log('file >', file);
            cb(null,file.originalname);
        },
    }),

    fileFilter : (req_, file , cb) => {

        if (
            ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".webp" &&
            ext !== ".png" &&
            ext !== ".mp4" &&
        )   {
            cb(new Error('Unsupported file type! ${ext}'), false);
            return;
        }

        cb(null, true);
    },
});

export default upload;