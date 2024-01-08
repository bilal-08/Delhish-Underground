import fetch from 'node-fetch'
import multer from 'multer';
import path from 'path'
import FormData from 'form-data'
import fs from 'fs';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // it's only done for vercel
    cb(null, '/tmp/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});

export const upload = multer({ storage });




export const uploadImg = async (path) => {
  const file = fs.readFileSync(path)
  const form = new FormData();
  form.append("image", file.toString('base64'))
  const result = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
    method: 'POST',
    body: form,
  }).catch(x => console.error(x))
  return (await result.json()).data.image.url
}