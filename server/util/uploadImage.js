import fetch from 'node-fetch'
import multer from 'multer';
import path from 'path'
import FormData from 'form-data'
import fs from 'fs';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../images/'));
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
  form.append("image", file)
  const result = await fetch("https://api.imgbb.com/1/upload?key=235ef89fb9a32fa804cddf4a7226d775", {
    method: 'POST',
    body: form,
  }).catch(x => console.error(x))
  return (await result.json()).data.image.url
}