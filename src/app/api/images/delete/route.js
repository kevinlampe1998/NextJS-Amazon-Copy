import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import Image from '@/models/Image';
import connectMongo from '@/lib/connectMongo';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(req, res) {
  try {
    connectMongo();

    const body = await req.json();
    const { public_id } = body;

    const destroyResponse = await cloudinary.uploader.destroy(public_id);

    const foundImage = await Image.findOne({ public_id });

    if (!foundImage) {
        return NextResponse.json({
            message: 'Image doc does not exist already!',
            imageDocDoesNotExistAlready: 1
        });
    }

    if (destroyResponse.result === 'ok') {
      await Image.deleteOne({ public_id });

      return NextResponse.json({
        message: 'Image successfully deleted!',
        success: true,
      });
    } else {
      return NextResponse.json({
        message: 'Failed to delete image from Cloudinary.',
        success: false,
      });
    }
  } catch (error) {
    console.log('Image Deletion Error: ', error);
    return NextResponse.json({ message: 'Deletion failed', error: 1 });
  }
}
