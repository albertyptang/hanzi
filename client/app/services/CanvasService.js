angular.module('hzzd')

.factory('canvas', function () {

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var instanceId;
  /*
   * Handle MyScript Cloud authentication keys
   */
  var applicationKey = 'b9143c12-51f5-43b6-a356-7bd6cf26eb3b';
  var hmacKey = '9bc1b788-24f2-481f-9937-82a2c2397700';
  /*
   * Declare an instance of MyScriptJS InkManager in order to capture digital ink
   */
  var inkManager = new MyScript.InkManager();
  /*
   * Declare an instance of MyScriptJS TextRenderer in order to enable ink rendering
   */
  var textRenderer = new MyScript.TextRenderer();
  /*
   * Declare an instance of MyScriptJS Text Recognizer
   */
  var textRecognizer = new MyScript.TextRecognizer();
  /*
   * Set Recognition language (i.e.: "en_US")
   */
  textRecognizer.getParameters().setLanguage('zh_TW');

  var doRecognition = function () {
    var inputUnit = new MyScript.TextInputUnit();
    inputUnit.setComponents(inkManager.getStrokes());
    var units = [inputUnit];
    return textRecognizer.doSimpleRecognition(applicationKey, instanceId, units, hmacKey).then(
      function (data) {
        if (!instanceId) {
          instanceId = data.getInstanceId();
        } else if (instanceId !== data.getInstanceId()) {
          return;
        }
        var prev = data.getTextDocument().getTextSegment().getSelectedCandidate().getLabel();
        return prev[0];
      });
  };

  return {
    canvas: canvas,
    context: context,
    applicationKey: applicationKey,
    hmacKey: hmacKey,
    inkManager: inkManager,
    textRenderer: textRenderer,
    textRecognizer: textRecognizer,
    doRecognition: doRecognition
  };

});

