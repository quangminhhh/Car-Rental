import multer from "multer";

const storage = multer.memoryStorage(); // Sử dụng memory storage thay vì disk storage

const upload = multer({ storage: storage });
export default upload;
