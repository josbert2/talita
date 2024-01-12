import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";


import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dtas4wvbl', 
  api_key: '619512972491755', 
  api_secret: 'ePNKKiih7M4yIdy3hjO6aWxA4XA' 
});


export async function POST(request){

    
    const data = await request.formData()
    const image = data.get('image')

    

    
    
    if (!image ) {
        return NextResponse.error(new Error('No file uploaded'))
    }
    


    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    

    const filePath = path.join(process.cwd(), 'public',  image.name)

    
    await writeFile(filePath, buffer)

    const result = await cloudinary.uploader.upload(filePath)


    return NextResponse.json({
        message: 'File uploaded',
        result: result.secure_url
    })
}