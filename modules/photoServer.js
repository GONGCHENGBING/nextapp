const path = require('path');
const parseurl = require('parseurl');
const fs = require('fs');
const { allowPhotoType, publictDirectory } = require("./config");
module.exports = function photoServer(req, res, next) {
    //所有的图片请求都应该是GET请求
    if (req.method === 'GET') {
        //判断url是否为图片请求，根据后缀判断，通过'/'划分路劲区域，判断最后一个是否包含允许图片文件类型后缀
        let Reqpath = decodeURIComponent(parseurl(req).path);
        let ReqpathArr = Reqpath.split('/');
        ReqpathArr.splice(0, 1);
        let photoName = ReqpathArr.splice(ReqpathArr.length - 1, 1)[0];
        let basePath = ReqpathArr.join('/');
        let photoNameArr = photoName.split('.');
        //判断该图片是否为允许的格式
        if (photoNameArr.length > 1 && allowPhotoType.some(type => type === photoNameArr[photoNameArr.length - 1])) {
            //确定为允许的格式，根据路径判断文件是否存在
            let photoPath = path.join('./' + publictDirectory, Reqpath);
            //__dirname：当前文件所在目录，区别调用位置
            fs.access(photoPath, (err) => {
                if (err) {
                    // res.status(404).send(err);
                    next();
                }
                else {
                    let root = path.join('./' + publictDirectory, basePath);
                    var options = {
                        root: root,
                        dotfiles: 'deny',
                        headers: {
                            'x-timestamp': Date.now(),
                            'x-sent': true
                        }
                    }
                    // console.log(photoName);
                    // public\uploads\logsImg\谢鹏.jpg
                    res.sendFile(photoName, options, function (err) {
                        if (err) {
                            res.status(400).send('图片获取失败！');
                        }
                    })
                }
            })
        }
        else {
            next();
        }
    }
    else {
        next();
    }
}