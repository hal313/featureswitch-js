// CODE QUALITY
// TODO: Check parameters (include descriptors and function returns)
// TODO: Check that all functions take in string|Feature|FeatureDescriptor|Featureish|()=>string|Feature|FeatureDescriptor|Featureish as appropriate [consider union type]
// TODO: Order if/else/else if
// TODO: Use getName(string|Feature|FeatureDescriptor|()=>string|Feature|FeatureDescriptor)
// TODO: Support "any" (addFeatures)
// TODO: Support "any" (addFeature)
// TODO: Support "any" (removeFeatures)
// TODO: Support "any" (removeFeature)
// TODO: Support "any" (getFeatures)
// TODO: Support "any" (getFeature)
// TODO: Support "any" (hasFeature)
// TODO: Support "any" (hasValue)
// TODO: Support "any" (getValue)
// TODO: Support "any" (setValue)
// TODO: Support "any" (isEnabled)
// TODO: Support "any" (isDisabled)
// TODO: Support "any" (canEnable)
// TODO: Support "any" (canDisable)
// TODO: Support "any" (enable)
// TODO: Support "any" (disable)
// TODO: Support "any" (canSetEnabled)
// TODO: Support "any" (setEnabled)
// TODO: Support "any" (ifEnabled)
// TODO: Support "any" (ifDisabled)
// TODO: Support "any" (createFeature)

// FILE
// TODO: Add toggle functionality
// TODO: Metadata for descriptor
// TODO: Union types for identifiers?
// TODO: Source management (addSource, removeSource, clearSources; track which features came from which sources so we can remove/freeze features which have no source?); default source is simple API add/remove
// TODO: Identifier functions should be able to return featurish objects
// TODO: Support named FeatureManagers (FeatureManager.getFeatureManager('name'))? Registry?
// TODO: Executor
// TODO: FeatureManager should be simple (no descriptors)
// TODO: FeatureManager should be simple (no descriptors) (interface, default implementation)
// TODO: Sublcass WriteableFeatureManager (requires no static functions in FeatureManager)
// TODO: Interface RemovableFeaturemanager (includes remove features)
// TODO: Interface OverrideableFeaturemanager (includes add/read overwrites)
// TODO: WriteableFeatureManager can implement Sourceable interface?
// TODO: Can we save on if/else/if? Utility function? getFeature[s](string|Feature|FeatureDesriptor), getFeatureDescriptor[s](string|Feature|FeatureDesriptor)
// TODO: Normalize throws
// TODO: Throw error on unknown feature in getFeature()
// TODO: Support map (not supported in es5, need to wait for es6)
// TODO: Support observables (not supported in es5, need to wait for es6) (will require async api)
// TODO: Support promises (w)ill require async api)

export class FeatureManager {

        private features:any  = {};
        private context = {};
        private featureDecriptorDecorator: (featureDescriptor: FeatureDescriptor, context: Object) => FeatureDescriptor;

        public addSource(name: string, source: (context: Object) => Feature[] | FeatureDescriptor[]) {
                let results = this.normalizeValue(source);
                this.addFeatures(results);
        }

        /**
         * @description
         * Sets features for this FeatureManager
         * 
         * @param features the features to add
         */
        public setFeatures(features: Feature[] | FeatureDescriptor[] | ((context: Object) => Feature[] | FeatureDescriptor[] )): void {
                this.removeAllFeatures();
                this.addFeatures(this.normalizeValue(features));
        }

        public addFeatures(featureIdentifiers: Feature[] | FeatureDescriptor[] | ((context: Object) => Feature[] | FeatureDescriptor[])): void {
                (this.asFeatureArray(featureIdentifiers)).forEach((featureIdentifier: Feature | FeatureDescriptor) => this.addFeature(featureIdentifier));
        }

        public addFeature(featureIdentifier: Feature | FeatureDescriptor | any | ((context: Object) => Feature | FeatureDescriptor)): void {
                let normalizedFeature = this.normalizeFeatureish(this.normalizeValue(featureIdentifier));
                this.features[normalizedFeature.name] = normalizedFeature;
        }

