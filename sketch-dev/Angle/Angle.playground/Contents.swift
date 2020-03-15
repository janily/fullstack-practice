//: Playground - noun: a place where people can play

import Cocoa

var screenImage = #imageLiteral(resourceName: "iPhone 8.png")

import CoreImage

let perspectiveTransform = CIFilter(name: "CIPerspectiveTransform")!


let screenTiff = screenImage.tiffRepresentation!
let screenbitmap = NSBitmapImageRep(data: screenTiff)!
let screen = CIImage(bitmapImageRep: screenbitmap)
perspectiveTransform.setValue(screen, forKey: "inputImage")


let rect = (
    topLeft: CGPoint(x: 1040.0, y: 1410.0 - 0.0),
    topRight: CGPoint(x: 1670.0, y: 1410.0 - 260.0),
    bottomRight: CGPoint(x: 650.0, y: 1410.0 - 1350.0),
    bottomLeft: CGPoint(x: 25.0, y: 1410.0 - 960.0)
)

perspectiveTransform.setValue(CIVector(cgPoint: rect.topLeft), forKey: "inputTopLeft")
perspectiveTransform.setValue(CIVector(cgPoint: rect.topRight), forKey: "inputTopRight")
perspectiveTransform.setValue(CIVector(cgPoint: rect.bottomRight), forKey: "inputBottomRight")
perspectiveTransform.setValue(CIVector(cgPoint: rect.bottomLeft), forKey: "inputBottomLeft")

let representation = NSCIImageRep(ciImage: perspectiveTransform.outputImage!)
let image = NSImage(size: representation.size)
image.addRepresentation(representation)

