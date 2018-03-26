import { assert } from 'chai';
import { FeatureManager, Feature, FeatureDescriptor } from '../src/index';
import * as _ from 'lodash';

describe('FeatureManager', () => {

  // Required to start from a clean slate
  beforeEach(() => {
    this.featureManager = new FeatureManager();
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
        assert.equal(this.featureManager.getFeature(this.featureName), null);
    
        // Add a feature
        this.featureManager.addSource(this.sourceName, () => [new Feature(this.featureName, this.featureEnabled)]);
    
        // Check for equality
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });

      it('should add features by FeatureDescriptor[]', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);
    
        // Add a feature
        this.featureManager.addSource(this.sourceName, () => [new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled))]);
    
        // Check for equality
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
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
        assert.equal(this.featureManager.getFeature(this.featureName), null);

        this.featureManager.addFeature(new Feature(this.featureName, this.featureEnabled));
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);

        // Set the new features
        this.featureManager.setFeatures([new Feature(this.newFeatureName, this.newFeatureEnabled)]);

        // Check assumptions
        // The original feature should be gone
        assert.equal(this.featureManager.getFeature(this.featureName), null);
        // The new feature should be present and correct
        assert.equal(this.featureManager.getFeature(this.newFeatureName).getName(), this.newFeatureName);
        assert.equal(this.featureManager.getFeature(this.newFeatureName).isEnabled(), this.newFeatureEnabled);
      });

      it('should set features by FeatureDescriptor[]', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);

        this.featureManager.addFeature(new Feature(this.featureName, this.featureEnabled));
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);

        // Set the new features
        this.featureManager.setFeatures([new FeatureDescriptor(new Feature(this.newFeatureName, this.newFeatureEnabled))]);

        // Check assumptions
        // The original feature should be gone
        assert.equal(this.featureManager.getFeature(this.featureName), null);
        // The new feature should be present and correct
        assert.equal(this.featureManager.getFeature(this.newFeatureName).getName(), this.newFeatureName);
        assert.equal(this.featureManager.getFeature(this.newFeatureName).isEnabled(), this.newFeatureEnabled);
      });

      it('should set features by () => Feature[]', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);

        this.featureManager.addFeature(new Feature(this.featureName, this.featureEnabled));
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);

        // Set the new features
        this.featureManager.setFeatures(() => [new Feature(this.newFeatureName, this.newFeatureEnabled)]);

        // Check assumptions
        // The original feature should be gone
        assert.equal(this.featureManager.getFeature(this.featureName), null);
        // The new feature should be present and correct
        assert.equal(this.featureManager.getFeature(this.newFeatureName).getName(), this.newFeatureName);
        assert.equal(this.featureManager.getFeature(this.newFeatureName).isEnabled(), this.newFeatureEnabled);
      });

      it('should set features by () => FeatureDescriptor[]', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);

        this.featureManager.addFeature(new Feature(this.featureName, this.featureEnabled));
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);

        // Set the new features
        this.featureManager.setFeatures(() => [new FeatureDescriptor(new Feature(this.newFeatureName, this.newFeatureEnabled))]);

        // Check assumptions
        // The original feature should be gone
        assert.equal(this.featureManager.getFeature(this.featureName), null);
        // The new feature should be present and correct
        assert.equal(this.featureManager.getFeature(this.newFeatureName).getName(), this.newFeatureName);
        assert.equal(this.featureManager.getFeature(this.newFeatureName).isEnabled(), this.newFeatureEnabled);        
      });

    });

    describe('getFeatures()', () => {

      it('should return an empty array when there are no features', () => {
        assert.equal(this.featureManager.getAllFeatures().length, 0);
      });

      describe('Not Empty', () => {

        beforeEach(() => {
          this.feature01Name = 'featureOne';
          this.feature02Name = 'featureTwo';

          this.feature01 = new Feature(this.feature01Name);
          this.feature02 = new Feature(this.feature02Name);

          this.featureDescriptor01 = new FeatureDescriptor(this.feature01);
          this.featureDescriptor02 = new FeatureDescriptor(this.feature02);
        });

        describe('string[]', () => {

          it('should return all features which match (one feature)', () => {
            this.featureManager.addFeature(this.feature01);

            assert.equal(this.featureManager.getFeatures([this.feature01Name])[0].getName(), this.feature01.getName());
          });
  
          it('should return all features which match (multiple feature)', () => {
            this.featureManager.addFeature(this.feature01);
            this.featureManager.addFeature(this.feature02);
  
            assert.equal(this.featureManager.getFeatures([this.feature01.getName()]).length, 1);
            assert.equal(this.featureManager.getFeatures([this.feature02.getName()]).length, 1);
            assert.equal(this.featureManager.getFeatures([this.feature01.getName(), this.feature02.getName()]).length, 2);
            assert.equal(this.featureManager.getFeatures([this.feature01.getName(), this.feature02.getName(), 'unknownFeatureName']).length, 2);
          });

        });
  
        describe('Feature[]', () => {
          
          it('should return all features which match (one feature)', () => {
            this.featureManager.addFeature(this.feature01);

            assert.equal(this.featureManager.getFeatures([this.feature01])[0].getName(), this.feature01Name);
          });
  
          it('should return all features which match (multiple feature)', () => {
            this.featureManager.addFeature(this.feature01);
            this.featureManager.addFeature(this.feature02);
  
            assert.equal(this.featureManager.getFeatures([this.feature01]).length, 1);
            assert.equal(this.featureManager.getFeatures([this.feature02]).length, 1);
            assert.equal(this.featureManager.getFeatures([this.feature01, this.feature02]).length, 2);
            assert.equal(this.featureManager.getFeatures([this.feature01, this.feature02, new Feature('unknownFeatureName')]).length, 2);
          });

        });

        describe('FeatureDescriptor[]', () => {

          it('should return all features which match (one feature)', () => {
            this.featureManager.addFeature(this.feature01);

            assert.equal(this.featureManager.getFeatures([this.featureDescriptor01])[0].getName(), this.feature01Name);
          });
  
          it('should return all features which match (multiple feature)', () => {
            this.featureManager.addFeature(this.feature01);
            this.featureManager.addFeature(this.feature02);
  
            assert.equal(this.featureManager.getFeatures([this.featureDescriptor01]).length, 1);
            assert.equal(this.featureManager.getFeatures([this.featureDescriptor02]).length, 1);
            assert.equal(this.featureManager.getFeatures([this.featureDescriptor01, this.featureDescriptor02]).length, 2);
            assert.equal(this.featureManager.getFeatures([this.featureDescriptor01, this.featureDescriptor02, new FeatureDescriptor(new Feature('unknownFeatureName'))]).length, 2);
          });

        });
  
      });

    });

    describe('addFeatures()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should add features by Feature[]', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);
    
        // Add a feature
        this.featureManager.addFeatures([new Feature(this.featureName, this.featureEnabled)]);
    
        // Check for equality
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });

      it('should add features by FeatureDescriptor[]', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);
    
        // Add a feature
        this.featureManager.addFeatures([new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled))]);
    
        // Check for equality
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });
      
      it('should add features by FeatureDescriptor[] (override feature value)', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);
    
        // Add a feature
        this.featureManager.addFeatures([new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled), !this.featureEnabled)]);
    
        // Check for equality
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), !this.featureEnabled);
      });

      // it('should add features by featureish[]', () => {
      //   // Base assumption
      //   assert.equal(this.featureManager.getFeature(this.featureName), null);
    
      //   // Add a feature
      //   this.featureManager.addFeatures([{name: this.featureName, enabled: this.featureEnabled}]);
    
      //   // Check for equality
      //   assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
      //   assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      // });

      it('should add features by () => Feature[]', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);
    
        // Add a feature
        this.featureManager.addFeatures(() => [new Feature(this.featureName, this.featureEnabled)]);
    
        // Check for equality
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });

      it('should add features by () => FeatureDescriptor[]', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);
    
        // Add a feature
        this.featureManager.addFeatures(() => [new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled))]);
    
        // Check for equality
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });

      // it('should add features by () => featureish[]', () => {
      //   // Base assumption
      //   assert.equal(this.featureManager.getFeature(this.featureName), null);
    
      //   // Add a feature
      //   this.featureManager.addFeature(() => [{name: this.featureName, enabled: this.featureEnabled}]);
    
      //   // Check for equality
      //   assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
      //   assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      // });

    });

    describe('addFeature()', () => {
  
      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should add a feature by Feature', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);
    
        // Add a feature
        this.featureManager.addFeature(new Feature(this.featureName, this.featureEnabled));
    
        // Check for equality
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });

      it('should add a feature by Feature (unspecified feature value)', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);
    
        // Add a feature
        this.featureManager.addFeature(new Feature(this.featureName), this.featureEnabled);
    
        // Check for equality
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });
      
      it('should add a feature by FeatureDescriptor', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);
    
        // Add a feature
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled)));
    
        // Check for equality
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });
      
      it('should add a feature by FeatureDescriptor (override feature value)', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);
    
        // Add a feature
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled), !this.featureEnabled));
    
        // Check for equality
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), !this.featureEnabled);
      });

      it('should add a feature by featureish', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);
    
        // Add a feature
        this.featureManager.addFeature({name: this.featureName, enabled: this.featureEnabled});
    
        // Check for equality
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });

      it('should add a feature by () => Feature', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);
    
        // Add a feature
        this.featureManager.addFeature(() => new Feature(this.featureName, this.featureEnabled));
    
        // Check for equality
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });

      it('should add a feature by () => FeatureDescriptor', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);
    
        // Add a feature
        this.featureManager.addFeature(() => new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled)));
    
        // Check for equality
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });

      it('should add a feature by () => featureish', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);
    
        // Add a feature
        this.featureManager.addFeature(() => {return {name: this.featureName, enabled: this.featureEnabled}});
    
        // Check for equality
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);
      });
        
    });

    describe('removeFeature()', () => {
      
      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should remove feature by string', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);
      
        this.featureManager.addFeature(new Feature(this.featureName, this.featureEnabled));

        // Check for equality
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);

        // Remove the feature
        this.featureManager.removeFeature(this.featureName);

        // Check that the feature has been removed
        assert.equal(this.featureManager.getFeature(this.featureName), null);
      });

      it('should remove feature by Feature (same reference)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);

        // Base assumption
        assert.equal(this.featureManager.getFeature(feature.getName()), null);

        // Add the feature
        this.featureManager.addFeature(feature);

        // Check for equality
        assert.equal(this.featureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        this.featureManager.removeFeature(feature);

        // Check that the feature has been removed
        assert.equal(this.featureManager.getFeature(feature.getName()), null);
      });

      it('should remove feature by Feature (different reference)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);
        let newFeature = new Feature(feature.getName(), feature.isEnabled());

        // Base assumption
        assert.equal(this.featureManager.getFeature(feature.getName()), null);

        // Add the feature
        this.featureManager.addFeature(feature);

        // Check for equality
        assert.equal(this.featureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        this.featureManager.removeFeature(newFeature);

        // Check that the feature has been removed
        assert.equal(this.featureManager.getFeature(feature.getName()), null);
      });

      it('should remove feature by FeatureDescriptor (same reference)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);
        let featureDescriptor = new FeatureDescriptor(feature);

        // Base assumption
        assert.equal(this.featureManager.getFeature(feature.getName()), null);

        // Add the feature
        this.featureManager.addFeature(featureDescriptor);

        // Check for equality
        assert.equal(this.featureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        this.featureManager.removeFeature(featureDescriptor);

        // Check that the feature has been removed
        assert.equal(this.featureManager.getFeature(feature.getName()), null);
      });

      it('should remove feature by FeatureDescriptor (new reference)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);
        let newFeature = new Feature(feature.getName(), feature.isEnabled());
        let featureDescriptor = new FeatureDescriptor(feature);
        let newFeatureDescriptor = new FeatureDescriptor(newFeature);

        // Base assumption
        assert.equal(this.featureManager.getFeature(feature.getName()), null);

        // Add the feature
        this.featureManager.addFeature(featureDescriptor);

        // Check for equality
        assert.equal(this.featureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        this.featureManager.removeFeature(newFeatureDescriptor);

        // Check that the feature has been removed
        assert.equal(this.featureManager.getFeature(feature.getName()), null);
      });
      
      it('should remove feature by () => string)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);

        // Base assumption
        assert.equal(this.featureManager.getFeature(feature.getName()), null);

        // Add the feature
        this.featureManager.addFeature(feature);

        // Check for equality
        assert.equal(this.featureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        this.featureManager.removeFeature(() => feature.getName());

        // Check that the feature has been removed
        assert.equal(this.featureManager.getFeature(feature.getName()), null);
      });

      it('should remove feature by () => Feature)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);

        // Base assumption
        assert.equal(this.featureManager.getFeature(feature.getName()), null);

        // Add the feature
        this.featureManager.addFeature(feature);

        // Check for equality
        assert.equal(this.featureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        this.featureManager.removeFeature(() => feature);

        // Check that the feature has been removed
        assert.equal(this.featureManager.getFeature(feature.getName()), null);        
      });

      it('should remove feature by () => FeatureDescriptor)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);

        // Base assumption
        assert.equal(this.featureManager.getFeature(feature.getName()), null);

        // Add the feature
        this.featureManager.addFeature(feature);

        // Check for equality
        assert.equal(this.featureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        this.featureManager.removeFeature(() => new FeatureDescriptor(feature));

        // Check that the feature has been removed
        assert.equal(this.featureManager.getFeature(feature.getName()), null);
      });

    });

    describe('removeFeatures()', () => {
      
      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should remove features by string', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);
      
        this.featureManager.addFeature(new Feature(this.featureName, this.featureEnabled));

        // Check for equality
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);

        // Remove the feature
        this.featureManager.removeFeatures([this.featureName]);

        // Check that the feature has been removed
        assert.equal(this.featureManager.getFeature(this.featureName), null);
      });

      it('should remove features by Feature (same reference)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);

        // Base assumption
        assert.equal(this.featureManager.getFeature(feature.getName()), null);

        // Add the feature
        this.featureManager.addFeature(feature);

        // Check for equality
        assert.equal(this.featureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        this.featureManager.removeFeatures([feature]);

        // Check that the feature has been removed
        assert.equal(this.featureManager.getFeature(feature.getName()), null);
      });

      it('should remove features by Feature (different reference)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);
        let newFeature = new Feature(feature.getName(), feature.isEnabled());

        // Base assumption
        assert.equal(this.featureManager.getFeature(feature.getName()), null);

        // Add the feature
        this.featureManager.addFeature(feature);

        // Check for equality
        assert.equal(this.featureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        this.featureManager.removeFeatures([newFeature]);

        // Check that the feature has been removed
        assert.equal(this.featureManager.getFeature(feature.getName()), null);
      });

      it('should remove features by FeatureDescriptor (same reference)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);
        let featureDescriptor = new FeatureDescriptor(feature);

        // Base assumption
        assert.equal(this.featureManager.getFeature(feature.getName()), null);

        // Add the feature
        this.featureManager.addFeature(featureDescriptor);

        // Check for equality
        assert.equal(this.featureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        this.featureManager.removeFeatures([featureDescriptor]);

        // Check that the feature has been removed
        assert.equal(this.featureManager.getFeature(feature.getName()), null);
      });

      it('should remove features by FeatureDescriptor (new reference)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);
        let newFeature = new Feature(feature.getName(), feature.isEnabled());
        let featureDescriptor = new FeatureDescriptor(feature);
        let newFeatureDescriptor = new FeatureDescriptor(newFeature);

        // Base assumption
        assert.equal(this.featureManager.getFeature(feature.getName()), null);

        // Add the feature
        this.featureManager.addFeature(featureDescriptor);

        // Check for equality
        assert.equal(this.featureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        this.featureManager.removeFeatures([newFeatureDescriptor]);

        // Check that the feature has been removed
        assert.equal(this.featureManager.getFeature(feature.getName()), null);
      });
      
      it('should remove features by () => string)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);

        // Base assumption
        assert.equal(this.featureManager.getFeature(feature.getName()), null);

        // Add the feature
        this.featureManager.addFeature(feature);

        // Check for equality
        assert.equal(this.featureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        this.featureManager.removeFeatures(() => [feature.getName()]);

        // Check that the feature has been removed
        assert.equal(this.featureManager.getFeature(feature.getName()), null);
      });

      it('should remove features by () => Feature)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);

        // Base assumption
        assert.equal(this.featureManager.getFeature(feature.getName()), null);

        // Add the feature
        this.featureManager.addFeature(feature);

        // Check for equality
        assert.equal(this.featureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        this.featureManager.removeFeatures(() => [feature]);

        // Check that the feature has been removed
        assert.equal(this.featureManager.getFeature(feature.getName()), null);        
      });

      it('should remove feature by () => FeatureDescriptor)', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);

        // Base assumption
        assert.equal(this.featureManager.getFeature(feature.getName()), null);

        // Add the feature
        this.featureManager.addFeature(feature);

        // Check for equality
        assert.equal(this.featureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        // Remove the feature
        this.featureManager.removeFeatures(() => [new FeatureDescriptor(feature)]);

        // Check that the feature has been removed
        assert.equal(this.featureManager.getFeature(feature.getName()), null);
      });

    });

    describe('removeAllFeatures()', () => {

      it('should remove all features', () => {
        let feature = new Feature(this.featureName, this.featureEnabled);

        // Base assumption
        assert.equal(this.featureManager.getFeature(feature.getName()), null);

        // Add the feature
        this.featureManager.addFeature(feature);

        // Check for equality
        assert.equal(this.featureManager.getFeature(feature.getName()).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(feature.getName()).isEnabled(), this.featureEnabled);

        this.featureManager.removeAllFeatures();

        // Check that the feature has been removed
        assert.equal(this.featureManager.getAllFeatures().length, 0);
      });

    });

    describe('hasFeature()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should return false when no such feature is known', () => {
        assert.equal(this.featureManager.hasFeature(this.featureName), false);
      });

      it('should return true when a feature is known', () => {
        this.featureManager.addFeature(new Feature(this.featureName, this.featureEnabled));
        assert.equal(this.featureManager.hasFeature(this.featureName), true);
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
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName), this.featureValue));

        // Check the value
        assert.equal(this.featureManager.hasValue(this.featureName), false);
      });

      it('should return true when a value has been assigned', () => {
        // Add a feature
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName)), this.featureValue);

        // Check the value
        assert.equal(this.featureManager.hasValue(this.featureName), true);
      });

      it('should return true when a null value has been assigned', () => {
        // Add a feature
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName)), null);

        // Check the value
        assert.equal(this.featureManager.hasValue(this.featureName), true);
      });

    });

    describe('isEnabled()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
        this.featureValue = {someValueName: 'someValueValue'};
      });

      it('should throw an error when an unknown feature is requested', () => {
        assert.throw(() => this.featureManager.isEnabled(this.featureName));
      });

      it('should return true when the feature is enabled', () => {
        this.featureManager.addFeature(new Feature(this.featureName, true));
        assert.isTrue(this.featureManager.isEnabled(this.featureName));
      });

      it('should return false when the feature is not enabled', () => {
        this.featureManager.addFeature(new Feature(this.featureName, false));
        assert.isFalse(this.featureManager.isEnabled(this.featureName));
      });

    });

    describe('isDisabled()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should throw an error when an unknown feature is requested', () => {
        assert.throw(() => this.featureManager.isDisabled(this.featureName));
      });

      it('should return false when the feature is enabled', () => {
        this.featureManager.addFeature(new Feature(this.featureName, true));
        assert.isFalse(this.featureManager.isDisabled(this.featureName));
      });

      it('should return true when the feature is not enabled', () => {
        this.featureManager.addFeature(new Feature(this.featureName, false));
        assert.isTrue(this.featureManager.isDisabled(this.featureName));
      });

    });

    describe('canEnable()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should throw an error when an unknown feature is requested', () => {
        assert.throw(() => this.featureManager.canEnable(this.featureName));
      });

      it('should return true if the feature can be enabled', () => {
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled), undefined, null, -1), undefined, -1);
        assert.isTrue(this.featureManager.canEnable(this.featureName));
      });

      it('should return true if the feature can be enabled', () => {
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled), undefined, null, -1), undefined, 1);
        assert.isTrue(this.featureManager.canEnable(this.featureName));
      });

      it('should return false if the feature cannot be enabled', () => {
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled)));
        assert.isFalse(this.featureManager.canEnable(this.featureName));
      });

    });

    describe('canDisable()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should throw an error when an unknown feature is requested', () => {
        assert.throw(() => this.featureManager.canDisable(this.featureName));
      });

      it('should return true if the feature can be disabled', () => {
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled), undefined, null, -1), undefined, -1);
        assert.isTrue(this.featureManager.canDisable(this.featureName));
      });

      it('should return true if the feature can be disabled', () => {
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled), undefined, null, -1), undefined, 1);
        assert.isTrue(this.featureManager.canDisable(this.featureName));
      });

      it('should return false if the feature cannot be disabled', () => {
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled)));
        assert.isFalse(this.featureManager.canDisable(this.featureName));
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
        assert.throw(() => this.featureManager.enable(this.enabledFeatureName));
      });

      it('should enable a previously disabled feature', () => {
        // Add the feature
        this.featureManager.addFeature(new FeatureDescriptor(this.disabledFeature), null, 1);

        // Assert that the feature is disabled
        assert.isFalse(this.featureManager.getFeature(this.disabledFeature).isEnabled());
        assert.isFalse(this.featureManager.isEnabled(this.disabledFeature));

        // Enable the feature
        this.featureManager.enable(this.disabledFeature);

        // Assert that the feature is enabled
        assert.isTrue(this.featureManager.getFeature(this.disabledFeature).isEnabled());
        assert.isTrue(this.featureManager.isEnabled(this.disabledFeature));
      });

      it('should enable a previously enabled feature', () => {
        // Add the feature
        this.featureManager.addFeature(new FeatureDescriptor(this.enabledFeature), null, 1);

        // Assert that the feature is enabled
        assert.isTrue(this.featureManager.getFeature(this.enabledFeature).isEnabled());
        assert.isTrue(this.featureManager.isEnabled(this.enabledFeature));

        // Enable the feature
        this.featureManager.enable(this.enabledFeature);

        // Assert that the feature is enabled
        assert.isTrue(this.featureManager.getFeature(this.enabledFeature).isEnabled());
        assert.isTrue(this.featureManager.isEnabled(this.enabledFeature));
      });

      it('should throw when trying to enable a feature which cannot be enabled', () => {
        // Add the feature
        this.featureManager.addFeature(new FeatureDescriptor(this.disabledFeature), null, 0);

        // Enable the feature
        assert.throw(() => this.featureManager.enable(this.disabledFeature));
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
        assert.throw(() => this.featureManager.enable(this.enabledFeatureName));
      });

      it('should disable a previously disabled feature', () => {
        // Add the feature
        this.featureManager.addFeature(new FeatureDescriptor(this.disabledFeature), null, 1);

        // Assert that the feature is disabled
        assert.isFalse(this.featureManager.getFeature(this.disabledFeature).isEnabled());
        assert.isFalse(this.featureManager.isEnabled(this.disabledFeature));

        // Disable the feature
        this.featureManager.disable(this.disabledFeature);

        // Assert that the feature is enabled
        assert.isFalse(this.featureManager.getFeature(this.disabledFeature).isEnabled());
        assert.isFalse(this.featureManager.isEnabled(this.disabledFeature));
      });

      it('should disable a previously enabled feature', () => {
        // Add the feature
        this.featureManager.addFeature(new FeatureDescriptor(this.enabledFeature), null, 1);

        // Assert that the feature is enabled
        assert.isTrue(this.featureManager.getFeature(this.enabledFeature).isEnabled());
        assert.isTrue(this.featureManager.isEnabled(this.enabledFeature));

        // Disable the feature
        this.featureManager.disable(this.enabledFeature);

        // Assert that the feature is enabled
        assert.isFalse(this.featureManager.getFeature(this.enabledFeature).isEnabled());
        assert.isFalse(this.featureManager.isEnabled(this.enabledFeature));
      });

      it('should throw when trying to disable a feature which cannot be disabled', () => {
        // Add the feature
        this.featureManager.addFeature(new FeatureDescriptor(this.disabledFeature), null, 0);

        // Enable the feature
        assert.throw(() => this.featureManager.disable(this.disabledFeature));
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
        assert.throw(() => this.featureManager.canSetEnabled(this.enabledFeatureName));
      });

      it('should return false when an enabled feature cannot be set enabled', () => {
        // Add the feature
        this.featureManager.addFeature(this.enabledFeature);

        // Assertion
        assert.isFalse(this.featureManager.canSetEnabled(this.enabledFeature));
      });

      it('should return false when a enabled feature cannot be set enabled', () => {
        // Add the feature
        this.featureManager.addFeature(this.disabledFeature);

        // Assertion
        assert.isFalse(this.featureManager.canSetEnabled(this.disabledFeature));
      });

      it('should return false when an enabled feature can be set enabled', () => {
        // Add the feature
        this.featureManager.addFeature(this.enabledFeature, null, -1);

        // Assertion
        assert.isTrue(this.featureManager.canSetEnabled(this.enabledFeature));
      });

      it('should return false when a enabled feature can be set enabled', () => {
        // Add the feature
        this.featureManager.addFeature(this.disabledFeature, null, -1);

        // Assertion
        assert.isTrue(this.featureManager.canSetEnabled(this.disabledFeature));
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
        assert.throw(() => this.featureManager.setEnabled(this.enabledFeatureName, true));
      });

      it('should throw when requested to set enabled a feature which cannot be set', () => {
        this.featureManager.addFeature(this.enabledFeature);
        assert.throw(() => this.featureManager.setEnabled(this.enabledFeature, false));
      });

      it('should set enabled when requested to set enabled a feature which can be set', () => {
        // Add the feature
        this.featureManager.addFeature(this.enabledFeature, undefined, 1);

        // Check that the feature is enabled
        assert.isTrue(this.featureManager.isEnabled(this.enabledFeature));

        // Set the feature to be disabled
        this.featureManager.setEnabled(this.enabledFeature, false);

        // Check that the feature is disabled
        assert.isFalse(this.featureManager.isEnabled(this.enabledFeature));
      });

      it('should not allow more than the specified number of sets', () => {
        let toggleCount = 5;
        // Add the feature
        this.featureManager.addFeature(this.enabledFeature, undefined, toggleCount);

        // Check that the feature is enabled
        assert.isTrue(this.featureManager.isEnabled(this.enabledFeature));

        for (let i=0; i<toggleCount; i++) {
          // Toggle the feature
          this.featureManager.setEnabled(this.enabledFeature, !this.featureManager.isEnabled(this.enabledFeature));
        }

        // The next set should fail
        assert.throw(() => this.featureManager.setEnabled(this.enabledFeature, !this.featureManager.isEnabled(this.enabledFeature)));
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
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName), this.featureValue));

        // Check the value
        assert.equal(this.featureManager.getValue(this.featureName), undefined);
      });

      it('should return the assigned value', () => {
        // Add a feature
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName), this.featureValue), this.featureValue);

        // Check the value
        assert.equal(this.featureManager.getValue(this.featureName), this.featureValue);
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
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName), this.featureValue));

        // Check the value
        assert.equal(this.featureManager.getValue(this.featureName), undefined);
      });

      it('should return the assigned value', () => {
        // Add a feature
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName), this.featureValue), this.featureValue);

        // Check the value
        assert.equal(this.featureManager.getValue(this.featureName), this.featureValue);
      });

    });

    describe('getAllFeatures()', () => {

      it('should return the emtpy array when no features have been added', () => {
        assert.equal(this.featureManager.getAllFeatures().length, 0);
      });

      it('should return all the features added to the FeatureManager', () => {
        let feature1 = new Feature('feature1', true);
        let feature2 = new Feature('feature2', false);

        this.featureManager.addFeature(feature1);
        this.featureManager.addFeature(feature2);

        assert.equal(this.featureManager.getAllFeatures().length, 2);

        assert.deepEqual(_.find(this.featureManager.getAllFeatures(), (feature:Feature) => feature.getName() === feature1.getName()), feature1);
        assert.deepEqual(_.find(this.featureManager.getAllFeatures(), (feature:Feature) => feature.getName() === feature2.getName()), feature2);
      });

    });

    describe('Enabled Function Execution', () => {

      beforeEach(() => {
        this.HAS_RUN = 'HAS_RUN';
        this.HAS_NOT_RUN = 'HAS_NOT_RUN';
        this.enabledFeature = new Feature('enabledFeature', true);
        this.disabledFeature = new Feature('disabledFeature', false);
        // this.fn = () => this.HAS_RUN;
        this.fn = () => {
          return this.HAS_RUN;
        };

        this.featureManager.addFeatures([this.enabledFeature, this.disabledFeature]);
      });

      describe('ifEnabled()', () => {

        it('should execute the function if the feature is enabled', () => {
          assert.equal(this.featureManager.ifEnabled(this.enabledFeature, this.fn), this.HAS_RUN);
        });

        it('should not execute the function if the feature is disabled', () => {
          assert.equal(this.featureManager.ifEnabled(this.disabledFeature, this.fn, null, this.HAS_NOT_RUN), this.HAS_NOT_RUN);
        });

      });

      describe('ifDisabled()', () => {

        it('should not execute the function if the feature is enabled', () => {
          assert.equal(this.featureManager.ifDisabled(this.enabledFeature, this.fn, null, this.HAS_NOT_RUN), this.HAS_NOT_RUN);
        });

        it('should execute the function if the feature is disabled', () => {
          assert.equal(this.featureManager.ifDisabled(this.disabledFeature, this.fn), this.HAS_RUN);
        });

      });

    });

    describe('createFeature()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should create a feature using a string and a boolean', () => {
        let createdFeature = this.featureManager.createFeature(this.featureName, this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using a string and () => boolean', () => {
        let createdFeature = this.featureManager.createFeature(this.featureName, () => this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using a Feature and a boolean', () => {
        let createdFeature = this.featureManager.createFeature(new Feature(this.featureName, !this.featureEnabled), this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using a Feature and () => boolean', () => {
        let createdFeature = this.featureManager.createFeature(new Feature(this.featureName, !this.featureEnabled), () => this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using a FeatureDescriptor and a boolean', () => {
        let createdFeature = this.featureManager.createFeature(new FeatureDescriptor(new Feature(this.featureName, !this.featureEnabled)), this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using a FeatureDescriptor and () => boolean', () => {
        let createdFeature = this.featureManager.createFeature(new FeatureDescriptor(new Feature(this.featureName, !this.featureEnabled)), () => this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using () => string and a boolean', () => {
        let createdFeature = this.featureManager.createFeature(() => this.featureName, this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using () => string and () => boolean', () => {
        let createdFeature = this.featureManager.createFeature(() => this.featureName, () => this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using () => Feature and a boolean', () => {
        let createdFeature = this.featureManager.createFeature(() => new Feature(this.featureName, !this.featureEnabled), this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using () => Feature and () => boolean', () => {
        let createdFeature = this.featureManager.createFeature(() => new Feature(this.featureName, !this.featureEnabled), () => this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using () => FeatureDescriptor and a boolean', () => {
        let createdFeature = this.featureManager.createFeature(() => new FeatureDescriptor(new Feature(this.featureName, !this.featureEnabled)), this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

      it('should create a feature using () => FeatureDescriptor and () => boolean', () => {
        let createdFeature = this.featureManager.createFeature(() => new FeatureDescriptor(new Feature(this.featureName, !this.featureEnabled)), () => this.featureEnabled);

        assert.equal(createdFeature.getName(), this.featureName);
        assert.equal(createdFeature.isEnabled(), this.featureEnabled);
      });

    });

      describe('Context', () => {

          describe('setContext()', () => {

              it('should set the context', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(this.featureManager.getContext(), {});

                  // Set the context
                  this.featureManager.setContext(context);

                  // Assert that the two contexts are strictly equal
                  assert.deepEqual(this.featureManager.getContext(), context);
              });

              it('should use the set context during addSource()', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(this.featureManager.getContext(), {});

                  // Set the context
                  this.featureManager.setContext(context);

                  this.featureManager.addSource(this.sourceName, (passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return [new Feature(this.featureName, this.featureDescriptor)];
                  });

              });

              it('should use the set context during setFeatures()', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(this.featureManager.getContext(), {});

                  // Set the context
                  this.featureManager.setContext(context);

                  this.featureManager.setFeatures((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return [new Feature(this.featureName, this.featureDescriptor)];
                  });

              });

              it('should use the set context during addFeature()', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(this.featureManager.getContext(), {});

                  // Set the context
                  this.featureManager.setContext(context);

                  this.featureManager.addFeature((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return new Feature(this.featureName, this.featureDescriptor);
                  });

              });

              it('should use the set context during addFeatures()', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(this.featureManager.getContext(), {});

                  // Set the context
                  this.featureManager.setContext(context);

                  this.featureManager.addFeatures((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return [new Feature(this.featureName, this.featureDescriptor)];
                  });

              });

              it('should use the set context during removeFeature()', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(this.featureManager.getContext(), {});

                  // Set the context
                  this.featureManager.setContext(context);

                  this.featureManager.removeFeature((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return this.featureName;
                  });

              });

              it('should use the set context during removeFeatures()', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(this.featureManager.getContext(), {});

                  // Set the context
                  this.featureManager.setContext(context);

                  this.featureManager.removeFeatures((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return [this.featureName];
                  });

              });

              it('should use the set context during removeFeatures()', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(this.featureManager.getContext(), {});

                  // Set the context
                  this.featureManager.setContext(context);

                  this.featureManager.removeFeatures((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return [this.featureName];
                  });

              });

              it('should use the set context during getFeature()', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(this.featureManager.getContext(), {});

                  // Set the context
                  this.featureManager.setContext(context);

                  this.featureManager.getFeature((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return this.featureName;
                  });

              });

              it('should use the set context during getFeatures()', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(this.featureManager.getContext(), {});

                  // Set the context
                  this.featureManager.setContext(context);

                  this.featureManager.getFeatures((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return [this.featureName];
                  });

              });

              it('should use the set context during setValue()', () => {
                  let context = {someValue: true};
                  let feature = new Feature(this.featureName, this.featureEnabled);

                  // Check the initial context
                  assert.deepEqual(this.featureManager.getContext(), {});

                  // Set the context
                  this.featureManager.setContext(context);

                  // Add the feature
                  this.featureManager.addFeature(feature);

                  this.featureManager.setValue(feature, (passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return [feature.getName()];
                  });

              });

              it('should use the set context during isEnabled()', () => {
                  let context = {someValue: true};
                  let feature = new Feature(this.featureName, this.featureEnabled);

                  // Check the initial context
                  assert.deepEqual(this.featureManager.getContext(), {});

                  // Set the context
                  this.featureManager.setContext(context);

                  // Add the feature
                  this.featureManager.addFeature(feature);

                  this.featureManager.isEnabled(feature, (passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                  });

              });

              it('should use the set context during canEnable()', () => {
                  let context = {someValue: true};
                  let feature = new Feature(this.featureName, this.featureEnabled);

                  // Check the initial context
                  assert.deepEqual(this.featureManager.getContext(), {});

                  // Set the context
                  this.featureManager.setContext(context);

                  // Add the feature
                  this.featureManager.addFeature(feature);

                  this.featureManager.canEnable((passedContext: any) => {
                      assert.deepEqual(passedContext, context);
                      return feature;
                  });

              });

              it('should use the set context during canDisable()', () => {
                  let context = {someValue: true};
                  let feature = new Feature(this.featureName, this.featureEnabled);

                  // Check the initial context
                  assert.deepEqual(this.featureManager.getContext(), {});

                  // Set the context
                  this.featureManager.setContext(context);

                  // Add the feature
                  this.featureManager.addFeature(feature);

                  this.featureManager.canDisable((passedContext: any) => {
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
                  // assert.deepEqual(this.featureManager.getContext(), {});

                  // Set the context
                  // this.featureManager.setContext(context);

                  // Add the feature
                  //this.featureManager.addFeature(new FeatureDescriptor(feature, feature.isEnabled(), null, -1));
                  this.featureManager.addFeature(feature);

                  // this.featureManager.enable((passedContext: any) => {
                  //   assert.deepEqual(passedContext, context);
                  //   return feature;
                  // });

              });

              // it('should use the set context during disable()', () => {
              //   let context = {someValue: true};
              //   let feature = new Feature(this.featureName, this.featureEnabled);

              //   // Check the initial context
              //   assert.deepEqual(this.featureManager.getContext(), {});

              //   // Set the context
              //   this.featureManager.setContext(context);

              //   // Add the feature
              //   this.featureManager.addFeature(feature);

              //   this.featureManager.disable((passedContext: any) => {
              //     assert.deepEqual(passedContext, context);
              //     return feature;
              //   });

              // });


          });

          describe('getContext()', () => {

              it('should get the context which was set', () => {
                  let context = {someValue: true};

                  // Check the initial context
                  assert.deepEqual(this.featureManager.getContext(), {});

                  // Set the context
                  this.featureManager.setContext(context);

                  // Assert that the two contexts are strictly equal
                  assert.deepEqual(this.featureManager.getContext(), context);
              });

          });

      });

  });

});
