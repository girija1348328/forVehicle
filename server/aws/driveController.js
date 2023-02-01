const stream = require("stream");
const express = require("express");
const path = require("path");
const { google } = require("googleapis");
const uploadRouter = express.Router();
const KEYFILEPATH = path.join(__dirname,"credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];


const uploadFile = async (file) => {
    try {
        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);
        const auth = new google.auth.GoogleAuth({
            keyFile: KEYFILEPATH,
            scopes: SCOPES
        });
        const driveService = google.drive({
            version: 'v3',
            auth
        });
        const fileMetaData = {
            'name': file.originalname,
            'parents': ['1PcDgHEB32gm71wRxA6SaZWvxefdRxEGC']
        }
        const media = {
            mimeType: file.mimeType,
            body: bufferStream
        }
      
        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            fields: 'id,name'
        });
        console.log("response:", response);
        return response.data.id
    }
    catch (err) {
        console.log(err.message);
    }
}



module.exports = uploadFile;