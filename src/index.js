/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-03-18
 */

const Lexer = require('./lexer');

class Transpiler {
    static transpile(contents) {
        let tokens = Lexer.tokenize(contents);
        console.log(tokens);
    }
}

module.exports = Transpiler;
