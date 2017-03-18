/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-03-18
 */

const CharacterType = require('./ctype');

function isInDelimitedState(state) {
    return delimitedStates.indexOf(state) > -1;
}

function getLexerState(lookahead, states) {
    let topMostState;

    if (states.length < 1) {
        states.push(topMostState = LexerState.NORMAL);
        return topMostState;
    }

    topMostState = states[states.length - 1];

    if (CharacterType.isCommentStartDelimiter(lookahead) && topMostState === LexerState.NORMAL) {
        states.push(topMostState = LexerState.COMMENT);
        return topMostState;
    }

    if (CharacterType.isCommentEndDelimiter(lookahead) && topMostState === LexerState.COMMENT) {
        states.pop();
        return states[states.length - 1];
    }

    if (CharacterType.isDoubleQuoteStringDelimiter(lookahead)) {
        if (topMostState === LexerState.DQUOTE_STRING) {
            states.pop();
            return states[states.length - 1];
        }
        if (topMostState === LexerState.NORMAL) {
            states.push(topMostState = LexerState.DQUOTE_STRING);
        }
    }

    return topMostState;
}

function getLexerType(c) {
    let lexerType = LexerTypes.UNKNOWN;

    Object
        .keys(LexerTypeConditions)
        .forEach(type => {
            if (LexerTypeConditions[type](c)) {
                lexerType |= LexerTypes[type];
            }
        });

    return lexerType;
}

const LexerTypes = {
    UNKNOWN: 0x0,
    LETTER: 0x1,
    DIGIT: 0x2,
    WORD: 0x3,
    DELIMITER: 0x4,
    WHITESPACE: 0x8,
    SYMBOL: 0x10
};

const LexerTypeConditions = {
    LETTER: CharacterType.isLetter,
    DIGIT: CharacterType.isNumber,
    DELIMITER: CharacterType.isDelimiter,
    WHITESPACE: CharacterType.isWhitespace,
    SYMBOL: CharacterType.isSymbol
};

const LexerState = {
    INIT: 0x0,
    NORMAL: 0x1,
    DQUOTE_STRING: 0x2,
    COMMENT: 0x3
};

const delimitedStates = [LexerState.DQUOTE_STRING, LexerState.COMMENT];

class Tokenizer {
    static tokenize(input) {
        let tokens = [],
            states = [],
            currentState = LexerState.INIT,
            lookaheadState,
            currentToken;

        Array
            .from(input)
            .forEach(lookahead => {
                lookaheadState = getLexerState(lookahead, states);

                if (typeof currentToken === 'undefined' || lookaheadState !== currentState) {
                    if (typeof currentToken === 'string' && currentToken.length > 0) {
                        if (currentState !== lookaheadState && isInDelimitedState(currentState)) {
                            currentToken += lookahead;
                        }
                        tokens.push(currentToken);
                    }

                    currentToken = '';
                    if (isInDelimitedState(currentState)) {
                        currentState = lookaheadState;
                        return;
                    }
                }

                switch (lookaheadState) {
                    case LexerState.NORMAL:
                        if (currentToken.length > 0 && (
                            getLexerType(lookahead) === LexerTypes.DELIMITER ||
                            getLexerType(lookahead) != getLexerType(currentToken[currentToken.length - 1])
                        )) {
                            if (typeof currentToken === 'string' && currentToken.length > 0) {
                                tokens.push(currentToken);
                            }
                            currentToken = '';
                        }
                        break;
                }

                currentToken += lookahead;
                currentState = lookaheadState;
            });

        return tokens;
    }
}

module.exports = Tokenizer;
