import express from 'express';
import upload from '../Middleware/multer.js';
import cloudinary from '../Configs/cloudinaryConfig.js';

const router = express.Router();

router.post('/upload', upload.single("file"), (req, res) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
            console.error("Error uploading to Cloudinary:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to upload image",
                error: error.message
            });
        }

        // Đảm bảo phản hồi có result
        if (result) {
            res.status(200).json({
                success: true,
                message: "Successfully uploaded image",
                data: result.secure_url // URL của ảnh đã upload
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Unexpected error with no result",
            });
        }
    });

    // Gửi buffer của file vào stream để upload
    stream.end(req.file.buffer);
});

export default router;
