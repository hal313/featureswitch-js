import { assert } from 'chai';
import { FeatureManager, Feature, FeatureDescriptor } from '../src/index';
import * as _ from 'lodash';
import * as sinon from 'sinon';

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

    describe('getFeature()', () => {

      beforeEach(() => {
        this.feature01Name = 'feature01Name';
        this.feature01Enabled = true;

        this.feature02Name = 'feature02Name';
        this.feature02Enabled = true;

        this.feature01 = new Feature(this.feature01Name, this.feature01Enabled);
        this.feature02 = new Feature(this.feature02Name, this.feature02Enabled);

        this.feature01Descriptor = new FeatureDescriptor(this.feature01);
        this.feature02Descriptor = new FeatureDescriptor(this.feature02);
      });

      it('should return null when a feature is not known', () => {
        assert.isNull(this.featureManager.getFeature(this.feature01Name));
      });

      it('should return the feature when a feature is known by string', () => {
        this.featureManager.addFeature(this.feature01);
        assert.deepEqual(this.featureManager.getFeature(this.feature01.getName()), this.feature01);
      });

      it('should return the feature when a feature is known by Feature', () => {
        this.featureManager.addFeature(this.feature01);
        assert.deepEqual(this.featureManager.getFeature(this.feature01), this.feature01);
      });

      it('should return the feature when a feature is known by FeatureDescriptor', () => {
        this.featureManager.addFeature(this.feature01);
        assert.deepEqual(this.featureManager.getFeature(this.feature01Descriptor), this.feature01);
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

        assert.deepEqual(_.find(this.featureManager.getAllFeatures(), (feature: Feature) => feature.getName() === feature1.getName()), feature1);
        assert.deepEqual(_.find(this.featureManager.getAllFeatures(), (feature: Feature) => feature.getName() === feature2.getName()), feature2);
      });

    });

    describe('addFeatures()', () => {

      beforeEach(() => {
        this.featureName = 'someFeatureName';
        this.featureEnabled = true;
      });

      it('should fail when multiple features are added with the same name', () => {
        // Base assumption
        assert.equal(this.featureManager.getFeature(this.featureName), null);
    
        // Add a feature
        this.featureManager.addFeatures([new Feature(this.featureName, this.featureEnabled)]);

        // Add a feature
        assert.throw(() => {this.featureManager.addFeatures([new Feature(this.featureName, !this.featureEnabled)]);});
            
        // Check for equality
        assert.equal(this.featureManager.getFeature(this.featureName).getName(), this.featureName);
        assert.equal(this.featureManager.getFeature(this.featureName).isEnabled(), this.featureEnabled);        
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
        this.featureManager.addFeature(new Feature(this.featureName, this.featureEnabled));
    
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
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName)));

        // Check the value
        assert.isFalse(this.featureManager.hasValue(this.featureName));
      });

      it('should return true when a value has been assigned', () => {
        // Add a feature
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName), null, this.featureValue));

        // Check the value
        assert.equal(this.featureManager.hasValue(this.featureName), true);
      });

      it('should return true when a null value has been assigned', () => {
        // Add a feature
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName), null, null));

        // Check the value
        assert.isFalse(this.featureManager.hasValue(this.featureName));
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

    describe('enable()', () => {

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
        this.featureManager.addFeature(new FeatureDescriptor(this.disabledFeature, null, null, 1));

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
        this.featureManager.addFeature(new FeatureDescriptor(this.enabledFeature, null, null, 1));

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
        this.featureManager.addFeature(new FeatureDescriptor(this.disabledFeature, null, null, -1));

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
        this.featureManager.addFeature(new FeatureDescriptor(this.enabledFeature, null, null, -1));

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
        this.featureManager.addFeature(new FeatureDescriptor(this.enabledFeature, null, null, -1));

        // Assertion
        assert.isTrue(this.featureManager.canSetEnabled(this.enabledFeature));
      });

      it('should return false when a enabled feature can be set enabled', () => {
        // Add the feature
        this.featureManager.addFeature(new FeatureDescriptor(this.disabledFeature, null, null, -1));

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
        this.featureManager.addFeature(new FeatureDescriptor(this.enabledFeature, null, null, 1));

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
        this.featureManager.addFeature(new FeatureDescriptor(this.enabledFeature, null, null, toggleCount));

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
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName), this.featureEnabled, this.featureValue));

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
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName)));

        // Check the value
        assert.equal(this.featureManager.getValue(this.featureName), undefined);
      });

      it('should return the assigned value', () => {
        // Add a feature
        this.featureManager.addFeature(new FeatureDescriptor(new Feature(this.featureName, this.featureEnabled), null, this.featureValue, -1));

        // Check the value
        assert.equal(this.featureManager.getValue(this.featureName), this.featureValue);
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

    describe('Enabled Function Execution', () => {

      beforeEach(() => {
        this.HAS_RUN = 'HAS_RUN';
        this.HAS_NOT_RUN = 'HAS_NOT_RUN';
        this.enabledFeature = new Feature('enabledFeature', true);
        this.disabledFeature = new Feature('disabledFeature', false);
        this.fn = () => this.HAS_RUN;

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

    describe('Context', () => {

      describe('setContext()', () => {

        it('should throw an error when the context has a function member', () => {
          let context = {
            someName: 'someValue',
            someFn: () => { }
          };
          assert.throws(() => this.featureManager.setContext(context));
        });

        it('should start with an empty context', () => {
          assert.deepEqual(this.featureManager.getContext(), {});
        });

        it('should set the context', () => {
          let context = { someValue: true };

          // Check the initial context
          assert.deepEqual(this.featureManager.getContext(), {});

          // Set the context
          this.featureManager.setContext(context);

          // Assert that the two contexts are strictly equal
          assert.deepEqual(this.featureManager.getContext(), context);
        });

        describe('Callbacks called With Context', () => {

          beforeEach(() => {
            this.context = { someValue: true };
            this.featureName = 'featureName';
            this.featureEnabled = true;
            this.feature = new Feature(this.featureName, this.featureEnabled);
            this.featureDescriptor = new FeatureDescriptor(this.feature, null, null, -1);
            this.callbackSpy = sinon.spy((passedContext: any) => {
              assert.deepEqual(passedContext, this.context);
              // Return any value which has been set on this function as member 'returnValue'
              return this.callbackSpy.returnValue;
            });

            // Set the context
            this.featureManager.setContext(this.context);

            // Add the feature
            this.featureManager.addFeature(this.featureDescriptor);
          });

          afterEach(() => {
            assert.isTrue(this.callbackSpy.called);
          });

          it('should use the set context during addSource()', () => {
            this.callbackSpy.returnValue = [new Feature(this.featureName + '2', this.featureDescriptor)];
            this.featureManager.addSource('someSourceName', this.callbackSpy);
          });

          it('should use the set context during setFeatures()', () => {
            this.callbackSpy.returnValue = [new Feature(this.featureName + '2', this.featureDescriptor)];
            this.featureManager.setFeatures(this.callbackSpy);
          });

          it('should use the set context during addFeature()', () => {
            this.callbackSpy.returnValue = new Feature(this.featureName+ '2', this.featureDescriptor);
            this.featureManager.addFeature(this.callbackSpy);
          });

          it('should use the set context during addFeatures()', () => {
            //this.callbackSpy.returnValue = [new Feature(this.featureName, this.featureDescriptor)];
            this.featureManager.addFeatures(this.callbackSpy);
          });

          it('should use the set context during removeFeature()', () => {
            this.callbackSpy.returnValue = this.featureName;
            this.featureManager.removeFeature(this.callbackSpy);
          });

          it('should use the set context during removeFeatures()', () => {
            this.callbackSpy.returnValue = [this.featureName];
            this.featureManager.removeFeatures(this.callbackSpy);
          });

          it('should use the set context during getFeature()', () => {
            this.callbackSpy.returnValue = this.featureName;
            this.featureManager.getFeature(this.callbackSpy);
          });

          it('should use the set context during getFeatures()', () => {
            this.callbackSpy.returnValue = [this.featureName];
            this.featureManager.getFeatures(this.callbackSpy);
          });

          it('should use the set context during hasValue()', () => {
            this.callbackSpy.returnValue = this.feature;
            this.featureManager.hasValue(this.callbackSpy);
          });

          it('should use the set context during setValue() [as the feature identifier]', () => {
            this.callbackSpy.returnValue = this.feature;
            this.featureManager.setValue(this.callbackSpy, 'someValue');
          });

          it('should use the set context during setValue() [as the value producer]', () => {
            this.callbackSpy.returnValue = 'someValue';
            this.featureManager.setValue(this.feature, this.callbackSpy);
          });

          it('should use the set context during isEnabled()', () => {
            this.callbackSpy.returnValue = this.feature;
            this.featureManager.isEnabled(this.callbackSpy);
          });

          it('should use the set context during isDisabled()', () => {
            this.callbackSpy.returnValue = this.feature;
            this.featureManager.isDisabled(this.callbackSpy);
          });

          it('should use the set context during canEnable()', () => {
            this.callbackSpy.returnValue = this.feature;
            this.featureManager.canEnable(this.callbackSpy);
          });

          it('should use the set context during canDisable()', () => {
            this.callbackSpy.returnValue = this.feature;
            this.featureManager.canDisable(this.callbackSpy);
          });

          it('should use the set context during enable()', () => {
            this.callbackSpy.returnValue = this.feature;
            this.featureManager.enable(this.callbackSpy);
          });

          it('should use the set context during disable()', () => {
            this.callbackSpy.returnValue = this.feature;
            this.featureManager.disable(this.callbackSpy);
          });

          it('should use the set context during canSetEnabled()', () => {
            this.callbackSpy.returnValue = this.feature;
            this.featureManager.canSetEnabled(this.callbackSpy);
          });

          it('should use the set context during setEnabled()', () => {
            this.callbackSpy.returnValue = this.feature;
            this.featureManager.setEnabled(this.callbackSpy);
          });


          describe('ifEnabled()/ifDisabled()', () => {

            beforeEach(() => {
              this.enabledFeature = new Feature('enabledFeature', true);
              this.disabledFeature = new Feature('disabledFeature', false);
              this.featureManager.addFeatures([this.enabledFeature, this.disabledFeature]);
              this.HAS_RUN = 'HAS_RUN';
              this.HAS_NOT_RUN = 'HAS_NOT_RUN';
              this.fnSpy = sinon.spy(() => this.HAS_RUN);
            });

            describe('ifEnabled()', () => {

              it('should execute the function [feature identifier]', () => {
                this.callbackSpy.returnValue = this.enabledFeature;
                assert.equal(this.featureManager.ifEnabled(this.callbackSpy, this.fnSpy), this.HAS_RUN);
              });

              describe('Enabled Feature', () => {

                afterEach(() => {
                  assert.isTrue(this.fnSpy.called);
                });

                it('should execute the function if the feature is enabled [feature identifier]', () => {
                  this.callbackSpy.returnValue = this.enabledFeature;
                  assert.equal(this.featureManager.ifEnabled(this.callbackSpy, this.fnSpy), this.HAS_RUN);
                });

                it('should execute the function if the feature is enabled [argument]', () => {
                  assert.equal(this.featureManager.ifEnabled(this.enabledFeature, this.fnSpy, this.callbackSpy), this.HAS_RUN);
                });

              });

              describe('Disabled Feature', () => {

                afterEach(() => {
                  assert.isFalse(this.fnSpy.called);
                });

                it('should execute the function if the feature is disabled [default value]', () => {
                  this.callbackSpy.returnValue = this.HAS_RUN;
                  assert.equal(this.featureManager.ifEnabled(this.disabledFeature, this.fnSpy, null, this.callbackSpy), this.HAS_RUN);
                });

                it('should not execute the function if the feature is disabled [argument]', () => {
                  assert.isUndefined(this.featureManager.ifEnabled(this.disabledFeature, this.fnSpy, this.callbackSpy));
                  assert.isFalse(this.callbackSpy.called);
                  // A quirk in the setup requires this to be called so the afterEach conditional is met
                  this.callbackSpy(this.context);
                });

                it('should not execute the function if the feature is disabled [default value]', () => {
                  this.callbackSpy.returnValue = this.HAS_RUN;
                  assert.equal(this.featureManager.ifEnabled(this.disabledFeature, this.fnSpy, null, this.callbackSpy), this.HAS_RUN);
                });

              });

            });

            describe('ifDisabled()', () => {

              it('should execute the function [feature identifier]', () => {
                this.callbackSpy.returnValue = this.disabledFeature;
                assert.equal(this.featureManager.ifDisabled(this.callbackSpy, this.fnSpy), this.HAS_RUN);
              });

              describe('Disabled Feature', () => {
                
                afterEach(() => {
                  assert.isTrue(this.fnSpy.called);
                });

                it('should execute the function if the feature is disabled [feature identifier]', () => {
                  this.callbackSpy.returnValue = this.disabledFeature;
                  assert.equal(this.featureManager.ifDisabled(this.callbackSpy, this.fnSpy), this.HAS_RUN);
                });

                it('should execute the function if the feature is disabled [argument]', () => {
                  assert.equal(this.featureManager.ifDisabled(this.disabledFeature, this.fnSpy, this.callbackSpy), this.HAS_RUN);
                });

              });

              describe('Enabled Feature', () => {

                afterEach(() => {
                  assert.isFalse(this.fnSpy.called);
                });

                it('should execute the function if the feature is enabled [default value]', () => {
                  this.callbackSpy.returnValue = this.HAS_RUN;
                  assert.equal(this.featureManager.ifDisabled(this.enabledFeature, this.fnSpy, null, this.callbackSpy), this.HAS_RUN);
                });

                it('should not execute the function if the feature is enabled [argument]', () => {
                  assert.isUndefined(this.featureManager.ifDisabled(this.enabledFeature, this.fnSpy, this.callbackSpy));
                  assert.isFalse(this.callbackSpy.called);
                  // A quirk in the setup requires this to be called so the afterEach conditional is met
                  this.callbackSpy(this.context);
                });

                it('should not execute the function if the feature is enabled [default value]', () => {
                  this.callbackSpy.returnValue = this.HAS_RUN;
                  assert.equal(this.featureManager.ifDisabled(this.enabledFeature, this.fnSpy, null, this.callbackSpy), this.HAS_RUN);
                });

              });

            });

          });

          // TODO: Test createFeature
          describe('createFeature()', () => {
          // public createFeature(name: string | Feature | FeatureDescriptor | ((context: Object) => string | Feature | FeatureDescriptor), enabled: boolean | ((context: Object) => boolean)): Feature

            beforeEach(() => {
              this.featureName = 'someFeatureName';
              this.featureEnabled = true;
              this.feature = new Feature(this.featureName, this.featureEnabled);
              this.featureDescriptor = new FeatureDescriptor(this.feature);
              this.createdFeature = null;
            });

            afterEach(() => {
              // A quirk in the setup requires this to be called so the afterEach conditional is met
              this.callbackSpy(this.context);

              assert.equal(this.createdFeature.getName(), this.featureName);
              assert.equal(this.createdFeature.isEnabled(), this.featureEnabled);
            });

            it('should create a feature based on () => string/boolean', () => {
              this.callbackSpy.returnValue = this.featureName;
              this.createdFeature = this.featureManager.createFeature(this.callbackSpy, this.featureEnabled);
            });

            it('should create a feature based on () => Feature/boolean', () => {
              this.callbackSpy.returnValue = this.feature;
              this.createdFeature = this.featureManager.createFeature(this.callbackSpy, this.featureEnabled);
            });

            it('should create a feature based on () => FeatureDescriptor/boolean', () => {
              this.callbackSpy.returnValue = this.featureDescriptor;
              this.createdFeature = this.featureManager.createFeature(this.callbackSpy, this.featureEnabled);
            });

            it('should create a feature based on string/() => boolean', () => {
              this.callbackSpy.returnValue = this.featureEnabled;
              this.createdFeature = this.featureManager.createFeature(this.featureName, this.callbackSpy);
            });

          });

        });

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

    describe('Feature Descriptor Decorator', () => {

      beforeEach(() => {
        this.feature01Name = 'feature01Name';
        this.feature01Enabled = false;
        this.feature01 = new Feature(this.feature01Name, this.feature01Enabled);
      });

      it('should use the decorator', () => {
        this.featureManager.addFeature(this.feature01);

        this.featureManager.setFeatureDescriptorDecorator((featureDescriptor: FeatureDescriptor, context: any) => {
          featureDescriptor.enabled = !this.feature01Enabled;
          return featureDescriptor;
        });

        assert.equal(this.featureManager.isEnabled(this.feature01Name), !this.feature01Enabled);
        assert.equal(this.featureManager.getFeature(this.feature01Name).isEnabled(), !this.feature01Enabled);
      });

      it('should return the feature descriptor when the decorator does not return anything', () => {
        let decoratorExecuted = false;

        this.featureManager.addFeature(this.feature01);

        this.featureManager.setFeatureDescriptorDecorator((featureDescriptor: FeatureDescriptor, context: any) => {
          // Side effect only!
          featureDescriptor.enabled = !this.feature01Enabled;
        });

        assert.equal(this.featureManager.isEnabled(this.feature01), !this.feature01Enabled);
      });

      it('should use the set context when the decorator is invoked', () => {
        // The context
        let originalContext = { someName: 'someValue' };

        // Create a decorator spy
        let decoratorSpy = sinon.spy((featureDescriptor: FeatureDescriptor, context: any) => {
          assert.deepEqual(originalContext, context);
        });

        // Set the context
        this.featureManager.setContext(originalContext);

        // Add a feature
        this.featureManager.addFeature(this.feature01);


        // Set the decorator
        this.featureManager.setFeatureDescriptorDecorator(decoratorSpy);

        // Get a feature in order to invoke the decorator
        this.featureManager.getFeature(this.feature01Name);

        // Assert that the decorator spy executed
        assert.isTrue(decoratorSpy.called);
      });

    });

  });

  describe('FeatureDescriptor', () => {

    beforeEach(() => {
      this.featureName = 'someFeatureName';
      this.featureEnabled = true;
      this.featureValue = 'someFeatureValue';
      this.featureToggleCount = 5;
      this.feature = new Feature(this.featureName, this.featureEnabled);
      this.featureDescriptor = new FeatureDescriptor(this.feature, this.featureEnabled, this.featureValue, this.featureToggleCount);
    });

    it('should throw an error when undefined is passed into the constructor', () => {
      assert.throws(() => new FeatureDescriptor(undefined));
    });

    it('should throw an error when null is passed into the constructor', () => {
      assert.throws(() => new FeatureDescriptor(null));
    });

    it('should throw an error when an invalid type is passed into the constructor', () => {
      assert.throws(() => new FeatureDescriptor({test: 'someValue'}));
    });

    it('should create a FeatureDescriptor (string)', () => {
      let featureDescriptor = new FeatureDescriptor(this.featureName);

      assert.equal(featureDescriptor.name, this.featureName);
      assert.isFalse(featureDescriptor.enabled);
      assert.isUndefined(featureDescriptor.value);
      assert.equal(featureDescriptor.toggleCount, 0);
    });

    it('should create a FeatureDescriptor (featureish)', () => {
      let featureDescriptor = new FeatureDescriptor({name: this.featureName, enabled: this.featureEnabled});

      assert.equal(featureDescriptor.name, this.featureName);
      assert.equal(featureDescriptor.enabled, this.featureEnabled);
      assert.isUndefined(featureDescriptor.value);
      assert.equal(featureDescriptor.toggleCount, 0);
    });

    it('should create a FeatureDescriptor (Feature)', () => {
      let featureDescriptor = new FeatureDescriptor(this.feature);

      assert.equal(featureDescriptor.name, this.featureName);
      assert.equal(featureDescriptor.enabled, this.featureEnabled);
      assert.isUndefined(featureDescriptor.value);
      assert.equal(featureDescriptor.toggleCount, 0);
    });

    it('should create a FeatureDescriptor (FeatureDescriptor), no overrides', () => {
      let featureDescriptor = new FeatureDescriptor(this.featureDescriptor);

      assert.equal(featureDescriptor.name, this.featureName);
      assert.equal(featureDescriptor.enabled, this.featureEnabled);
      assert.equal(featureDescriptor.value, this.featureValue);
      assert.equal(featureDescriptor.toggleCount, this.featureToggleCount);
    });


    // TODO: Overrides

    describe('Functions', () => {
    
      describe('Single', () => {

        it('should create a FeatureDescriptor (() => string)', () => {
          let featureDescriptor = new FeatureDescriptor(() => this.featureName);
          
          assert.equal(featureDescriptor.name, this.featureName);
          assert.isFalse(featureDescriptor.enabled);
          assert.isUndefined(featureDescriptor.value);
          assert.equal(featureDescriptor.toggleCount, 0);
        });
    
        it('should create a FeatureDescriptor (() => featureish)', () => {
          let featureDescriptor = new FeatureDescriptor(() => {return {name: this.featureName, enabled: this.featureEnabled};});
    
          assert.equal(featureDescriptor.name, this.featureName);
          assert.equal(featureDescriptor.enabled, this.featureEnabled);
          assert.isUndefined(featureDescriptor.value);
          assert.equal(featureDescriptor.toggleCount, 0);
        });
    
        it('should create a FeatureDescriptor (() => Feature)', () => {
          let featureDescriptor = new FeatureDescriptor(() => this.feature);
    
          assert.equal(featureDescriptor.name, this.featureName);
          assert.equal(featureDescriptor.enabled, this.featureEnabled);
          assert.isUndefined(featureDescriptor.value);
          assert.equal(featureDescriptor.toggleCount, 0);
        });
    
        it('should create a FeatureDescriptor (() => FeatureDescriptor), no overrides', () => {
          let featureDescriptor = new FeatureDescriptor(() => this.featureDescriptor);
    
          assert.equal(featureDescriptor.name, this.featureName);
          assert.equal(featureDescriptor.enabled, this.featureEnabled);
          assert.equal(featureDescriptor.value, this.featureValue);
          assert.equal(featureDescriptor.toggleCount, this.featureToggleCount);
        });

      });

      describe('Double', () => {

        it('should create a FeatureDescriptor (() => () => string)', () => {
          let featureDescriptor = new FeatureDescriptor(() => () => this.featureName);
          
          assert.equal(featureDescriptor.name, this.featureName);
          assert.isFalse(featureDescriptor.enabled);
          assert.isUndefined(featureDescriptor.value);
          assert.equal(featureDescriptor.toggleCount, 0);
        });

        it('should create a FeatureDescriptor (() => () => featureish)', () => {
          let featureDescriptor = new FeatureDescriptor(() => () => {return {name: this.featureName, enabled: this.featureEnabled};});
    
          assert.equal(featureDescriptor.name, this.featureName);
          assert.equal(featureDescriptor.enabled, this.featureEnabled);
          assert.isUndefined(featureDescriptor.value);
          assert.equal(featureDescriptor.toggleCount, 0);
        });

        it('should create a FeatureDescriptor (() => () => Feature)', () => {
          let featureDescriptor = new FeatureDescriptor(() => () => this.feature);
    
          assert.equal(featureDescriptor.name, this.featureName);
          assert.equal(featureDescriptor.enabled, this.featureEnabled);
          assert.isUndefined(featureDescriptor.value);
          assert.equal(featureDescriptor.toggleCount, 0);
        });

        it('should create a FeatureDescriptor (() => () => FeatureDescriptor), no overrides', () => {
          let featureDescriptor = new FeatureDescriptor(() => () => this.featureDescriptor);
    
          assert.equal(featureDescriptor.name, this.featureName);
          assert.equal(featureDescriptor.enabled, this.featureEnabled);
          assert.equal(featureDescriptor.value, this.featureValue);
          assert.equal(featureDescriptor.toggleCount, this.featureToggleCount);
        });
        
      });

    });

  });

});
