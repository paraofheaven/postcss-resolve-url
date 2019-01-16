'use strict';

var path = require('path'),
  postcss = require('postcss');
/**
 * Plugin for postcss that follows SASS transpilation.
 */
function postcssPlugin() {
  return function (styles) {
    styles.walkDecls(eachDeclaration)
  }
};

/**
 * Process a declaration from the syntax tree.
 * @param declaration
 */
function eachDeclaration(declaration) {
  var isValid = declaration.value && (declaration.value.indexOf('url') >= 0);
  if (isValid) {

    // reverse the original source-map to find the original source file before transpilation
    var startPosApparent = declaration.source.start,
      startPosOriginal = params.sourceMapConsumer &&
      params.sourceMapConsumer.originalPositionFor(startPosApparent);

    // we require a valid directory for the specified file
    var directory =
      startPosOriginal &&
      startPosOriginal.source &&
      fileProtocol.remove(path.dirname(startPosOriginal.source));
    if (directory) {
      declaration.value = params.transformDeclaration(declaration.value, directory);
    }
    // source-map present but invalid entry
    else if (params.sourceMapConsumer) {
      throw new Error('source-map information is not available at url() declaration');
    }
  }
}

module.exports = postcss.plugin('postcss-resolve-url', postcssPlugin)