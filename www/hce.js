// Cordova HCE Plugin
// (c) 2015 Don Coleman

module.exports = {

    // Register to receive APDU commands from the remote device.
    // Commands will be sent as Uint8Array to the success callback. The success
    // callback is long lived and may be called many times.
    // Responses to commands should be sent using hce.sendResponse()
    //
    // http://developer.android.com/reference/android/nfc/cardemulation/HostApduService.html#processCommandApdu(byte[], android.os.Bundle)
    registerCommandCallback: function(success, failure) {
        cordova.exec(success, failure, 'HCE', 'registerCommandCallback', []);
    },

    // Send a response to the APDU Command
    // responseApdu should be a Uint8Array
    // http://developer.android.com/reference/android/nfc/cardemulation/HostApduService.html#sendResponseApdu(byte[])
    sendResponse: function(responseApdu, success, failure) {
        cordova.exec(success, failure, 'HCE', 'sendResponse', [responseApdu]);
    },

    // Register to receive callback when host service is deactivated.
    // http://developer.android.com/reference/android/nfc/cardemulation/HostApduService.html#onDeactivated(int)
    registerDeactivatedCallback: function(success, failure) {
        cordova.exec(success, failure, 'HCE', 'registerDeactivatedCallback', []);
    }

};
