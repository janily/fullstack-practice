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
}
