var mod = require('./modules/mod_hello');
var markdown = require('markdown').markdown;

mod.hello();
mod.bye();

console.log(markdown.toHTML('Un paragraphe en **MARKDOWN**'));