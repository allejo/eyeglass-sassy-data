"use strict";

var fs   = require('fs');
var eol  = require('eol');
var path = require('path');
var yaml = require('js-yaml');

module.exports = function(eyeglass, sass) {
    var sassUtils = require('node-sass-utils')(sass);

    return {
        sassDir: path.join(__dirname, '..', 'sass'),
        functions: {
            "sd-import-from-json($filePath, $encoding: 'utf8')": function($filePath, $encoding, done) {
                fs.readFile($filePath.getValue(), $encoding.getValue(), function (err, data) {
                    if (err) {
                        done(sass.types.Error("File read error: \'" + err.toString() + "\'."));
                        return;
                    }

                    var pData = JSON.parse(eol.auto(data));
                    done(sassUtils.castToSass(pData));
                });
            },
            "sd-read-json($json)": function ($json, done) {
                try {
                    var data = JSON.parse($json.getValue());
                    done(sassUtils.castToSass(data));
                } catch (e) {
                    done(sass.types.Error("JSON parsing error: " + e));
                }
            },
            "sd-import-from-yaml($filePath, $encoding: 'utf8')": function ($filePath, $encoding, done) {
                fs.readFile($filePath.getValue(), $encoding.getValue(), function (err, data) {
                    if (err) {
                        done(sass.types.Error("File read error: \'" + err.toString() + "\'."));
                        return;
                    }

                    var pData = yaml.safeLoad(eol.auto(data));
                    done(sassUtils.castToSass(pData));
                });
            }
        }
    };
};
