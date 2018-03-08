// CODE QUALITY
// TODO: Check parameters (include descriptors and function returns)
// TODO: Check that all functions take in Feature|FeatureDescriptor|()=>Feature|FeatureDescriptor as appropriate
// TODO: Order if/else/else if
// TODO: Check TODO's
// TODO: this => FeatureManager
// TODO: Use getName(string|Feature|FeatureDescriptor|()=>string|Feature|FeatureDescriptor)

// FILE
// TODO: Union types for identifiers?
// TODO: Identifier functions should be able to return featurish objects
// TODO: addSource() should take any[], Feature[] or FeatureDescriptor[]
// TODO: addFeatures() should take any[]
// TODO: setFeatures should take any[] | () => any[]
// TODO: FeatureManager should be simple (no descriptors)
// TODO: FeatureManager should be simple (no descriptors) (interface, default implementation)
// TODO: Sublcass WriteableFeatureManager (requires no static functions in FeatureManager)
// TODO: Interface RemovableFeaturemanager (includes remove features)
// TODO: Interface OverrideableFeaturemanager (includes add/read overwrites)
// TODO: WriteableFeatureManager can implement Sourceable interface?
// TODO: Pass FeatureManager into each function
// TODO: Should FeatureDescriptor have .feature/.metadata?
// TODO: Can we save on if/else/if? Utility function? getFeature[s](string|Feature|FeatureDesriptor), getFeatureDescriptor[s](string|Feature|FeatureDesriptor)
// TODO: Normalize throws
// TODO: Write tests
// TODO: Throw error on unknown feature in getFeature()
// TODO: Support named FeatureManagers (FeatureManager.getFeatureManager('name'))
// TODO: Support map (not supported in es5, need to wait for es6)
// TODO: Support observables (not supported in es5, need to wait for es6) (will require async api)
// TODO: Support promises (w)ill require async api)
// TODO: Source management (addSource, removeSource, clearSources; track which features came from which sources so we can remove/freeze features which have no source?); default source is simple API add/remove

export class FeatureManager {

        private static FEATURES:any  = {};
        private static CONTEXT = {};

        // private static clearFeatures(): void {
        //         FeatureManager.FEATURES = {};
        // }

        public static addSource(name: string, source: (context: Object) => Feature[] | FeatureDescriptor[]) {
                let results = source(FeatureManager.getContext());
                FeatureManager.addFeatures(results);
        }

        /**
         * @description
         * Sets features for this FeatureManager
         * 
         * @param features the features to add
         */
        public static setFeatures(features: Feature[] | FeatureDescriptor[] | ((context: Object) => Feature[] | FeatureDescriptor[] )): void {
                if (FeatureManager.isFunction(features)) {
                        return FeatureManager.setFeatures(features(FeatureManager.getContext()));
                } else {
                        FeatureManager.removeAllFeatures();
                        FeatureManager.addFeatures(features);
                }
        }
        public static addFeatures(featureIdentifiers: Feature[] | FeatureDescriptor[] | ((context: Object) => Feature[] | FeatureDescriptor[])): void {
                if (FeatureManager.isFunction(featureIdentifiers)) {
                        return FeatureManager.addFeatures(featureIdentifiers(FeatureManager.getContext()));
                } else {
                        if (FeatureManager.isFeatureArray(featureIdentifiers) || FeatureManager.isFeatureDescriptorArray(featureIdentifiers)) {
                                featureIdentifiers.forEach((featureIdentifier: Feature | FeatureDescriptor) => FeatureManager.addFeature(featureIdentifier));
                        } else {
                                throw new Error(`Unknown feature identifer type '${typeof featureIdentifiers}'`);
                        }                        
                }
        }
        public static addFeature(feature: Feature | FeatureDescriptor | any | ((context: Object) => Feature | FeatureDescriptor), value: any=undefined, toggleCount: number=0): void {
                if (FeatureManager.isFunction(feature)) {
                        return FeatureManager.addFeature(feature(FeatureManager.getContext()));
                } else {
                        let normalizedFeature = FeatureManager.normalizeFeatureish(feature);
                        FeatureManager.FEATURES[normalizedFeature.getName()] = new FeatureDescriptor(normalizedFeature, normalizedFeature.isEnabled(), value, toggleCount);
                }
        }

