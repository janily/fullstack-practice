import Angle from './Angle'
import { Error } from './Error'

const StyleFillType = { solidColor: 0, gradient: 1, imagePattern: 4, noiseFilter: 5 };

export default class ShapeAngle extends Angle {
    
    constructor ({for:layer}) {
        super({for:layer});

        this.targetLayer = this.layer;
        this.targetPath = this.layer.pathInFrameWithTransforms();

        if (!this.segmentsAreValid) {
            return Error.unsupportedShapePath
        }
    }

    applyImage () {

        let imageFill = MSStyleFill.alloc().init();
        imageFill.setImage(this.transformedImage);
        imageFill.fillType = StyleFillType.imagePattern;
    
        this.targetLayer.style().removeAllStyleFills();
        this.targetLayer.style().addStyleFill(imageFill);
    }
}
