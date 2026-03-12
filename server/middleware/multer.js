import multer from "multer";

//For uploading the image from cdrive.
const upload = multer({storage : multer.diskStorage({})});

export default upload;