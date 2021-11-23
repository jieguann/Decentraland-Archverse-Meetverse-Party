//  批量获取文件名
// 使用 1. 修改pathName的路径为需要获取的文件夹
// 2. node name.js
var path = require("path");
var fs = require("fs");
const { dir } = require("console");

var pathName = "sounds/random/piano";

fs.readdir(pathName, function(err, files) {
    var dirs = {};
    (function interator(i){
        if(i == files.length) {
            console.log(dirs);
            return;
        }
        fs.stat(path.join(pathName, files[i]), function(err, data) {
            if(data.isFile()) {
                const name = files[i].split('.')[0];
                dirs[name] = pathName + "/" + files[i];
            }
            interator(i+1);
        })
    })(0)
})
