# Intercom for NativeScript

This is a plugin that allows your NativeScript app to use [Intercom for iOS](https://github.com/intercom/intercom-ios) and/or [Intercom for Android](https://github.com/intercom/intercom-android).

## Installation

To install the plugin in your NativeScript app, run the following:
```script
ns plugin add emvenci/nativescript-intercom-bridge#ebs/master
```
or
```script
npm i emvenci/nativescript-intercom-bridge#ebs/master --save
```

## To use
1. Prepare your Intercom APP key, [checkout the installation section of settings page.](https://www.intercom.com/help/en/articles/3539-where-can-i-find-my-workspace-id-app-id).
2. Import `nativescript-intercom-bridge-ebs` into your component / service (recommend)

```typescript
import { IntercomBridge } from 'nativescript-intercom-bridge-ebs';

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

/**
 * 
 * Log event of user's behavior in the Intercom.
 * 
 * eventName: Recommend defined the event name as 'verb-noun'
 * metaData: Object consists of event's information, i.e. order_item, order_date.
 * More info: https://developers.intercom.com/intercom-api-reference/reference#event-model
 */
logEvent(eventName: string, metaData?: any) {
    IntercomBridge.logEvent(eventName, metaData);
}


```

## License

nativescript-intercom-bridge-ebs is released under the [MIT License](http://www.opensource.org/licenses/MIT).
