const SegmentType = { linear: 0, quadratic: 1, cubic: 2 }
export default class Angle {

    constructor ({for:layer}) {

        this.layer = layer;
    }

    get segments () {
        let contour = this.targetPath.contours().firstObject();
        return Array.fromNSArray(contour.segments())
    }

    get segmentsAreValid () {

        let segments = this.segments;

        if (segments == null ||
            segments.length != 4 ||
            segments.some( a => a.segmentType() != SegmentType.linear) ) { return false }

        return true
    }

    get pointsFromBezierPath () {

        if (this._pointsFromBezierPath != undefined) {
            return this._pointsFromBezierPath;
        }

        let points = this.segments
            .map( a => a.endPoint1() );

        this._pointsFromBezierPath = points;

        return points;
    }

    get imageData () {

        let layerAncestry = MSImmutableLayerAncestry.alloc().initWithMSLayer(this.artboard);      
        let format = MSExportFormat.formatWithScale_name_fileFormat(2, "Angle", "png");
        let request = MSExportRequest.exportRequestsFromLayerAncestry_exportFormats(layerAncestry, [format]).firstObject();
        let exporter = MSExporter.exporterForRequest_colorSpace(request, NSColorSpace.sRGBColorSpace());

        return exporter.bitmapImageRep().TIFFRepresentation();
    }

    pixelAccurateRepresentationOfImage(image) {

        let representation = NSCIImageRep.imageRepWithCIImage(image);
        let nsImage = NSImage.alloc().initWithSize(representation.size());
        nsImage.addRepresentation(representation);
    
        return nsImage
    }

    get transformedImage () {

        let perspectiveTransform = CIFilter.filterWithName("CIPerspectiveTransform");

        let imageBitmap = NSBitmapImageRep.imageRepWithData(this.imageData);
        let image = CIImage.alloc().initWithBitmapImageRep(imageBitmap);
    
        perspectiveTransform.setValue_forKey(image, "inputImage");

        let points = this.pointsFromBezierPath;
        let vectors = points.map( point => { return CIVector.vectorWithX_Y(point.x, point.y) });
        
        perspectiveTransform.setValue_forKey(vectors[0], "inputTopLeft");
        perspectiveTransform.setValue_forKey(vectors[1], "inputTopRight");
        perspectiveTransform.setValue_forKey(vectors[2], "inputBottomRight");
        perspectiveTransform.setValue_forKey(vectors[3], "inputBottomLeft");
    
        let perspectiveImage = perspectiveTransform.valueForKey("outputImage");
        let ouputNSImage = this.pixelAccurateRepresentationOfImage(perspectiveImage);
    
        return MSImageData.alloc().initWithImage_(ouputNSImage)
    }
}
