/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-03-19
 */

class CharacterType {
    static isDelimiter(c) {
        return c.search(/[\(\)\{\}\[\]]/) > -1;
    }
    
    static isCommentStartDelimiter(c) {
        return c === "'";
    }
    
    static isCommentEndDelimiter(c) {
        return c === '\n';
    }
    
    static isDoubleQuoteStringDelimiter(c) {
        return c === '"';
    }
    
    static isLetter(c) {
        return c.search(/[A-Za-z]/) > -1;
    }
    
    static isNumber(c) {
        return c.search(/\d/) > -1;
    }
    
    static isWhitespace(c) {
        return c.search(/\s/) > -1;
    }
    
    static isSymbol(c) {
        return !(CharacterType.isWhitespace(c) ||
            CharacterType.isLetter(c) ||
            CharacterType.isNumber(c) ||
            CharacterType.isDelimiter(c)
        );
    }
}

module.exports = CharacterType;
