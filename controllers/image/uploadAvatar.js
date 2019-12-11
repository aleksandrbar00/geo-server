const FileService = require("../../services/FileService")

module.exports = async (req, res) => {
    const avatarImage = req.files.file
    if(avatarImage){
        const image = await FileService.resizeAndConvertImage(avatarImage.data, avatarImage.name)
        res.send({}).status(200)
    }else{
        res.send("500")
    }

}