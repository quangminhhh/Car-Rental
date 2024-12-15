import cloudinary from './cloudinaryConfig.js';

export async function uploadImage(filePath) {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "Assets" // Tạo thư mục để quản lý ảnh
        });
        return result.secure_url; // Trả về URL ảnh đã tải lên
    } catch (error) {
        console.error("Lỗi khi tải ảnh lên Cloudinary:", error);
        throw error;
    }
}

// Ví dụ gọi hàm upload với đường dẫn ảnh
uploadImage('./Assets/car.jpg').then(url => {
    console.log("URL ảnh đã tải lên:", url);
});