        public removeFeatures(featureIdentifiers: string[] | Feature[] | FeatureDescriptor[] | ((context: Object) => string[] | Feature[] | FeatureDescriptor[])): void {
                (this.asFeatureArray(featureIdentifiers)).forEach(this.removeFeature.bind(this));
        }

        public removeFeature(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): void {
                featureIdentifier = this.normalizeValue(featureIdentifier);
                        
                let name = this.getName(featureIdentifier);
                if (!!name) {
                        delete this.features[name];
                }
        }
        public removeAllFeatures(): void {
                // .forEach is not avaialble without a polyfill
                // this.features.forEach(this.removeFeature);
                this.getAllFeatures().forEach(this.removeFeature.bind(this));
        }

        public setContext(context: Object): void {
                Object.getOwnPropertyNames(context).forEach((name: string) => {
                        if (FeatureManager.isFunction((<any>context)[name])) {
                                throw new Error(`Context cannot contain a function ('${name}')`);
                        }
                });

                this.context = FeatureManager.clone(context);
        }
        public getContext(): Object {
                return FeatureManager.clone(this.context);
        }
        
        public getAllFeatures(): Feature[] {
                // .map is not available without a polyfill
                // return this.features.map(this.getFeature(featureDescriptor.name));
                
                let features: Feature[] = [];
                Object.getOwnPropertyNames(this.features).forEach((name: string) => {
                        features.push(this.getFeature(name));
                });
                return features;
        }
        public getFeature(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): Feature {
                let featureDescriptor = this.getFeatureDescriptor(this.normalizeValue(featureIdentifier));
                return !!featureDescriptor ? featureDescriptor.getFeature() : null;
        }
        public getFeatures(featureIdentifiers: string[] | Feature[] | FeatureDescriptor[] | ((context: Object) => string[] | Feature[] | FeatureDescriptor[])): Feature[] {
                let features: Feature[] = [];

                (this.asFeatureArray(featureIdentifiers)).forEach((featureIdentifier: string | Feature | FeatureDescriptor) => {
                        let feature = this.getFeature(featureIdentifier);
                        if (!!feature) {
                                features.push(feature);
                        }
                });

                return features;
        }
        public hasFeature(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): boolean {
                return !!this.getFeatureDescriptor(featureIdentifier);
        }

