const assert = require('assert')
const {format} = require("../dist/format");

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

describe('format', function () {
    it('should return proper object', function () {
        const line = '2021-08-09T02:12:51.259Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Cannot find user orders list","code": 404,"err":"Not found"}'

        const result = format('error', line)

        assert.deepEqual(result.code, 404)
    });

    it('should fail', function () {
        const line = ''

        const result = format('info', line)

        assert.deepEqual(result, null)
    });
});
