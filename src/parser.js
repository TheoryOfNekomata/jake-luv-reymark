/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-03-19
 */

class Parser {
    static parse(tokens) {
        let tree = {};

        tokens = tokens
            .map(token => token.trim())
            .filter(token => token.length > 0 && token[0] != "'");

        while (tokens.length > 0) {
            currentToken = tokens.shift();
        }

        tokens.forEach(token => {

        });
    }
}
