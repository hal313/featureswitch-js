import { assert } from 'chai';
import { FeatureManager, Feature, FeatureDescriptor } from '../src/index';
import * as _ from 'lodash';

describe('FeatureManager', () => {

  // Required to start from a clean slate
  afterEach(() => {
    FeatureManager.removeAllFeatures();
    FeatureManager.setContext(null);
  });


  describe('API', () => {

    describe('addSource()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
        this.sourceName = 'someSource';
      });

      it('should add features by Feature[]', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);
    
        // Add a feature
        FeatureManager.addSource(this.sourceName, () => [new Feature(this.featureName, this.featureEnabled)]);
    
        // Check for equality
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });

      it('should add features by FeatureDescriptor[]', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);
    
        // Add a feature
        FeatureManager.addSource(this.sourceName, () => [new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled))]);
    
        // Check for equality
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });

    });
  
    describe('setFeatures()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;

        this.newFeatureName = 'someNewFeatureName';
        this.newFeatureEnabled = this.featureEnabled;
      });

      it('should set features by Feature[]', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);

        FeatureManager.addFeature(new Feature(this.featureName, this.featureEnabled));
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);

        // Set the new features
        FeatureManager.setFeatures([new Feature(this.newFeatureName, this.newFeatureEnabled)]);

        // Check assumptions
        // The original feature should be gone
        assert.equal(FeatureManager.getFeature(this.featureName), null);
        // The new feature should be present and correct
        assert.equal(FeatureManager.getFeature(this.newFeatureName).getName(), this.newFeatureName);
        assert.equal(FeatureManager.getFeature(this.newFeatureName).isEnabled(), this.newFeatureEnabled);
      });

      it('should set features by FeatureDescriptor[]', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);

        FeatureManager.addFeature(new Feature(this.featureName, this.featureEnabled));
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);

        // Set the new features
        FeatureManager.setFeatures([new FeatureDescriptor(new Feature(this.newFeatureName, this.newFeatureEnabled))]);

        // Check assumptions
        // The original feature should be gone
        assert.equal(FeatureManager.getFeature(this.featureName), null);
        // The new feature should be present and correct
        assert.equal(FeatureManager.getFeature(this.newFeatureName).getName(), this.newFeatureName);
        assert.equal(FeatureManager.getFeature(this.newFeatureName).isEnabled(), this.newFeatureEnabled);
      });

      it('should set features by () => Feature[]', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);

        FeatureManager.addFeature(new Feature(this.featureName, this.featureEnabled));
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);

        // Set the new features
        FeatureManager.setFeatures(() => [new Feature(this.newFeatureName, this.newFeatureEnabled)]);

        // Check assumptions
        // The original feature should be gone
        assert.equal(FeatureManager.getFeature(this.featureName), null);
        // The new feature should be present and correct
        assert.equal(FeatureManager.getFeature(this.newFeatureName).getName(), this.newFeatureName);
        assert.equal(FeatureManager.getFeature(this.newFeatureName).isEnabled(), this.newFeatureEnabled);
      });

      it('should set features by () => FeatureDescriptor[]', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);

        FeatureManager.addFeature(new Feature(this.featureName, this.featureEnabled));
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);

        // Set the new features
        FeatureManager.setFeatures(() => [new FeatureDescriptor(new Feature(this.newFeatureName, this.newFeatureEnabled))]);

        // Check assumptions
        // The original feature should be gone
        assert.equal(FeatureManager.getFeature(this.featureName), null);
        // The new feature should be present and correct
        assert.equal(FeatureManager.getFeature(this.newFeatureName).getName(), this.newFeatureName);
        assert.equal(FeatureManager.getFeature(this.newFeatureName).isEnabled(), this.newFeatureEnabled);        
      });

    });

    describe('addFeatures()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should add features by Feature[]', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);
    
        // Add a feature
        FeatureManager.addFeatures([new Feature(this.featureName, this.featureEnabled)]);
    
        // Check for equality
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });

      it('should add features by FeatureDescriptor[]', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);
    
        // Add a feature
        FeatureManager.addFeatures([new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled))]);
    
        // Check for equality
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });
      
      it('should add features by FeatureDescriptor[] (override feature value)', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);
    
        // Add a feature
        FeatureManager.addFeatures([new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled), !this.featureEnabled)]);
    
        // Check for equality
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), !this.featureEnabled);
      });

      // it('should add features by featureish[]', () => {
      //   // Base assumption
      //   assert.equal(FeatureManager.getFeature(this.featureName), null);
    
      //   // Add a feature
      //   FeatureManager.addFeatures([{name: this.featureName, enabled: this.featureEnabled}]);
    
      //   // Check for equality
      //   assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
      //   assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      // });

      it('should add features by () => Feature[]', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);
    
        // Add a feature
        FeatureManager.addFeatures(() => [new Feature(this.featureName, this.featureEnabled)]);
    
        // Check for equality
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });

      it('should add features by () => FeatureDescriptor[]', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);
    
        // Add a feature
        FeatureManager.addFeatures(() => [new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled))]);
    
        // Check for equality
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });

      // it('should add features by () => featureish[]', () => {
      //   // Base assumption
      //   assert.equal(FeatureManager.getFeature(this.featureName), null);
    
      //   // Add a feature
      //   FeatureManager.addFeature(() => [{name: this.featureName, enabled: this.featureEnabled}]);
    
      //   // Check for equality
      //   assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
      //   assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      // });

    });

    describe('addFeature()', () => {
  
      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should add a feature by Feature', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);
    
        // Add a feature
        FeatureManager.addFeature(new Feature(this.featureName, this.featureEnabled));
    
        // Check for equality
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });

      it('should add a feature by Feature (unspecified feature value)', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);
    
        // Add a feature
        FeatureManager.addFeature(new Feature(this.featureName), this.featureEnabled);
    
        // Check for equality
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });
      
      it('should add a feature by FeatureDescriptor', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);
    
        // Add a feature
        FeatureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled)));
    
        // Check for equality
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });
      
      it('should add a feature by FeatureDescriptor (override feature value)', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);
    
        // Add a feature
        FeatureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled), !this.featureEnabled));
    
        // Check for equality
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), !this.featureEnabled);
      });

      it('should add a feature by featureish', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);
    
        // Add a feature
        FeatureManager.addFeature({name: this.featureName, enabled: this.featureEnabled});
    
        // Check for equality
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });

      it('should add a feature by () => Feature', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);
    
        // Add a feature
        FeatureManager.addFeature(() => new Feature(this.featureName, this.featureEnabled));
    
        // Check for equality
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });

      it('should add a feature by () => FeatureDescriptor', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);
    
        // Add a feature
        FeatureManager.addFeature(() => new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled)));
    
        // Check for equality
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });

      it('should add a feature by () => featureish', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);
    
        // Add a feature
        FeatureManager.addFeature(() => {return {name: this.featureName, enabled: this.featureEnabled}});
    
        // Check for equality
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });
        
    });

    describe('removeFeature()', () => {
      
      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should remove feature by string', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);
      
        FeatureManager.addFeature(new Feature(this.featureName, this.featureEnabled));

        // Check for equality
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);

        // Remove the feature
        FeatureManager.removeFeature(this.featureName);

        // Check that the feature has been removed
        assert.equal(FeatureManager.getFeature(this.featureName), null);
      });

      it('should remove feature by Feature (same reference)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);

        // Base assumption
        assert.equal(FeatureManager.getFeature(feature.getName()), null);

        // Add the feature
        FeatureManager.addFeature(feature);

        // Check for equality
        assert.equal(FeatureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        FeatureManager.removeFeature(feature);

        // Check that the feature has been removed
        assert.equal(FeatureManager.getFeature(feature.getName()), null);
      });

      it('should remove feature by Feature (different reference)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);
        let newFeature = new Feature(feature.getName(), feature.isEnabled());

        // Base assumption
        assert.equal(FeatureManager.getFeature(feature.getName()), null);

        // Add the feature
        FeatureManager.addFeature(feature);

        // Check for equality
        assert.equal(FeatureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        FeatureManager.removeFeature(newFeature);

        // Check that the feature has been removed
        assert.equal(FeatureManager.getFeature(feature.getName()), null);
      });

      it('should remove feature by FeatureDescriptor (same reference)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);
        let featureDescriptor = new FeatureDescriptor(feature);

        // Base assumption
        assert.equal(FeatureManager.getFeature(feature.getName()), null);

        // Add the feature
        FeatureManager.addFeature(featureDescriptor);

        // Check for equality
        assert.equal(FeatureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        FeatureManager.removeFeature(featureDescriptor);

        // Check that the feature has been removed
        assert.equal(FeatureManager.getFeature(feature.getName()), null);
      });

      it('should remove feature by FeatureDescriptor (new reference)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);
        let newFeature = new Feature(feature.getName(), feature.isEnabled());
        let featureDescriptor = new FeatureDescriptor(feature);
        let newFeatureDescriptor = new FeatureDescriptor(newFeature);

        // Base assumption
        assert.equal(FeatureManager.getFeature(feature.getName()), null);

        // Add the feature
        FeatureManager.addFeature(featureDescriptor);

        // Check for equality
        assert.equal(FeatureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        FeatureManager.removeFeature(newFeatureDescriptor);

        // Check that the feature has been removed
        assert.equal(FeatureManager.getFeature(feature.getName()), null);
      });
      
      it('should remove feature by () => string)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);

        // Base assumption
        assert.equal(FeatureManager.getFeature(feature.getName()), null);

        // Add the feature
        FeatureManager.addFeature(feature);

        // Check for equality
        assert.equal(FeatureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        FeatureManager.removeFeature(() => feature.getName());

        // Check that the feature has been removed
        assert.equal(FeatureManager.getFeature(feature.getName()), null);
      });

      it('should remove feature by () => Feature)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);

        // Base assumption
        assert.equal(FeatureManager.getFeature(feature.getName()), null);

        // Add the feature
        FeatureManager.addFeature(feature);

        // Check for equality
        assert.equal(FeatureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        FeatureManager.removeFeature(() => feature);

        // Check that the feature has been removed
        assert.equal(FeatureManager.getFeature(feature.getName()), null);        
      });

      it('should remove feature by () => FeatureDescriptor)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);

        // Base assumption
        assert.equal(FeatureManager.getFeature(feature.getName()), null);

        // Add the feature
        FeatureManager.addFeature(feature);

        // Check for equality
        assert.equal(FeatureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        FeatureManager.removeFeature(() => new FeatureDescriptor(feature));

        // Check that the feature has been removed
        assert.equal(FeatureManager.getFeature(feature.getName()), null);
      });

    });

    describe('removeFeatures()', () => {
      
      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should remove features by string', () => {
        // Base assumption
        assert.equal(FeatureManager.getFeature(this.featureName), null);
      
        FeatureManager.addFeature(new Feature(this.featureName, this.featureEnabled));

        // Check for equality
        assert.equal(FeatureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);

        // Remove the feature
        FeatureManager.removeFeatures([this.featureName]);

        // Check that the feature has been removed
        assert.equal(FeatureManager.getFeature(this.featureName), null);
      });

      it('should remove features by Feature (same reference)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);

        // Base assumption
        assert.equal(FeatureManager.getFeature(feature.getName()), null);

        // Add the feature
        FeatureManager.addFeature(feature);

        // Check for equality
        assert.equal(FeatureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        FeatureManager.removeFeatures([feature]);

        // Check that the feature has been removed
        assert.equal(FeatureManager.getFeature(feature.getName()), null);
      });

      it('should remove features by Feature (different reference)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);
        let newFeature = new Feature(feature.getName(), feature.isEnabled());

        // Base assumption
        assert.equal(FeatureManager.getFeature(feature.getName()), null);

        // Add the feature
        FeatureManager.addFeature(feature);

        // Check for equality
        assert.equal(FeatureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        FeatureManager.removeFeatures([newFeature]);

        // Check that the feature has been removed
        assert.equal(FeatureManager.getFeature(feature.getName()), null);
      });

      it('should remove features by FeatureDescriptor (same reference)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);
        let featureDescriptor = new FeatureDescriptor(feature);

        // Base assumption
        assert.equal(FeatureManager.getFeature(feature.getName()), null);

        // Add the feature
        FeatureManager.addFeature(featureDescriptor);

        // Check for equality
        assert.equal(FeatureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        FeatureManager.removeFeatures([featureDescriptor]);

        // Check that the feature has been removed
        assert.equal(FeatureManager.getFeature(feature.getName()), null);
      });

      it('should remove features by FeatureDescriptor (new reference)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);
        let newFeature = new Feature(feature.getName(), feature.isEnabled());
        let featureDescriptor = new FeatureDescriptor(feature);
        let newFeatureDescriptor = new FeatureDescriptor(newFeature);

        // Base assumption
        assert.equal(FeatureManager.getFeature(feature.getName()), null);

        // Add the feature
        FeatureManager.addFeature(featureDescriptor);

        // Check for equality
        assert.equal(FeatureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        FeatureManager.removeFeatures([newFeatureDescriptor]);

        // Check that the feature has been removed
        assert.equal(FeatureManager.getFeature(feature.getName()), null);
      });
      
      it('should remove features by () => string)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);

        // Base assumption
        assert.equal(FeatureManager.getFeature(feature.getName()), null);

        // Add the feature
        FeatureManager.addFeature(feature);

        // Check for equality
        assert.equal(FeatureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        FeatureManager.removeFeatures(() => [feature.getName()]);

        // Check that the feature has been removed
        assert.equal(FeatureManager.getFeature(feature.getName()), null);
      });

      it('should remove features by () => Feature)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);

        // Base assumption
        assert.equal(FeatureManager.getFeature(feature.getName()), null);

        // Add the feature
        FeatureManager.addFeature(feature);

        // Check for equality
        assert.equal(FeatureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        FeatureManager.removeFeatures(() => [feature]);

        // Check that the feature has been removed
        assert.equal(FeatureManager.getFeature(feature.getName()), null);        
      });

      it('should remove feature by () => FeatureDescriptor)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);

        // Base assumption
        assert.equal(FeatureManager.getFeature(feature.getName()), null);

        // Add the feature
        FeatureManager.addFeature(feature);

        // Check for equality
        assert.equal(FeatureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        FeatureManager.removeFeatures(() => [new FeatureDescriptor(feature)]);

        // Check that the feature has been removed
        assert.equal(FeatureManager.getFeature(feature.getName()), null);
      });

    });

    describe('removeAllFeatures()', () => {

      it('should remove all features', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);

        // Base assumption
        assert.equal(FeatureManager.getFeature(feature.getName()), null);

        // Add the feature
        FeatureManager.addFeature(feature);

        // Check for equality
        assert.equal(FeatureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(FeatureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        FeatureManager.removeAllFeatures();

        // Check that the feature has been removed
        assert.equal(FeatureManager.getAllFeatures().length, 0);
      });

    });

    describe('hasFeature()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should return false when no such feature is known', () => {
        assert.equal(FeatureManager.hasFeature(this.featureName), false);
      });

      it('should return true when a feature is known', () => {
        FeatureManager.addFeature(new Feature(this.featureName, this.featureEnabled));
        assert.equal(FeatureManager.hasFeature(this.featureName), true);
      });

    });

    describe('hasValue()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
        this.featureValue = {someValueName: 'someValueValue'};
      });

      it('should return false when no value has been set', () => {
        // Add a feature
        FeatureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName), this.featureValue));

        // Check the value
        assert.equal(FeatureManager.hasValue(this.featureName), false);
      });

      it('should return true when a value has been assigned', () => {
        // Add a feature
        FeatureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName)), this.featureValue);

        // Check the value
        assert.equal(FeatureManager.hasValue(this.featureName), true);
      });

      it('should return true when a null value has been assigned', () => {
        // Add a feature
        FeatureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName)), null);

        // Check the value
        assert.equal(FeatureManager.hasValue(this.featureName), true);
      });

    });

    describe('isEnabled()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
        this.featureValue = {someValueName: 'someValueValue'};
      });

      it('should throw an error when an unknown feature is requested', () => {
        assert.throw(() => FeatureManager.isEnabled(this.featureName));
      });

      it('should return true when the feature is enabled', () => {
        FeatureManager.addFeature(new Feature(this.featureName, true));
        assert.isTrue(FeatureManager.isEnabled(this.featureName));
      });

      it('should return false when the feature is not enabled', () => {
        FeatureManager.addFeature(new Feature(this.featureName, false));
        assert.isFalse(FeatureManager.isEnabled(this.featureName));
      });

    });

    describe('isDisabled()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should throw an error when an unknown feature is requested', () => {
        assert.throw(() => FeatureManager.isDisabled(this.featureName));
      });

      it('should return false when the feature is enabled', () => {
        FeatureManager.addFeature(new Feature(this.featureName, true));
        assert.isFalse(FeatureManager.isDisabled(this.featureName));
      });

      it('should return true when the feature is not enabled', () => {
        FeatureManager.addFeature(new Feature(this.featureName, false));
        assert.isTrue(FeatureManager.isDisabled(this.featureName));
      });

    });

    describe('canEnable()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should throw an error when an unknown feature is requested', () => {
        assert.throw(() => FeatureManager.canEnable(this.featureName));
      });

      it('should return true if the feature can be enabled', () => {
        FeatureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled), undefined, null, -1), undefined, -1);
        assert.isTrue(FeatureManager.canEnable(this.featureName));
      });

      it('should return true if the feature can be enabled', () => {
        FeatureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled), undefined, null, -1), undefined, 1);
        assert.isTrue(FeatureManager.canEnable(this.featureName));
      });

      it('should return false if the feature cannot be enabled', () => {
        FeatureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled)));
        assert.isFalse(FeatureManager.canEnable(this.featureName));
      });

    });

    describe('canDisable()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should throw an error when an unknown feature is requested', () => {
        assert.throw(() => FeatureManager.canDisable(this.featureName));
      });

      it('should return true if the feature can be disabled', () => {
        FeatureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled), undefined, null, -1), undefined, -1);
        assert.isTrue(FeatureManager.canDisable(this.featureName));
      });

      it('should return true if the feature can be disabled', () => {
        FeatureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled), undefined, null, -1), undefined, 1);
        assert.isTrue(FeatureManager.canDisable(this.featureName));
      });

      it('should return false if the feature cannot be disabled', () => {
        FeatureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled)));
        assert.isFalse(FeatureManager.canDisable(this.featureName));
      });

    });

    describe('enable', () => {

      beforeEach(() => {
        this.enabledFeatureName = 'enabledFeature';
        this.disabledFeatureName = 'disabledFeature';
        this.enabledFeature = new Feature(this.enabledFeatureName, true);
        this.disabledFeature = new Feature(this.disabledFeatureName, false);
      });

      it('should throw an error when an unknown feature is requested', () => {
        assert.throw(() => FeatureManager.enable(this.enabledFeatureName));
      });

      it('should enable a previously disabled feature', () => {
        // Add the feature
        FeatureManager.addFeature(new FeatureDescriptor(this.disabledFeature), null, 1);

        // Assert that the feature is disabled
        assert.isFalse(FeatureManager.getFeature(this.disabledFeature).isEnabled());
        assert.isFalse(FeatureManager.isEnabled(this.disabledFeature));

        // Enable the feature
        FeatureManager.enable(this.disabledFeature);

        // Assert that the feature is enabled
        assert.isTrue(FeatureManager.getFeature(this.disabledFeature).isEnabled());
        assert.isTrue(FeatureManager.isEnabled(this.disabledFeature));
      });

      it('should enable a previously enabled feature', () => {
        // Add the feature
        FeatureManager.addFeature(new FeatureDescriptor(this.enabledFeature), null, 1);

        // Assert that the feature is enabled
        assert.isTrue(FeatureManager.getFeature(this.enabledFeature).isEnabled());
        assert.isTrue(FeatureManager.isEnabled(this.enabledFeature));

        // Enable the feature
        FeatureManager.enable(this.enabledFeature);

        // Assert that the feature is enabled
        assert.isTrue(FeatureManager.getFeature(this.enabledFeature).isEnabled());
        assert.isTrue(FeatureManager.isEnabled(this.enabledFeature));
      });

      it('should throw when trying to enable a feature which cannot be enabled', () => {
        // Add the feature
        FeatureManager.addFeature(new FeatureDescriptor(this.disabledFeature), null, 0);

        // Enable the feature
        assert.throw(() => FeatureManager.enable(this.disabledFeature));
      });

    });

    describe('disable()', () => {

      beforeEach(() => {
        this.enabledFeatureName = 'enabledFeature';
        this.disabledFeatureName = 'disabledFeature';
        this.enabledFeature = new Feature(this.enabledFeatureName, true);
        this.disabledFeature = new Feature(this.disabledFeatureName, false);
      });

      it('should throw an error when an unknown feature is requested', () => {
        assert.throw(() => FeatureManager.enable(this.enabledFeatureName));
      });

      it('should disable a previously disabled feature', () => {
        // Add the feature
        FeatureManager.addFeature(new FeatureDescriptor(this.disabledFeature), null, 1);

        // Assert that the feature is disabled
        assert.isFalse(FeatureManager.getFeature(this.disabledFeature).isEnabled());
        assert.isFalse(FeatureManager.isEnabled(this.disabledFeature));

        // Disable the feature
        FeatureManager.disable(this.disabledFeature);

        // Assert that the feature is enabled
        assert.isFalse(FeatureManager.getFeature(this.disabledFeature).isEnabled());
        assert.isFalse(FeatureManager.isEnabled(this.disabledFeature));
      });

      it('should disable a previously enabled feature', () => {
        // Add the feature
        FeatureManager.addFeature(new FeatureDescriptor(this.enabledFeature), null, 1);

        // Assert that the feature is enabled
        assert.isTrue(FeatureManager.getFeature(this.enabledFeature).isEnabled());
        assert.isTrue(FeatureManager.isEnabled(this.enabledFeature));

        // Disable the feature
        FeatureManager.disable(this.enabledFeature);

        // Assert that the feature is enabled
        assert.isFalse(FeatureManager.getFeature(this.enabledFeature).isEnabled());
        assert.isFalse(FeatureManager.isEnabled(this.enabledFeature));
      });

      it('should throw when trying to disable a feature which cannot be disabled', () => {
        // Add the feature
        FeatureManager.addFeature(new FeatureDescriptor(this.disabledFeature), null, 0);

        // Enable the feature
        assert.throw(() => FeatureManager.disable(this.disabledFeature));
      });
    });

    describe('canSetEnabled()', () => {

      beforeEach(() => {
        this.enabledFeatureName = 'enabledFeature';
        this.disabledFeatureName = 'disabledFeature';
        this.enabledFeature = new Feature(this.enabledFeatureName, true);
        this.disabledFeature = new Feature(this.disabledFeatureName, false);
      });

      it('should throw an error when an unknown feature is requested', () => {
        assert.throw(() => FeatureManager.canSetEnabled(this.enabledFeatureName));
      });

      it('should return false when an enabled feature cannot be set enabled', () => {
        // Add the feature
        FeatureManager.addFeature(this.enabledFeature);

        // Assertion
        assert.isFalse(FeatureManager.canSetEnabled(this.enabledFeature));
      });

      it('should return false when a enabled feature cannot be set enabled', () => {
        // Add the feature
        FeatureManager.addFeature(this.disabledFeature);

        // Assertion
        assert.isFalse(FeatureManager.canSetEnabled(this.disabledFeature));
      });

      it('should return false when an enabled feature can be set enabled', () => {
        // Add the feature
        FeatureManager.addFeature(this.enabledFeature, null, -1);

        // Assertion
        assert.isTrue(FeatureManager.canSetEnabled(this.enabledFeature));
      });

      it('should return false when a enabled feature can be set enabled', () => {
        // Add the feature
        FeatureManager.addFeature(this.disabledFeature, null, -1);

        // Assertion
        assert.isTrue(FeatureManager.canSetEnabled(this.disabledFeature));
      });

    });

    describe('setEnabled()', () => {

      beforeEach(() => {
        this.enabledFeatureName = 'enabledFeature';
        this.disabledFeatureName = 'disabledFeature';
        this.enabledFeature = new Feature(this.enabledFeatureName, true);
        this.disabledFeature = new Feature(this.disabledFeatureName, false);
      });

      it('should throw an error when an unknown feature is requested', () => {
        assert.throw(() => FeatureManager.setEnabled(this.enabledFeatureName, true));
      });

      it('should throw when requested to set enabled a feature which cannot be set', () => {
        FeatureManager.addFeature(this.enabledFeature);
        assert.throw(() => FeatureManager.setEnabled(this.enabledFeature, false));
      });

      it('should set enabled when requested to set enabled a feature which can be set', () => {
        // Add the feature
        FeatureManager.addFeature(this.enabledFeature, undefined, 1);

        // Check that the feature is enabled
        assert.isTrue(FeatureManager.isEnabled(this.enabledFeature));

        // Set the feature to be disabled
        FeatureManager.setEnabled(this.enabledFeature, false);

        // Check that the feature is disabled
        assert.isFalse(FeatureManager.isEnabled(this.enabledFeature));
      });

      it('should not allow more than the specified number of sets', () => {
        let toggleCount = 5;
        // Add the feature
        FeatureManager.addFeature(this.enabledFeature, undefined, toggleCount);

        // Check that the feature is enabled
        assert.isTrue(FeatureManager.isEnabled(this.enabledFeature));

        for (let i=0; i<toggleCount; i++) {
          // Toggle the feature
          FeatureManager.setEnabled(this.enabledFeature, !FeatureManager.isEnabled(this.enabledFeature));
        }

        // The next set should fail
        assert.throw(() => FeatureManager.setEnabled(this.enabledFeature, !FeatureManager.isEnabled(this.enabledFeature)));
      });

    });

    describe('getValue()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
        this.featureValue = {someValueName: 'someValueValue'};
      });

      it('should return undefined when no value has been set', () => {
        // Add a feature
        FeatureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName), this.featureValue));

        // Check the value
        assert.equal(FeatureManager.getValue(this.featureName), undefined);
      });

      it('should return the assigned value', () => {
        // Add a feature
        FeatureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName), this.featureValue), this.featureValue);

        // Check the value
        assert.equal(FeatureManager.getValue(this.featureName), this.featureValue);
      });

    });

    describe('setValue()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
        this.featureValue = {someValueName: 'someValueValue'};
      });

      it('should return undefined when no value has been set', () => {
        // Add a feature
        FeatureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName), this.featureValue));

        // Check the value
        assert.equal(FeatureManager.getValue(this.featureName), undefined);
      });

      it('should return the assigned value', () => {
        // Add a feature
        FeatureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName), this.featureValue), this.featureValue);

        // Check the value
        assert.equal(FeatureManager.getValue(this.featureName), this.featureValue);
      });

    });

    describe('getAllFeatures()', () => {

      it('should return the emtpy array when no features have been added', () => {
        assert.equal(FeatureManager.getAllFeatures().length, 0);
      });

      it('should return all the features added to the FeatureManager', () => {
        let feature1 = new Feature('feature1', true);
        let feature2 = new Feature('feature2', false);

        FeatureManager.addFeature(feature1);
        FeatureManager.addFeature(feature2);

        assert.equal(FeatureManager.getAllFeatures().length, 2);

        assert.deepEqual(_.find(FeatureManager.getAllFeatures(), (feature:Feature) => feature.getName() === feature1.getName()), feature1);
        assert.deepEqual(_.find(FeatureManager.getAllFeatures(), (feature:Feature) => feature.getName() === feature2.getName()), feature2);
      });

    });

    describe('Enabled Function Execution', () => {

      beforeEach(() => {
        this.HAS_RUN = 'HAS_RUN';
        this.HAS_NOT_RUN = 'HAS_NOT_RUN';
        this.enabledFeature = new Feature('enabledFeature', true);
        this.disabledFeature = new Feature('disabledFeature', false);
        this.fn = () => this.HAS_RUN;

        FeatureManager.addFeatures([this.enabledFeature, this.disabledFeature]);
      });

      describe('ifEnabled()', () => {

        it('should execute the function if the feature is enabled', () => {
          assert.equal(FeatureManager.ifEnabled(this.enabledFeature, this.fn), this.HAS_RUN);
        });

        it('should not execute the function if the feature is disabled', () => {
          assert.equal(FeatureManager.ifEnabled(this.disabledFeature, this.fn, null, this.HAS_NOT_RUN), this.HAS_NOT_RUN);
        });

      });

      describe('ifDisabled()', () => {

        it('should not execute the function if the feature is enabled', () => {
          assert.equal(FeatureManager.ifDisabled(this.enabledFeature, this.fn, null, this.HAS_NOT_RUN), this.HAS_NOT_RUN);
        });

        it('should execute the function if the feature is disabled', () => {
          assert.equal(FeatureManager.ifDisabled(this.disabledFeature, this.fn), this.HAS_RUN);
        });

      });

    });

    describe('createFeature()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should create a feature using a string and a boolean', () => {
        let createdFeature = FeatureManager.createFeature(this.featureName, this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using a string and () => boolean', () => {
        let createdFeature = FeatureManager.createFeature(this.featureName, () => this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using a Feature and a boolean', () => {
        let createdFeature = FeatureManager.createFeature(new Feature(this.featureName, !this.featureEnabled), this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using a Feature and () => boolean', () => {
        let createdFeature = FeatureManager.createFeature(new Feature(this.featureName, !this.featureEnabled), () => this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using a FeatureDescriptor and a boolean', () => {
        let createdFeature = FeatureManager.createFeature(new FeatureDescriptor(new Feature(this.featureName, !this.featureEnabled)), this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using a FeatureDescriptor and () => boolean', () => {
        let createdFeature = FeatureManager.createFeature(new FeatureDescriptor(new Feature(this.featureName, !this.featureEnabled)), () => this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using () => string and a boolean', () => {
        let createdFeature = FeatureManager.createFeature(() => this.featureName, this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using () => string and () => boolean', () => {
        let createdFeature = FeatureManager.createFeature(() => this.featureName, () => this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using () => Feature and a boolean', () => {
        let createdFeature = FeatureManager.createFeature(() => new Feature(this.featureName, !this.featureEnabled), this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using () => Feature and () => boolean', () => {
        let createdFeature = FeatureManager.createFeature(() => new Feature(this.featureName, !this.featureEnabled), () => this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using () => FeatureDescriptor and a boolean', () => {
        let createdFeature = FeatureManager.createFeature(() => new FeatureDescriptor(new Feature(this.featureName, !this.featureEnabled)), this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using () => FeatureDescriptor and () => boolean', () => {
        let createdFeature = FeatureManager.createFeature(() => new FeatureDescriptor(new Feature(this.featureName, !this.featureEnabled)), () => this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

    });

      describe('Context', () => {

          describe('setContext()', () => {

              it('should set the context', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(FeatureManager.getContext(), {});

                  // Set the context
                  FeatureManager.setContext(context);

                  // Assert that the two contexts are strictly equal
                  assert.deepEqual(FeatureManager.getContext(), context);
              });

              it('should use the set context during addSource()', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(FeatureManager.getContext(), {});

                  // Set the context
                  FeatureManager.setContext(context);

                  FeatureManager.addSource(this.sourceName, (passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return [new Feature(this.featureName, this.featureDescriptor)];
                  });

              });

              it('should use the set context during setFeatures()', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(FeatureManager.getContext(), {});

                  // Set the context
                  FeatureManager.setContext(context);

                  FeatureManager.setFeatures((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return [new Feature(this.featureName, this.featureDescriptor)];
                  });

              });

              it('should use the set context during addFeature()', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(FeatureManager.getContext(), {});

                  // Set the context
                  FeatureManager.setContext(context);

                  FeatureManager.addFeature((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return new Feature(this.featureName, this.featureDescriptor);
                  });

              });

              it('should use the set context during addFeatures()', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(FeatureManager.getContext(), {});

                  // Set the context
                  FeatureManager.setContext(context);

                  FeatureManager.addFeatures((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return [new Feature(this.featureName, this.featureDescriptor)];
                  });

              });

              it('should use the set context during removeFeature()', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(FeatureManager.getContext(), {});

                  // Set the context
                  FeatureManager.setContext(context);

                  FeatureManager.removeFeature((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return this.featureName;
                  });

              });

              it('should use the set context during removeFeatures()', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(FeatureManager.getContext(), {});

                  // Set the context
                  FeatureManager.setContext(context);

                  FeatureManager.removeFeatures((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return [this.featureName];
                  });

              });

              it('should use the set context during removeFeatures()', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(FeatureManager.getContext(), {});

                  // Set the context
                  FeatureManager.setContext(context);

                  FeatureManager.removeFeatures((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return [this.featureName];
                  });

              });

              it('should use the set context during getFeature()', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(FeatureManager.getContext(), {});

                  // Set the context
                  FeatureManager.setContext(context);

                  FeatureManager.getFeature((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return this.featureName;
                  });

              });

              it('should use the set context during getFeatures()', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(FeatureManager.getContext(), {});

                  // Set the context
                  FeatureManager.setContext(context);

                  FeatureManager.getFeatures((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return [this.featureName];
                  });

              });

              it('should use the set context during setValue()', () => {
                  let context = {someValue: true};
                  let feature = new Feature(this.featureName, this.featureEnabled);

                  // Check the initial context
                  assert.deepEqual(FeatureManager.getContext(), {});

                  // Set the context
                  FeatureManager.setContext(context);

                  // Add the feature
                  FeatureManager.addFeature(feature);

                  FeatureManager.setValue(feature, (passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return [feature.getName()];
                  });

              });

              it('should use the set context during isEnabled()', () => {
                  let context = {someValue: true};
                  let feature = new Feature(this.featureName, this.featureEnabled);

                  // Check the initial context
                  assert.deepEqual(FeatureManager.getContext(), {});

                  // Set the context
                  FeatureManager.setContext(context);

                  // Add the feature
                  FeatureManager.addFeature(feature);

                  FeatureManager.isEnabled(feature, (passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                  });

              });

              it('should use the set context during canEnable()', () => {
                  let context = {someValue: true};
                  let feature = new Feature(this.featureName, this.featureEnabled);

                  // Check the initial context
                  assert.deepEqual(FeatureManager.getContext(), {});

                  // Set the context
                  FeatureManager.setContext(context);

                  // Add the feature
                  FeatureManager.addFeature(feature);

                  FeatureManager.canEnable((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return feature;
                  });

              });

              it('should use the set context during canDisable()', () => {
                  let context = {someValue: true};
                  let feature = new Feature(this.featureName, this.featureEnabled);

                  // Check the initial context
                  assert.deepEqual(FeatureManager.getContext(), {});

                  // Set the context
                  FeatureManager.setContext(context);

                  // Add the feature
                  FeatureManager.addFeature(feature);

                  FeatureManager.canDisable((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return feature;
                  });

              });

              // TODO: Test canSetEnabled
              // TODO: Test setEnabled
              // TODO: Test ifEnabled
              // TODO: Test ifDisabled
              // TODO: Test createFeature
              it('should use the set context during enable()', () => {
                  let context = {someValue: true};
                  let feature = new Feature(this.featureName, this.featureEnabled);

                  // Check the initial context
                  // assert.deepEqual(FeatureManager.getContext(), {});

                  // Set the context
                  // FeatureManager.setContext(context);

                  // Add the feature
                  //FeatureManager.addFeature(new FeatureDescriptor(feature, feature.isEnabled(), null, -1));
                  FeatureManager.addFeature(feature);

                  // FeatureManager.enable((passedContext: any) => {
                  //   assert.deepEqual(passedContext, context);
                  //   return feature;
                  // });

              });

              // it('should use the set context during disable()', () => {
              //   let context = {someValue: true};
              //   let feature = new Feature(this.featureName, this.featureEnabled);

              //   // Check the initial context
              //   assert.deepEqual(FeatureManager.getContext(), {});

              //   // Set the context
              //   FeatureManager.setContext(context);

              //   // Add the feature
              //   FeatureManager.addFeature(feature);

              //   FeatureManager.disable((passedContext: any) => {
              //     assert.deepEqual(passedContext, context);
              //     return feature;
              //   });

              // });


          });

          describe('getContext()', () => {

              it('should get the context which was set', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(FeatureManager.getContext(), {});

                  // Set the context
                  FeatureManager.setContext(context);

                  // Assert that the two contexts are strictly equal
                  assert.deepEqual(FeatureManager.getContext(), context);
              });

          });

      });

  });

});
