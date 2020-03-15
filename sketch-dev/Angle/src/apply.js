import Angle from './Angle'
import * as Shared from './Shared'
import { Error } from './Error'

function loadLocalImage ({ scriptPath, filePath }) {
  
  let basePath = scriptPath
    .stringByDeletingLastPathComponent()
    .stringByDeletingLastPathComponent()
    .stringByDeletingLastPathComponent();

  return NSImage.alloc().initWithContentsOfFile(basePath + "/" + filePath);
}

function getSelectionAndOptions_forAngleInstances({ scriptPath }) {

  let alert = NSAlert.alloc().init();

  alert.setMessageText("Apply Mockup");
  alert.setInformativeText("Choose an Artboard to apply into the selected shape.");
  alert.addButtonWithTitle("Apply");
  alert.addButtonWithTitle("Cancel");
  alert.icon = loadLocalImage({
    scriptPath: scriptPath,
    filePath: "Contents/Resources/logo.png"
  });

  return alert.runModal()
}

export default function({api, command, document, plugin, scriptPath, scriptURL, selection}) {

  if (selection == null || selection.count() == 0) {
    Shared.show({
      message: Error.emptySelection.message,
      in: document
    });
    return
  }

  let selectedLayers = Array
    .fromNSArray(selection)

  let artboardsOnSelectPage = Array
    .fromNSArray(document.artboards());

  let artboardsOnOtherPages = [];
  let pages = Array.fromNSArray(document.pages());
  pages = pages.filter(page => page != document.currentPage());

  for (var page in pages) {
    var artboards = Array.fromNSArray(page.artboards());
    artboardsOnOtherPages = artboardsOnOtherPages.concat(artboards);
  }

  const angleLogo = loadLocalImage({
    scriptPath: context.scriptPath,
    filePath: "Contents/Resources/logo.png"
  });
  
  if ((artboardsOnSelectPage.length + artboardsOnOtherPages.length) == 0) {

    var alert = NSAlert.alloc().init();

    alert.setMessageText("Angle needs an Artboard");
    alert.setInformativeText("To start using Angle, create a new Artboard that contains your screen.");
    alert.addButtonWithTitle("OK");
    alert.icon = angleLogo;

    alert.runModal();
    return
  }

  let angle = Angle.tryCreating({
    for: selectedLayers[0]
  });

  if (angle instanceof Angle) {

    getSelectionAndOptions_forAngleInstances({ scriptPath: scriptPath });

    angle.artboard = artboardsOnSelectPage[0];
    angle.applyImage();
  }
}
