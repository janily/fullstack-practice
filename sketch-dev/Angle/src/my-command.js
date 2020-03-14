// 扩展 obj-c 数组的方法
Array.fromNSArray = function(nsArray) {
  let array = [];
  for (var i = 0; i < nsArray.count(); i++) {
    array.push(nsArray[i]);
  }
  return array;
};

function loadLocalImage({ scriptPath, filePath }) {
  let basePath = scriptPath
    .stringByDeletingLastPathComponent()
    .stringByDeletingLastPathComponent()
    .stringByDeletingLastPathComponent();
  return NSImage.alloc().initWithContentsOfFile(basePath + "/" + filePath);
}

function getSelectionAndOptions_forAngleInstances({ scriptPath }) {
  let alert = NSAlert.alloc().init();
  alert.setMessageText("Apply Mockup");
  alert.setInformativeText(
    "Choose an Artboard to apply into the selected shape."
  );
  alert.addButtonWithTitle("Apply");
  alert.addButtonWithTitle("Cancel");
  alert.icon = loadLocalImage({
    scriptPath,
    filePath: "Contents/Resources/logo.png"
  });

  return alert.runModal();
}
import sketch from "sketch";
// documentation: https://developer.sketchapp.com/reference/api/

export default function({
  api,
  command,
  document,
  plugin,
  scriptPath,
  scriptURL,
  selection,
  context
}) {
  sketch.UI.message("It's alive 🙌");
  // 当前所选中的对象
  let selectedLayers = Array.fromNSArray(selection);
  // 当前画布的数量
  let artboardsOnSelectPage = Array.fromNSArray(document.artboards());
  // 不同页面之间的画布的统计
  let artboardsOnOtherPages = [];
  let pages = Array.fromNSArray(document.pages());
  pages = pages.filter(page => page != document.currentPage());
  for (var i = 0; i < pages.length; i++) {
    var artboards = Array.fromNSArray(pages[i].artboards());
    artboardsOnOtherPages = artboardsOnOtherPages.concat(artboards);
  }
  // print(artboardsOnOtherPages);
  // print(artboardsOnOtherPages);

  getSelectionAndOptions_forAngleInstances({ scriptPath });
}
