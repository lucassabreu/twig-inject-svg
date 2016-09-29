'use strict';

var fs = require('fs');
var path = require('path');
var es = require('event-stream');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

module.exports = function (filePath) {
    var go = function (file, callback) {
        var contents = iconv.decode(file.contents, 'utf-8');

        if(contents.indexOf('�') > -1){
            contents = iconv.decode(file.contents, 'gbk');
            contents = iconv.encode(contents, 'utf-8');
        }

        file.contents = iconv.encode(twigInjectSvg(contents), 'utf-8');
        return callback(null, file);
    }

    return es.map(go);

    function twigInjectSvg (contents) {
        var svgFiles = {};
        var match;
        var origin = contents;
        while(match = /<img([\w\W]+?)(>|><\/img>)/.exec(contents)) {
            if (!svgFiles[match[0]]) {
                var img = cheerio('img', match[0]);
                if (/\.svg$/.test(img.attr('src'))) {
                    svgFiles[match[0]] = fs.readFileSync(img.attr('src')).toString();
                    svgFiles[match[0]] = cheerio('svg', svgFiles[match[0]]);
                }
            }

            contents = contents.substr(match.index + match[0].length, contents.length);
        }

        contents = origin;

        for(var key in svgFiles) {
            contents = contents.replace(new RegExp(key, "gi"), svgFiles[key]);
        }

        return contents;
    }
    
};