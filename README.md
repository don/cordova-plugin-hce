# Cordova HCE Plugin

This plugin provides Host Card Emulation (HCE) for Apache Cordova. Host-based card emulation allows a Cordova application emulate a NFC Smart Card (without using the secure element) and talk directly to the NFC reader.

This plugin provides a low-level access. The plugin receives commands as Uint8Arrays and expects responses to be Uint8Arrays. As a developer, you must implement higher level protocols based on your applications needs.

Host Card Emulation requires NFC.

## Supported Platforms
* Android (API Level 19 KitKat)

## Installing

The AID for your application must be passed as a variable when installing the plugin. 

    cordova plugin add cordova-plugin-hce --variable AID_FILTER=F222222222

# HCE

> The hce object provides functions that allow your application to emulate a smart card.

## Methods

- [hce.registerCommandCallback](hceregistercommandcallback)
- [hce.sendResponse](hcesendresponse)
- [hce.registerDeactivatedCallback](hceregisterdeactivatedcallback)

## hce.registerCommandCallback

Register to receive APDU commands from the remote device.

    hce.registerCommandCallback(onCommand);

#### Parameters
- __success__: Success callback function that is invoked when an APDU command arrives.
- __failure__: Error callback function, invoked when error occurs. [optional]


#### Description
Function `registerCommandCallback` allows your JavaScript code to handle APDU responses from the NFC reader. Commands will be sent as Uint8Array to the success callback. The success callback is long lived and may be called many times.

Responses are sent back using `hce.sendResponse`. Android recommends "...response APDUs must be sent as quickly as possible, given the fact that the user is likely holding his device over an NFC reader when this method is called." For more info see [HostApduService.processCommandApdu](http://developer.android.com/reference/android/nfc/cardemulation/HostApduService.html#processCommandApdu(byte[], android.os.Bundle)).

#### Quick Example

    hce.registerCommandCallback(onCommand);

    var onCommand = function(command) {

        var commandAsBytes = new Uint8Array(command);
        var commandAsString = hce.util.byteArrayToHexString(commandAsBytes);

        // do something with the command

        // send the response
        hce.sendReponse(commandResponse);
    }


## hce.sendResponse
Sends a response APDU back to the remote device.

    hce.sendResponse(responseApdu, success);

#### Parameters
- __responseApdu__: Response for NFC reader. Should be a Uint8Array.
- __success__: Success callback function that is invoked when an APDU command arrives.
- __failure__: Error callback function, invoked when error occurs. [optional]

#### Description
Function `sendResponse` is intended to be called from within the success handler of `hce.registerCommandCallback`. Response commands should be sent a Uint8Array.

See [HostApduService.sendResponseApdu](http://developer.android.com/reference/android/nfc/cardemulation/HostApduService.html#sendResponseApdu(byte[])).


## hce.registerDeactivatedCallback
Register to receive callback when host service is deactivated.

    hce.registerDeactivatedCallback(onDeactivated);

#### Parameters

- __success__: Success callback function that is invoked when the service is deactivated.
- __failure__: Error callback function, invoked when error occurs. [optional]

#### Description
Function `registerDeactivatedCallback` allows the plugin to be notified when the host service is deactivated. A reason code is passed to the success callback.

See [HostApduService.onDeactivated](http://developer.android.com/reference/android/nfc/cardemulation/HostApduService.html#onDeactivated(int)).

#### Quick Example

    hce.registerDeactivatedCallback(onDeactivated);

    var onDeactivated = function(reason) {
        console.log("Deactivated. Reason code = " + reason);
    }

# HCE Util

> The hce.util object provides utility function for APDU operations.

- hexStringToByteArray - convert hex string to ArrayBuffer
- byteArrayToHexString - convert ArrayBuffer to hex string
- stringToBytes - convert ascii string into ArrayBuffer
- concatenateBuffers - concatenate two ArrayBuffer together, returning a new ArrayBuffer

## Android HCE documentation

This plugin is a wrapper around the Android HCE functionality. Reference the [Android HCE documentation](http://developer.android.com/guide/topics/connectivity/nfc/hce.html) for more info.

## HCE Demo App
See the [HCE Demo application](http://github.com/don/cordova-hce-demo) for one possible use of this plugin. The HCE demo application duplicates Android's [card emulation example](http://developer.android.com/samples/CardEmulation/index.html) in Cordova and is intended to work with the Android [card reader example](http://developer.android.com/samples/CardReader/index.html).

# License

Apache 2.0
