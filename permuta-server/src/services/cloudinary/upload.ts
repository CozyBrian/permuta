import Cloudinary from ".";

type IUploadToCloudinaryParams = {
  filepath?: string;
  folder: string;
};

export async function UploadToCloudinary({
  filepath,
  folder,
}: IUploadToCloudinaryParams) {
  if (filepath === undefined) {
    return null;
  }

  const result = await Cloudinary.uploader.upload(filepath, {
    folder,
  });

  return result.url;
}
