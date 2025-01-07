import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import Image from '@/models/Image';
import connectMongo from '@/lib/connectMongo';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(req) {
  try {
    await connectMongo();

    const body = await req.json();
    const { id, data } = body;

    const existingImage = await Image.findById(id);

    if (!existingImage) {
      return NextResponse.json({ message: 'Image not found', error: 1 });
    }

    await cloudinary.uploader.destroy(existingImage.public_id);

    const uploadResponse = await cloudinary.uploader.upload(data, {
      folder: 'amazon',
    });

    const updatedUrl = uploadResponse.secure_url;
    const updatedPublicId = uploadResponse.public_id;

    existingImage.public_id = updatedPublicId;
    existingImage.url = updatedUrl;

    const updatedImage = await existingImage.save();

    return NextResponse.json({
      message: 'Image successfully updated!',
      success: true,
      image: updatedImage,
    });
  } catch (error) {
    console.log('Image Update Error: ', error);
    return NextResponse.json({ message: 'Update failed', error: 1 });
  }
}