        public static removeFeature(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): void {
                if (FeatureManager.isFunction(featureIdentifier)) {
                        FeatureManager.removeFeature(featureIdentifier(FeatureManager.getContext()));
                } else {
                        delete FeatureManager.FEATURES[FeatureManager.getName(featureIdentifier)];
                }
        }
        public static removeFeatures(featureIdentifiers: string[] | Feature[] | FeatureDescriptor[] | ((context: Object) => string[] | Feature[] | FeatureDescriptor[])): void {
                if (FeatureManager.isFunction(featureIdentifiers)) {
                        FeatureManager.removeFeatures(featureIdentifiers(FeatureManager.getContext()));
                } else if (FeatureManager.isStringArray(featureIdentifiers)) {
                        featureIdentifiers.forEach(FeatureManager.removeFeature);
                } else if (FeatureManager.isFeatureArray(featureIdentifiers) || FeatureManager.isFeatureDescriptorArray(featureIdentifiers)) {
                        featureIdentifiers.forEach(FeatureManager.removeFeature);
                } else {
                        throw new Error(`Unknown feature identifier type '${typeof featureIdentifiers}'`);
                }
        }
        public static removeAllFeatures(): void {
                // .forEach is not avaialble without a polyfill
                // FeatureManager.FEATURES.forEach(FeatureManager.removeFeature);

                FeatureManager.getAllFeatures().forEach(FeatureManager.removeFeature);
        }

        public static setContext(context: Object): void {
                // Do not clone (we will not get functions if we clone)
                // FeatureManager.CONTEXT = FeatureManager.clone(context);
                FeatureManager.CONTEXT = context;
        }
        public static getContext(): Object {
                // Do not clone (we will not get functions if we clone)
                // return FeatureManager.clone(FeatureManager.CONTEXT);
                return FeatureManager.CONTEXT;
        }
        
        public static getAllFeatures(): Feature[] {
                // .map is not available without a polyfil
                // return FeatureManager.FEATURES.map((featureDescriptor: FeatureDescriptor) => {
                //         // Invoke FeatureManager.getFeature for consistency
                //         return FeatureManager.getFeature(featureDescriptor.name);
                // });
                
                let features: Feature[] = [];
                Object.getOwnPropertyNames(FeatureManager.FEATURES).forEach((name: string) => {
                        features.push(FeatureManager.getFeature(name));
                });
                return features;
        }
        public static getFeature(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): Feature {
                if (FeatureManager.isFunction(featureIdentifier)) {
                        return FeatureManager.getFeature(featureIdentifier(FeatureManager.getContext()));
                } else {
                        let featureDescriptor = FeatureManager.getFeatureDescriptor(featureIdentifier);
                        return !!featureDescriptor ? featureDescriptor.getFeature() : null;
                }
        }
        public static getFeatures(featureIdentifiers: string[] | Feature[] | FeatureDescriptor[] | ((context: Object) => string[] | Feature[] | FeatureDescriptor[])): Feature[] {
                let features: Feature[] = [];

                if (FeatureManager.isStringArray(featureIdentifiers)) {
                        featureIdentifiers.forEach((featureName: string) => {
                                features.push(FeatureManager.getFeature(featureName));
                        });
                } else if (FeatureManager.isFeatureArray(featureIdentifiers) || FeatureManager.isFeatureDescriptorArray(featureIdentifiers)) {
                        featureIdentifiers.forEach((feature: Feature) => {
                                features.push(FeatureManager.getFeature(feature));
                        });
                } else if (FeatureManager.isFunction(featureIdentifiers)) {
                        return FeatureManager.getFeatures(featureIdentifiers(FeatureManager.getContext()));
                } else {
                        throw new Error(`Unknown feature identifiers type '${typeof featureIdentifiers}'`);
                }

                return features;
        }
        public static hasValue(featureIdentifier: string | Feature | FeatureDescriptor, context: Object = undefined): boolean {
                return undefined !== FeatureManager.getValue(FeatureManager.getFeature(featureIdentifier).getName(), null, context);
        }
        public static getValue(featureIdentifier: string | Feature | FeatureDescriptor, defaultValue: any = undefined, context: Object=undefined): Object {
                return FeatureManager.getFeatureDescriptor(featureIdentifier).value;
        }
        public static setValue(featureIdentifier: string | Feature | FeatureDescriptor, value: any | ((context: Object) => any)): void {
                FeatureManager.getFeatureDescriptor(featureIdentifier).value = FeatureManager.normalizeValue(value);
        }

