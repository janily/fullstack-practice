import Angle from "./Angle";
import { Error } from "./Error";

import ShapeAngle from "./ShapeAngle";

Array.fromNSArray = function(nsArray) {
  let array = [];
  for (var i = 0; i < nsArray.count(); i++) {
    array.push(nsArray[i]);
  }
  return array;
};

export function show({ message, in: document }) {
  if (document.showMessage != undefined) {
    document.showMessage(message);
  } else {
    print(message);
  }
}

Angle.tryCreating = function({ for: layer }) {
  switch (layer.class()) {
    case MSShapeGroup:
      return new ShapeAngle({
        for: layer
      });
    default:
      return Error.unsupportedElement;
  }
};
