/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-03-18
 */

const Tokenizer = require('./tokenizer');
const Parser = require('./parser');
const Converter = require('./converter');

class Transpiler {
    static transpile(contents) {
        let converted = Converter.convert(Parser.parse(Tokenizer.tokenize(contents)));

        console.log(converted);
    }
}

module.exports = Transpiler;
