export declare class FeatureManager {
    private static FEATURES;
    private static CONTEXT;
    static addSource(name: string, source: (context: Object) => Feature[] | FeatureDescriptor[]): void;
    /**
     * @description
     * Sets features for this FeatureManager
     *
     * @param features the features to add
     */
    static setFeatures(features: Feature[] | FeatureDescriptor[] | ((context: Object) => Feature[] | FeatureDescriptor[])): void;
    static addFeatures(featureIdentifiers: Feature[] | FeatureDescriptor[] | ((context: Object) => Feature[] | FeatureDescriptor[])): void;
    static addFeature(feature: Feature | FeatureDescriptor | any | ((context: Object) => Feature | FeatureDescriptor), value?: any, toggleCount?: number): void;
    static removeFeature(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): void;
    static removeFeatures(featureIdentifiers: string[] | Feature[] | FeatureDescriptor[] | ((context: Object) => string[] | Feature[] | FeatureDescriptor[])): void;
    static removeAllFeatures(): void;
    static setContext(context: Object): void;
    static getContext(): Object;
    static getAllFeatures(): Feature[];
    static getFeature(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): Feature;
    static getFeatures(featureIdentifiers: string[] | Feature[] | FeatureDescriptor[] | ((context: Object) => string[] | Feature[] | FeatureDescriptor[])): Feature[];
    static hasFeature(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): boolean;
    static hasValue(featureIdentifier: string | Feature | FeatureDescriptor, context?: Object): boolean;
    static getValue(featureIdentifier: string | Feature | FeatureDescriptor, defaultValue?: any, context?: Object): Object;
    static setValue(featureIdentifier: string | Feature | FeatureDescriptor, value: any | ((context: Object) => any)): void;
    static isEnabled(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), context?: Object): boolean;
    static isDisabled(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), context?: Object): boolean;
    static canEnable(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): boolean;
    static canDisable(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): boolean;
    static enable(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): void;
    static disable(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): void;
    static canSetEnabled(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), context?: Object): boolean;
    static setEnabled(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), enabled: boolean): void;
    static ifEnabled(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), enabledFunction: ((args: any[], context: Object) => any), args?: any[], defaultValue?: any | ((context: Object) => any)): any;
    static ifDisabled(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), fn: ((args: any[], context: Object) => any), args?: any[], defaultValue?: ((context: Object) => any | any)): any;
    static createFeature(name: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), enabled: boolean | ((context: Object) => boolean)): Feature;
    private static normalizeFeatureish(featureish);
    private static normalizeValue(value);
    private static getFeatureDescriptor(featureDescriptorIdentifier);
    private static getName(nameIdentifier);
    private static isStringArray(value);
    private static isFeatureArray(value);
    private static isFeatureDescriptorArray(value);
    private static isFeature(value);
    private static isFeatureish(value);
    private static isFeatureDescriptor(value);
    private static isFunction(value);
    private static isString(descriptor);
    private static clone<T>(target);
}
export declare class Feature {
    private name;
    private enabled;
    constructor(name: string, enabled?: boolean);
    getName(): string;
    isEnabled(): boolean;
}
export declare class FeatureDescriptor {
    private feature;
    enabled: boolean;
    value: any;
    toggleCount: number;
    name: string;
    constructor(feature: Feature, enabled?: boolean, value?: any, toggleCount?: number);
    getFeature(): Feature;
}
