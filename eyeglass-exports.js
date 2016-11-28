"use strict";

var fs   = require('fs');
var eol  = require('eol');
var path = require('path');
var yaml = require('js-yaml');

module.exports = function(eyeglass, sass) {
    var sassUtils = require('node-sass-utils')(sass);

    return {
        sassDir: path.join(__dirname, 'sass'),
        functions: {
            "sd-read-file($filePath, $encoding: 'utf8')": function ($filePath, $encoding, done) {
                fs.readFile($filePath.getValue(), $encoding.getValue(), function (err, data) {
                    if (err) {
                        done(sass.types.Error("File read error: \'" + err.toString() + "\'."));
                        return;
                    }

                    var fileData = ($encoding.getValue() == 'base64') ? data : eol.auto(data);
                    done(sass.types.String(fileData));
                });
            },
            "sd-json-to-map($jsonAsString)": function ($jsonAsString, done) {
                try {
                    var data = JSON.parse($jsonAsString.getValue());
                    done(sassUtils.castToSass(data));
                } catch (e) {
                    done(sass.types.Error("JSON parsing error: " + e.toString()));
                }
            },
            "sd-yaml-to-map($yamlAsString)": function ($yamlAsString, done) {
                try {
                    var pData = yaml.safeLoad($yamlAsString.getValue());
                    done(sassUtils.castToSass(pData));
                } catch (e) {
                    done(sass.types.Error("YAML parsing error: " + e.toString()));
                }
            }
        }
    };
};
