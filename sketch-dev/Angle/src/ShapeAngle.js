import Angle from './Angle'
import { Error } from './Error'
export default class ShapeAngle extends Angle {
    
    constructor ({for:layer}) {
        super({for:layer});

        this.targetLayer = this.layer;
        this.targetPath = this.layer.pathInFrameWithTransforms();

        if (!this.segmentsAreValid) {
            return Error.unsupportedShapePath
        }
    }
}
