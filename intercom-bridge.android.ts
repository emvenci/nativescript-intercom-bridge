import * as utils from '@nativescript/core/utils';

declare let io: any;

export class IntercomBridge {
  public static intercomPushClient = new io.intercom.android.sdk.push.IntercomPushClient();
  static init(apiKey: string, appId: string) {
    io.intercom.android.sdk.Intercom.initialize(utils.ad.getApplicationContext(), apiKey, appId);
  }

  static registerIdentifiedUser(options: {userId?: string|number, email?: string}) {
    if (typeof options.userId == 'number') {
      options.userId = String(options.userId);
    }

    let registration = io.intercom.android.sdk.identity.Registration.create();

    if (options.userId && options.userId.length > 0) {
      registration.withUserId(options.userId);
    }

    if (options.email && options.email.length > 0) {
      registration.withEmail(options.email);
    }

    io.intercom.android.sdk.Intercom.client().registerIdentifiedUser(registration);
  }

  static registerUnidentifiedUser() {
    io.intercom.android.sdk.Intercom.client().registerUnidentifiedUser();
  }

  static reset() {
    io.intercom.android.sdk.Intercom.client().reset();
  }

  static logout() {
    io.intercom.android.sdk.Intercom.client().logout();
  }

  static setUserHash(hmac: string) {
    io.intercom.android.sdk.Intercom.client().setUserHash(hmac);
  }

  static updateUser(attributes: any) {
    const Att = io.intercom.android.sdk.UserAttributes;
    const builder = new Att.Builder();

    Object.keys(attributes).forEach(key => {
        if(key === 'customAttributes') {
          return;
        }
        const methodName = key && typeof(key) === 'string' && `with${key.charAt(0).toUpperCase()}${key.slice(1)}`
        const value = attributes[key];
        if(!methodName || !builder[methodName]) {
            return;
        }
        builder[methodName](value);
    });

    if(attributes && typeof attributes === 'object' && attributes.hasOwnProperty('customAttributes')) {
      Object.keys(attributes.customAttributes).forEach(key => {
        builder.withCustomAttribute(key, attributes.customAttributes[key]);
      });
    }
    io.intercom.android.sdk.Intercom.client().updateUser(builder.build());

  }

  static logEvent(eventName: string, metaData?: any) {
    if (!!metaData) {
        io.intercom.android.sdk.Intercom.client().logEvent(eventName, metaData);
    } else {
        io.intercom.android.sdk.Intercom.client().logEvent(eventName);
    }
  }

  static displayMessenger() {
    io.intercom.android.sdk.Intercom.client().displayMessenger();
  }

  static displayMessageComposer(initialMessage?: string) {
    if(!!initialMessage) {
      io.intercom.android.sdk.Intercom.client().displayMessageComposer(initialMessage);
    } else {
      io.intercom.android.sdk.Intercom.client().displayMessageComposer();
    }
  }

  static displayConversationsList() {
    io.intercom.android.sdk.Intercom.client().displayConversationsList();
  }

  static unreadConversationCount() {
    return io.intercom.android.sdk.Intercom.client().getUnreadConversationCount();
  }

  static setLauncherVisibility(visible: boolean) {
    io.intercom.android.sdk.Intercom.client().setLauncherVisibility(visible ? io.intercom.android.sdk.Intercom.VISIBLE : io.intercom.android.sdk.Intercom.GONE);
  }

  static setInAppMessageVisibility(visible: boolean) {
    io.intercom.android.sdk.Intercom.client().setInAppMessageVisibility(visible ? io.intercom.android.sdk.Intercom.VISIBLE : io.intercom.android.sdk.Intercom.GONE);
  }

  static hideMessenger() {
    io.intercom.android.sdk.Intercom.client().hideMessenger();
  }

  static enableLogging() {
    io.intercom.android.sdk.Intercom.setLogLevel(io.intercom.android.sdk.Intercom.LogLevel.DEBUG);
  }
}
