import { NextResponse } from 'next/server';
import { type UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import { type IResponse } from '@/shared/interfaces';
import { type ICloudinary } from '@/app/(project)/interfaces';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req: Request): Promise<NextResponse<IResponse<ICloudinary | null>>> {
  try {
    const { path } = await req.json();
    if (!path)
      return NextResponse.json({ data: null, error: 'Missing image file' }, { status: 400 });
    const options: UploadApiOptions = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: 'flexibble',
      transformation: [{ width: 1000, height: 752, crop: 'scale' }]
    };
    const res = await cloudinary.uploader.upload(path, options);
    return NextResponse.json(
      {
        data: { public_id: res.public_id, secure_url: res.secure_url },
        error: null
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ data: null, error: 'Error on upload image' }, { status: 500 });
  }
}
