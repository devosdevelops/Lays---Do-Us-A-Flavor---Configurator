# Chip Bag 3D Model

## Instructions

This directory should contain the GLB 3D model file for the chip bag:

```
chips_arthur_de_klerck.glb
```

### Setup Steps

1. **Obtain the model**: Get the `chips_arthur_de_klerck.glb` file from the design team or 3D model repository
2. **Place in this directory**: Copy/paste the `.glb` file into `src/assets/models/`
3. **Update loader**: The model loader in `src/scene/model.js` will automatically load this file

### Model Requirements

- **Format**: GLB (compressed GLTF binary)
- **Scale**: Should be normalized to fit in a ~2-3 unit space
- **Topology**: Should include geometry for the chip bag body and text surface
- **Materials**: Can include pre-baked materials; will be overridden by the configurator

### Reference Implementation

The model is loaded in `src/scene/model.js`:

```javascript
const MODEL_PATH = '/src/assets/models/chips_arthur_de_klerck.glb';

// TODO: Implement GLTFLoader and DRACOLoader integration
```

### Additional Notes

- **Compression**: If the model is large, consider using DRACO compression
- **Textures**: Embedded textures work best; external texture files should be in this directory
- **Preview**: Once placed, the configurator will display the model in the right panel

---

**Status**: TODO - Model file needed for development to continue
