export declare class IntercomBridge {
    static init(apiKey: string, appId: string): void;
    static registerIdentifiedUser(options: {
        userId?: string | number;
        email?: string;
    }): void;
    static registerUnidentifiedUser(): void;
    /**
    *
    * **Deprecate** [Intercom reset] in favour of [Intercom logout]
    * https://github.com/intercom/intercom-ios/blob/master/CHANGELOG.md#410-2017-10-06
    * https://github.com/intercom/intercom-android/blob/master/CHANGELOG.md#version-410
    * 
    * @static
    * @memberof IntercomBridge
    */
    static reset(): void;
    static logout(): void;
    static setUserHash(hmac: string): void;
    static updateUser(attributes: any): void;
    /**
    * 
    * Log events of user's behavior in the Intercom.
    * 
    * eventName: Recommend defined the event name as 'verb-noun'
    * metaData: Object consists of event's information, i.e. order_item, order_date.
    * More info: https://developers.intercom.com/intercom-api-reference/reference#event-model
    * 
    * @static
    * @memberof IntercomBridge
    */
    static logEvent(eventName: string, metaData?: any): void;
    static displayMessenger(): void;
    static displayMessageComposer(initialMessage?: string): void;
    static displayConversationsList(): void;
    static unreadConversationCount(): any;
    static setLauncherVisibility(visible: boolean): void;
    static setInAppMessageVisibility(visible: boolean): void;
    static hideMessenger(): void;
    static enableLogging(): void;
}
