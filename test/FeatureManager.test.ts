import { assert } from 'chai';
import { FeatureManager, Feature, FeatureDescriptor } from '../src/index';

// FeatureManager.setContext({
//   getFeatureDescriptor: (featureDescriptor: FeatureDescriptor, context: any) => {
//     console.log("featureDescriptor", featureDescriptor, 'context', context);
//     //return featureDescriptor;
//     return new FeatureDescriptor(new Feature('test', false), false, "", 0);
//   }
// });

// FeatureManager.getAllFeatures().forEach((feature: Feature) => {
//   console.log(`feature ${feature.getName()}: ${feature.isEnabled()}`);
// });

describe('FeatureManager', () => {


  // Required to start from a clean slate
  afterEach(() => {
    FeatureManager.removeAllFeatures();
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

  });

});


