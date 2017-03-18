/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-03-18
 */

const Transpiler = require('./../src/index'),
    fs = require('fs'),

    files = [
        'tests/hello-world.vb'
    ];

describe('Language', () => {
    it('should be able to transpile to ES5', (done) => {
        fs.readFile(files[0], (err, contents) => {
            let transpileFn = () => Transpiler.transpile(contents.toString());

            if (err) {
                done.fail('Cannot read input file.');
            }

            expect(transpileFn).not.toThrow();

            done();
        });
    });
});
