"use strict";

var fs   = require('fs');
var eol  = require('eol');
var sass = require('node-sass');
var yaml = require('js-yaml');
var sassUtils = require('node-sass-utils')(sass);

module.exports = function(eyeglass, sass) {
    return {
        functions: {
            "import-from-json($filePath, $encoding: 'utf8')": function($filePath, $encoding, done) {
                fs.readFile($filePath.getValue(), $encoding.getValue(), function (err, data) {
                    if (err) {
                        done(sass.types.Error("File read error: \'" + err.toString() + "\'."));
                        return;
                    }

                    var pData = JSON.parse(eol.auto(data));
                    done(sassUtils.castToSass(sassUtils.castToSass(pData)));
                });
            }
        }
    };
};
