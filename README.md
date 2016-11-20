# Sassy Data

[![npm](https://img.shields.io/npm/v/eyeglass-sassy-data.svg)](https://www.npmjs.com/package/eyeglass-sassy-data)

Sassy Data is an [eyeglass](https://github.com/sass-eyeglass/eyeglass) module which introduces functionality to import data from supported data formats to Sass maps or arrays. Currently, the supported data formats are:

- JSON
- YAML

## Installing

```
npm install --save eyeglass-sassy-data

# or

yarn add eyeglass-sassy-data
```

Then in your Sass files:

```sass
@import "sassy-data";
```

## API

- `read-file($filePath, $encoding: $sd-default-encoding)` - Read the text of a file into a Sass string
- `json-to-map($jsonAsString)` - Convert a string containing JSON into a Sass map/array
- `yaml-to-map($yamlAsString)` - Convert a string containing YAML into a Sass map/array
- `import-json($filePath, $encoding: $sd-default-encoding)` - Read a JSON file and transform the contents into a Sass map/array
- `import-yaml($filePath, $encoding: $sd-default-encoding)` - Read a YAML file and transform the contents into a Sass map/array

**Notes**

- The default encoding for all files read can be set by overriding the `$sd-default-encoding` variable; the default is set to UTF-8. This encoding can be changed on a per-file basis by passing a value for the `$encoding` parameter in the function calls
- The file paths given should be relative to the Sass file calling the function (this does **not** mean the location of the Sassy Data function definitions)

## License

MIT
