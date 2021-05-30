var express = require('express');
var router = express.Router();
const userModel = require('../user/user.model')
const multer = require('multer');
const uploadPath = "F:/Software/Sugar Cosmetics/backend/public/images"
const path = require('path');
const sharp = require('sharp');
const resizer = require('node-image-resizer');
console.log('uploadPath', uploadPath)

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, uploadPath)
    },
    filename: (req, file, callBack) => {


        callBack(null, `name_${file.originalname}`)
    }
})

var upload = multer({ storage: storage });

router.post('/add', upload.single('file'), async (req, res, next) => {
    var data = {};
    data.name = req.body.name;
    data.email = req.body.email;

    data.address = req.body.address;

    data.mobileno = req.body.mobileno;
    data.uniquecode = req.body.uniquecode


    var userData = userModel.user(data)
    var result = await userData.save();
    await userModel.uniquecode.update({ code: data.uniquecode }, {
        $set: {
            valid: false
        }
    })
    console.log('fffff', req.body);
    await imagesresize(req.file.path);
    res.send(result)

});

router.get('/uniquecheck', (req, res) => {
    console.log(req.params, req.query)
    userModel.uniquecode.find({ code: req.query.code }, function (err, resp) {
        if (err) {
            res.send(err)
        } else {
            res.send(resp)
        }

    })
})
router.get('/usercheck', (req, res) => {
    console.log(req.params, req.query)
    userModel.user.find({ name: req.query.name }, function (err, resp) {
        if (err) {
            res.send(err)
        } else {
            res.send(resp)
        }

    })
})

const setup = {
    all: {
        path: 'F:/Software/Sugar Cosmetics/backend/public/images/',
        quality: 80
    },
    versions: [{
        quality: 100,
        prefix: 'small_',
        width: 200,
        height: 200
    }]
};

async function imagesresize(img) {
    const thumbs = await resizer(img, setup);

}

// https://www.w3jar.com/node-js-form-handling/
// jhFtgpVw
// sw9UiQi9
// async function user(){
//    const data= await userModel.user.find({});
//    console.log('data',data);
// }
// user()

module.exports = router;