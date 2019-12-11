const fs = require("fs")
const multer = require("multer")
const sharp = require("sharp")
const path = require("path")


class FileService {

    constructor(uploadDir) {
        this.uploadDir = uploadDir || "C:/Users/baran/Documents/GitHub/geo-server/upload/"
    }

    async resizeAndConvertImage(image, name, width = 160, height = 120) {
        try {
            const resizedImage = await sharp(image)
                .resize(width, height)
                .toFile(path.resolve(path.join("C:/Users/baran/Documents/GitHub/geo-server/upload/", name)), (err, info) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Info " + info)
                        return Promise.resolve()
                    }
                })

        } catch (err) {
            console.log(err)
        }
    }

    async getPathFile(path){
        try{
            const image = await fs.readFile(path)
            if(image){
                return image
            }
        }catch(err){
            console.log(err)
        }
    }


    async getSizedImage(path, width=160, height=120){
        try{
            const image = this.getPathFile(path)
            if(image){
                console.log(image)
                return await sharp()
                .resize(width, height)
                .toFormat('png')
            }
        }catch(err){
            console.log(err)
        }
    }
}


module.exports = new FileService()