        public static isEnabled(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), context: Object=undefined): boolean {
                return undefined !== FeatureManager.getFeatureDescriptor(featureIdentifier).enabled;
        }
        public static canEnable(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): boolean {
                return FeatureManager.canSetEnabled(featureIdentifier);
        }
        public static canDisable(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): boolean {
                return FeatureManager.canSetEnabled(featureIdentifier);
        }
        public static enable(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): void {
                return FeatureManager.setEnabled(featureIdentifier, true);
        }
        public static disable(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): void {
                return FeatureManager.setEnabled(featureIdentifier, false);
        }
        public static canSetEnabled(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), context: Object=undefined): boolean {
                let featureDescriptor = FeatureManager.getFeatureDescriptor(featureIdentifier);
                return undefined !== featureDescriptor.toggleCount && 0 !== featureDescriptor.toggleCount;
        }
        public static setEnabled(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), enabled: boolean) {
                let featureDescriptor = FeatureManager.getFeatureDescriptor(featureIdentifier);
                let feature = featureDescriptor.getFeature();
                
                if (FeatureManager.canSetEnabled(feature)) {
                        featureDescriptor.enabled = !!enabled;
                        if (featureDescriptor.toggleCount > 0) {
                                featureDescriptor.toggleCount--;
                        }
                } else {
                        throw new Error(`Cannot set enabled '${enabled}' on feature '${name}'`);
                } 
        }

        public static ifEnabled(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), enabledFunction: ((args: any[], context: Object) => any), args: any[], defaultValue: ((context: Object)=>any | any)=undefined): any {
                let featureDescriptor = FeatureManager.getFeatureDescriptor(featureIdentifier);
                if (FeatureManager.isEnabled(featureDescriptor)) {
                        return enabledFunction.call({}, args, FeatureManager.getContext());
                } else {
                        return FeatureManager.normalizeValue(defaultValue);
                }
        }
        public static ifNotEnabled(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), fn: ((args: any[], context: Object) => any), args: any[], defaultValue: ((context: Object) => any | any) = undefined): any {
                let featureDescriptor = FeatureManager.getFeatureDescriptor(featureIdentifier);
                if (!FeatureManager.isEnabled(featureDescriptor)) {
                        return fn.call({}, args, FeatureManager.getContext());
                } else {
                        return FeatureManager.normalizeValue(defaultValue);
                }
        }

        public static createFeature(name: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), enabled: boolean | ((context: Object) => boolean)): Feature {
                let featureEnabled = !!FeatureManager.normalizeValue(enabled);
                
                if (FeatureManager.isFunction(name)) {
                        return FeatureManager.createFeature(name(FeatureManager.getContext()), enabled);
                }

                return new Feature(FeatureManager.getName(name), featureEnabled);
        }


        
        private static normalizeFeatureish(featureish: any): Feature {
                if (FeatureManager.isFeature(featureish)) {
                        return featureish;
                } else if (FeatureManager.isFeatureDescriptor(featureish)) {
                        return featureish.getFeature();
                } else if (FeatureManager.isFeatureish(featureish)) {
                        return FeatureManager.createFeature(featureish.name, featureish.enabled);
                } else {
                        throw new Error(`Not able to normalize to a feature '${featureish}'`);
                }
        }
        private static normalizeValue(value: ((context: Object) => Object) | any) {
                return FeatureManager.isFunction(value) ? value(FeatureManager.getContext()) : value;
        }

        private static getFeatureDescriptor(featureDescriptorIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): FeatureDescriptor {
                if (FeatureManager.isFunction(featureDescriptorIdentifier)) {
                        return FeatureManager.getFeatureDescriptor(featureDescriptorIdentifier(FeatureManager.getContext()));
                } else {
                        let featureDescriptor = FeatureManager.FEATURES[FeatureManager.getName(featureDescriptorIdentifier)];
                        if (FeatureManager.isFunction((<any>FeatureManager.getContext()).getFeatureDescriptor)) {
                                // If the FeatureManager's context has a function called 'getFeatureDescriptor', then invoke that with a clone of the FeatureDescriptor
                                return (<any>FeatureManager.getContext()).getFeatureDescriptor(FeatureManager.clone(featureDescriptor), FeatureManager.clone(FeatureManager.getContext()));
                        } else {
                                return featureDescriptor;
                        }
                }
        }

        private static getName(nameIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): string {
                if (FeatureManager.isFunction(nameIdentifier)) {
                        return FeatureManager.getName(nameIdentifier(FeatureManager.getContext()));
                } else if (FeatureManager.isString(nameIdentifier)) {
                        return nameIdentifier;
                } else if (FeatureManager.isFeature(nameIdentifier)) {
                        return nameIdentifier.getName();
                } else if (FeatureManager.isFeatureDescriptor(nameIdentifier)) {
                        return nameIdentifier.name;
                } else {
                        throw new Error(`Unknown feature name identifer '${nameIdentifier}'`);
                }
        }


        private static isStringArray(value: any): value is string[] {
                return value instanceof Array ? value.every(FeatureManager.isString) : false;
        }

        private static isFeatureArray(value: any): value is Feature[] {
                return value instanceof Array ? value.every(FeatureManager.isFeature) : false;
        }

        private static isFeatureDescriptorArray(value: any): value is Feature[] {
                return value instanceof Array ? value.every(FeatureManager.isFeatureDescriptor) : false;
        }

        private static isFeature(value: any): value is Feature {
                return value instanceof Feature;
        }

        private static isFeatureish(value: any): value is Featureish {
                return value.name && value.enabled;
        }

        private static isFeatureDescriptor(value: any): value is FeatureDescriptor {
                return value instanceof FeatureDescriptor;
        }

        private static isFunction(value: any): value is Function {
                return 'function' === typeof value;
        }

        private static isString(descriptor: any): descriptor is String {
                return 'string' === typeof descriptor;
        }

        private static clone<T>(target: T): T {
                return JSON.parse(JSON.stringify(target));
        }

}

export class Feature {

        // For non-module instantiation
        // if(!(this instanceof Feature)) {
        //         return new Feature(name, enabled);
        // }

        constructor(private name: string, private enabled: boolean = true) {

        }

        public getName(): string {
                return this.name;
        }

        public isEnabled(): boolean {
                return this.enabled;
        }

}

export class FeatureDescriptor {
        public name: string;

        constructor(private feature: Feature, public enabled: boolean = undefined, public value: any = undefined, public toggleCount: number=0) {
                this.name = feature.getName();
                if (undefined === enabled) {
                        enabled = !!feature.isEnabled();
                }
        }

        public getFeature(): Feature {
                return new Feature(this.name, this.enabled);
        }

}

class Featureish {
        constructor(public name: string, public enabled: boolean) { }
}