const FileService = require("../../services/FileService")

module.exports = async (req, res) => {
    try{
        const width = req.query.width
        const height = req.query.height
        const fileName = req.query.fileName
        const imagePath = FileService.uploadDir + fileName
        const image = await FileService.getSizedImage(imagePath, width, height)
        if(image){
            console.log(image.path)
        }

    }catch(err){
        console.log(err)
    }
}