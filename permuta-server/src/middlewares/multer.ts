import { Request } from "express";
import multer from "multer";
import nanoid from "nanoid";

type FileNameCallBack = (error: Error | null, fileName: string) => void;

const storage = multer.diskStorage({
  filename: (
    _req: Request,
    file: Express.Multer.File,
    callback: FileNameCallBack,
  ) => {
    const withoutName = file.originalname.split(".");
    callback(null, nanoid(16) + "." + withoutName[withoutName.length - 1]);
  },
});

const upload = multer({ storage: storage });

const MulterUpload = upload.single("image");

export default MulterUpload;
