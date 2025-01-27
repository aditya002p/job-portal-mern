import app from "./app.js";
import http from "http";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
