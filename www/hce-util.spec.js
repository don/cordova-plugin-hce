// Mocha Tests

// Cordova HCE Plugin
// (c) 2015 Don Coleman

var assert = require('assert');
var util = require('./hce-util');

describe('HCE Util', function () {

    it('should convert hex strings to byte arrays', function () {
        var test = util.hexStringToByteArray('656667');
        var expected = new Uint8Array([0x65, 0x66, 0x67]);
        assert.equal(expected.toString(), test.toString());
    });

    it('should convert byte arrays to hex strings', function () {
        var data = new Uint8Array([0x65, 0x66, 0x67]);
        assert.equal('656667', util.byteArrayToHexString(data));
    });

    it('should convert strings to byte arrays', function () {
        var test = util.stringToBytes('hello');
        var expected = new Uint8Array([104, 101, 108, 108, 111]);
        assert.equal(expected.toString(), test.toString());

    });

    it('should combine buffers', function () {
        var a = new Uint8Array([63, 64]);
        var b = new Uint8Array([65, 66]);

        var expected = new Uint8Array([63,64,65,66]).toString();

        var test = util.concatenateBuffers(a, b);
        assert.equal(expected, new Uint8Array(test).toString());

        var test2 = util.concatenateBuffers(a.buffer, b.buffer);
        assert.equal(expected, new Uint8Array(test2).toString());

        var test3 = util.concatenateBuffers(a.buffer, b);
        assert.equal(expected, new Uint8Array(test2).toString());
    });

});
