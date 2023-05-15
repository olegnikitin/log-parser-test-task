const assert = require('assert')
const fs = require('fs/promises')
const { Parser } = require('../parser-logic')

describe('Parser', function () {
    it('should read and write to some destination', async function () {
        const givenLocation = './errors.json'
        const givenLevel = 'error'

        //when
        await new Parser().parse('./app.log', givenLocation, givenLevel)

        //then
        const result = await fs.readFile(givenLocation, {encoding: "utf8"})
        const parsedResult = JSON.parse(result)
        parsedResult.forEach(it => {
            assert.deepStrictEqual(it.loglevel, givenLevel)
        })
    });

    it('should fail safely if location of logs is wrong', async function () {
        const givenWrongLocation = './app1.log'
        const givenLocation = './errors.json'
        const givenLevel = 'error'

        try {
            //when
            await new Parser().parse(givenWrongLocation, givenLocation, givenLevel)
            assert.fail()
        } catch (e) {
            //then
            assert.ok(e)
        }
    });
});
