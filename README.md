# Intercom for NativeScript

This is a plugin that allows your NativeScript app to use [Intercom for iOS](https://github.com/intercom/intercom-ios) and/or [Intercom for Android](https://github.com/intercom/intercom-android).
Forked from [narusevic's nativescript-intercom-bridge-update](https://github.com/narusevic/nativescript-intercom-bridge), originally developed by [Emre](https://github.com/aemr3/nativescript-intercom-bridge).

* Intercom for iOS supports iOS 10+.
* Intercom for Android supports API 15 and above.

## Generate tgz file

To generate a tgz file that can be used by other NS project
```script
npm build
```
```script
npm pack
```

## Installation

To install the plugin in your NativeScript app, run the following:
```script
tns plugin add ./{your-local-folder}/nativescript-intercom-bridge-xrex
```

## To use
1. Prepare your Intercom APP key, [checkout the installation section of settings page.](https://www.intercom.com/help/en/articles/3539-where-can-i-find-my-workspace-id-app-id).
2. Import `nativescript-intercom-bridge-xrex` into your component / service (recommend)

```typescript
import { IntercomBridge } from 'nativescript-intercom-bridge-xrex';

...

ngOninit() {
    
    this.initIntercom()
    
    // Display the native Launcher button.
    IntercomBridge.setLauncherVisibility(true);
}

initIntercom() {
    let SDKKey = isIOS ? environment.iosSDKKey : environment.androidSDKKey;
    
    // Intercom App Id
    let appID = environment.intercomAPPId;
    
    IntercomBridge.init(SDKKey, appID);
    IntercomBridge.enableLogging();
}

handleUserLogin(userId, email, userInfo) {

    // After register, Intercom start to recognize user in the current conversation, only accept id and email.
    IntercomBridge.registerIdentifiedUser({ userId, email });

    // If you want to update user's information after registeration, use updateUser.
    this.updateUser(userInfo)
}

/**
 * 
 * userInfo: {name: string, phone_name: string, [custom_field]: any}
 * more info abt userInfo: https://www.intercom.com/help/en/articles/320-tracking-user-data-in-intercom
*/
updateUser(userInfo) {
    IntercomBridge.updateUser(userInfo);
}


// logout then login as annoymous.
handleUserLogout() {
    IntercomBridge.logout();
    IntercomBridge.registerAnnoymous();
}

// Use displayMessenger while implementing customize launcher button.
displayMessenger() {
    IntercomBridge.displayMessenger();
}


/**
 * 
 * If the identify verification is turned on, you should call setUserHash before registeration. hash is the digest of id or email of user.
 * More info: https://www.intercom.com/help/en/articles/183-enable-identity-verification-for-web-and-mobile 
 */
setUserHash(hash: string) {
    IntercomBridge.setUserHash(hash);
}


```

## License

nativescript-intercom-bridge-xrex is released under the [MIT License](http://www.opensource.org/licenses/MIT).
