// Cordova HCE Plugin
// (c) 2015 Don Coleman

function hexStringToByteArray(hexString) {
    var a = new Uint8Array(hexString.length/2);
    // split into chunks of 2
    if (hexString.length % 2 == 1) {
        throw('Hex string must have even number of characters');
    }

    for (var i = 0; i < hexString.length; i += 2) {
        a[i/2] = parseInt(hexString.substring(i, i+2), 16);
    }

    return a;
}

// expecting Uint8Array or ArrayBuffer as input
function byteArrayToHexString(a) {
    var s = '';

    if (a instanceof ArrayBuffer) {
        a = new Uint8Array(a);
    }

    if (!(a instanceof Uint8Array)) {
        console.log('Expecting Uint8Array. Got ' + a);
        return s;
    }

    a.forEach(function(i) {
        s += toHex(i);
    });
    return s;
}

// one byte unsigned int to padded hex string
function toHex(i) {
    if (i < 0 || i > 255) {
      throw('Input must be between 0 and 255. Got ' + i + '.');
    }

    return ('00' + i.toString(16)).substr(-2);
}

// borrowed phonegap-nfc
function stringToBytes(string) {
    // based on http://ciaranj.blogspot.fr/2007/11/utf8-characters-encoding-in-javascript.html

    var bytes = [];

    for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {

            bytes[bytes.length]= c;

        } else if((c > 127) && (c < 2048)) {

            bytes[bytes.length] = (c >> 6) | 192;
            bytes[bytes.length] = (c & 63) | 128;

        } else {

            bytes[bytes.length] = (c >> 12) | 224;
            bytes[bytes.length] = ((c >> 6) & 63) | 128;
            bytes[bytes.length] = (c & 63) | 128;

        }

    }

    return new Uint8Array(bytes);
}

// https://gist.github.com/72lions/4528834
/**
 * Creates a new Uint8Array based on two different ArrayBuffers
 *
 * @private
 * @param {ArrayBuffers} buffer1 The first buffer.
 * @param {ArrayBuffers} buffer2 The second buffer.
 * @return {ArrayBuffers} The new ArrayBuffer created out of the two.
 */
var _appendBuffer = function(buffer1, buffer2) {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
};

module.exports = {
  hexStringToByteArray: hexStringToByteArray,
  byteArrayToHexString: byteArrayToHexString,
  stringToBytes: stringToBytes,
  concatenateBuffers: _appendBuffer
};