        public hasValue(featureIdentifier: string | Feature | FeatureDescriptor, context: Object = undefined): boolean {
                let value = this.getValue(this.getFeature(featureIdentifier).getName(), undefined, context);
                return undefined !== value && null !== value;
        }
        public getValue(featureIdentifier: string | Feature | FeatureDescriptor, defaultValue: any = undefined, context: Object=undefined): Object {
                let featureDescriptor = this.getFeatureDescriptor(featureIdentifier);
                return undefined !== featureDescriptor ? featureDescriptor.value : null;
        }
        public setValue(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), value: any | ((context: Object) => any)): void {
                this.getFeatureDescriptor(featureIdentifier).value = this.normalizeValue(value);
        }

        public isEnabled(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): boolean {
                let featureDescriptor = this.getFeatureDescriptor(featureIdentifier);
                return undefined !== featureDescriptor ? !!featureDescriptor.enabled : false;
        }
        public isDisabled(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): boolean {
                return !this.isEnabled(featureIdentifier);
        }

        public canEnable(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): boolean {
                return this.canSetEnabled(featureIdentifier);
        }
        public canDisable(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): boolean {
                return this.canSetEnabled(featureIdentifier);
        }
        public enable(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): void {
                return this.setEnabled(featureIdentifier, true);
        }
        public disable(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): void {
                return this.setEnabled(featureIdentifier, false);
        }
        public canSetEnabled(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): boolean {
                let featureDescriptor = this.getFeatureDescriptor(featureIdentifier);
                return undefined === featureDescriptor ? false : undefined !== featureDescriptor.toggleCount && 0 !== featureDescriptor.toggleCount;
        }
        public setEnabled(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), enabled: boolean) {
                let featureDescriptor = this.getFeatureDescriptor(featureIdentifier);
                let feature = featureDescriptor.getFeature();
                
                if (this.canSetEnabled(feature)) {
                        featureDescriptor.enabled = !!enabled;
                        if (featureDescriptor.toggleCount > 0) {
                                featureDescriptor.toggleCount--;
                        }
                } else {
                        throw new Error(`Cannot set enabled '${enabled}' on feature '${feature.getName()}'`);
                } 
        }

        public ifEnabled(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), enabledFunction: ((args: any[], context: Object) => any), args: any[] | ((context: Object) => any[]), defaultValue: any | ((context: Object)=> any) = undefined): any {
                if (this.isEnabled(this.getFeatureDescriptor(featureIdentifier))) {
                        return enabledFunction.call({}, this.normalizeValue(args), this.getContext());
                } else {
                        return this.normalizeValue(defaultValue);
                }
        }
        public ifDisabled(featureIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), disabledFunction: ((args: any[], context: Object) => any), args: any[] | ((context: Object) => any[]), defaultValue: any | ((context: Object) => any) = undefined): any {
                if (!this.isEnabled(this.getFeatureDescriptor(featureIdentifier))) {
                        return disabledFunction.call({}, this.normalizeValue(args), this.getContext());
                } else {
                        return this.normalizeValue(defaultValue);
                }
        }

        public createFeature(name: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), enabled: boolean | ((context: Object) => boolean)): Feature {
                return new Feature(this.getName(this.normalizeValue(name)), !!this.normalizeValue(enabled));
        }

        private normalizeFeatureish(featureish: Feature | FeatureDescriptor | any, enabled: boolean=false, value: any=undefined, toggleCount: number=0): FeatureDescriptor {
                if (FeatureManager.isFeature(featureish)) {
                        return new FeatureDescriptor(featureish, value,);
                } else if (FeatureManager.isFeatureDescriptor(featureish)) {
                        return new FeatureDescriptor(
                                featureish.getFeature(),
                                undefined === featureish.enabled || null === featureish.enabled ? enabled : !!featureish.enabled,
                                undefined === featureish.value || null === featureish.value ? value : featureish.value,
                                undefined === featureish.toggleCount || null === featureish.toggleCount ? toggleCount : featureish.toggleCount
                        );
                } else if (FeatureManager.isFeatureish(featureish)) {
                        return new FeatureDescriptor(this.createFeature(featureish.name, featureish.enabled), undefined === featureish.enabled || null === featureish.enabled ? !!enabled : !!featureish.enabled, value, toggleCount);
                } else {
                        throw new Error(`Not able to normalize to a feature '${featureish}'`);
                }
        }
        private normalizeValue(value: ((context: Object) => Object) | any): any {
                return FeatureManager.isFunction(value) ? this.normalizeValue(value(this.getContext())) : value;
        }
        private asFeatureArray(featureIdentifiers: string[] | Feature[] | FeatureDescriptor[] | ((context: Object) => string[] | Feature[] | FeatureDescriptor[])): Feature[] {
                let features:Feature[] = [];

                featureIdentifiers = this.normalizeValue(featureIdentifiers);

                if (FeatureManager.isStringArray(featureIdentifiers)) {
                        featureIdentifiers.forEach((featureIdentifier: string) => {
                                let feature = this.getFeature(featureIdentifier);
                                if(!!feature) {
                                        features.push(feature);
                                }
                        });
                } else if (FeatureManager.isFeatureArray(featureIdentifiers)) {
                        featureIdentifiers.forEach((featureIdentifier: Feature) => {
                                if(!!featureIdentifier) {
                                        features.push(featureIdentifier);
                                }
                        });                        
                } else if (FeatureManager.isFeatureDescriptorArray(featureIdentifiers)) {
                        featureIdentifiers.forEach((featureIdentifier: FeatureDescriptor) => {
                                let feature = this.getFeature(featureIdentifier);
                                if(!!feature) {
                                        features.push(feature);
                                }
                        });                        
                }

                return features;
        }

        public setFeatureDescriptorDecorator(featureDescriptorDecorator: (featureDescriptor: FeatureDescriptor, context: Object) => FeatureDescriptor): void {
                this.featureDecriptorDecorator = featureDescriptorDecorator;
        }
        private getFeatureDescriptorDecorator(): ((featureDescriptor: FeatureDescriptor, context: Object) => FeatureDescriptor) {
                return this.featureDecriptorDecorator || ((featureDescriptor: FeatureDescriptor, context: Object) => featureDescriptor);
        }

        private getFeatureDescriptor(featureDescriptorIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): FeatureDescriptor {
                let featureDescriptor = this.features[this.getName(this.normalizeValue(featureDescriptorIdentifier))];

                if (!featureDescriptor && FeatureManager.isFeatureDescriptor(featureDescriptorIdentifier)) {
                        featureDescriptor = featureDescriptorIdentifier;
                }
                let decoratorFn = this.getFeatureDescriptorDecorator();

                // Return the decorated feature descriptor; if the decorator does not return a value, return the original descriptor
                return decoratorFn(featureDescriptor, this.getContext()) || featureDescriptor;
        }

        private getName(nameIdentifier: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor)): string {
                nameIdentifier = this.normalizeValue(nameIdentifier);

                if (FeatureManager.isString(nameIdentifier)) {
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

        private static isFeatureDescriptorArray(value: any): value is FeatureDescriptor[] {
                return value instanceof Array ? value.every(FeatureManager.isFeatureDescriptor) : false;
        }

        private static isFeature(value: any): value is Feature {
                return Feature.isFeature(value);
        }

        private static isFeatureish(value: any): value is Featureish {
                return Featureish.isFeatureish(value);
        }

        private static isFeatureDescriptor(value: any): value is FeatureDescriptor {
                return FeatureDescriptor.isFeatureDescriptor(value);
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

        public static isFeature(value: any): value is Feature {
                return value instanceof Feature;
        }


        // For non-module instantiation
        // if(!(this instanceof Feature)) {
        //         return new Feature(name, enabled);
        // }

        constructor(private name: string, private enabled: boolean = true) {}

        public getName(): string {
                return this.name;
        }

        public isEnabled(): boolean {
                return this.enabled;
        }

}

export class FeatureDescriptor {

        public static isFeatureDescriptor(value: any): value is FeatureDescriptor {
                return value instanceof FeatureDescriptor;
        }

        public name: string;

        constructor(private featureish: string | Feature | FeatureDescriptor | any | (() => string | Feature | FeatureDescriptor | (() => string | Feature | FeatureDescriptor)), public enabled: boolean = undefined, public value: any = undefined, public toggleCount: number=undefined) {
                if (undefined === featureish || null === featureish) {
                        throw new Error(`No value passed in`);
                }

                while ('function' === typeof featureish) {
                        featureish = featureish();
                }

                if ('string' === typeof featureish) {
                        this.name = featureish;
                } else if (Feature.isFeature(featureish)) {
                        this.name = featureish.getName();
                        this.enabled = featureish.isEnabled();
                } else if (FeatureDescriptor.isFeatureDescriptor(featureish)) {
                        this.name = featureish.name;
                        this.enabled = featureish.enabled;
                        this.value = featureish.value;
                        this.toggleCount = featureish.toggleCount;
                } else if (Featureish.isFeatureish(featureish)) {
                        this.name = featureish.name;
                        this.enabled = featureish.enabled;
                } else {
                        throw new Error(`Unknown feature identifer type '${typeof featureish}'`);
                }

                if (undefined === enabled || null === enabled) {
                        this.enabled = !!this.enabled;
                } else {
                        this.enabled = !!enabled;
                }
                
                // Value is treated differently; a value CAN be null
                if (undefined !== value) {
                        this.value = value;
                }

                // If the toggle count is NOT specified as a parameter
                if (undefined !== toggleCount && null !== toggleCount) {
                        // Set the toggle count to the specified value
                        this.toggleCount = toggleCount;
                } else if (undefined === this.toggleCount || null === this.toggleCount) {
                        // If the this toggle count is not yet defined, set to 0
                        this.toggleCount = 0;
                }
        }

        public getFeature(): Feature {
                return new Feature(this.name, this.enabled);
        }

}

class Featureish {

        public static isFeatureish(value: any): value is Featureish {
                return value.name && value.enabled;
        }

        public name: string;
        public enabled: boolean;
}