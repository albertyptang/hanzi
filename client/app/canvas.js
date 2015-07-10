var characterRecognition = function () {
  var preview = document.getElementById('preview');
  var result = document.getElementById('result');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var pointerId;
  var instanceId;
  /*
   * Handle MyScript Cloud authentication keys
   */
  var applicationKey = '36c47743-8473-4c39-b43d-4c8a2350e6a1';
  var hmacKey = 'bbb5e44d-05f9-47e9-95e3-9436d085249b';
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

  function doRecognition() {
      if (inkManager.isEmpty()) {
        preview.innerHTML = '';
      } else {
        var inputUnit = new MyScript.TextInputUnit();
        inputUnit.setComponents(inkManager.getStrokes());
        var units = [inputUnit];
        textRecognizer.doSimpleRecognition(applicationKey, instanceId, units, hmacKey).then(
          function (data) {
            if (!instanceId) {
              instanceId = data.getInstanceId();
            } else if (instanceId !== data.getInstanceId()) {
              return;
            }
            preview.innerHTML = data.getTextDocument().getTextSegment().getSelectedCandidate().getLabel();
          }
        );
      }
    }
    /*
     * On pointer down: Start ink rendering and ink capture.
     */
  canvas.addEventListener('pointerdown', function (event) {
    if (!pointerId) {
      pointerId = event.pointerId;
      event.preventDefault();
      // Start ink rendering
      textRenderer.drawStart(event.offsetX, event.offsetY);
      // Start ink capture
      inkManager.startInkCapture(event.offsetX, event.offsetY);
    }
  }, false);
  /*
   * On pointer move: Continue ink rendering and ink capture.
   */
  canvas.addEventListener('pointermove', function (event) {
    if (pointerId === event.pointerId) {
      event.preventDefault();
      // Continue ink rendering
      textRenderer.drawContinue(event.offsetX, event.offsetY, context);
      // Continue ink capture
      inkManager.continueInkCapture(event.offsetX, event.offsetY);
    }
  }, false);
  /*
   * On pointer up: Stop ink rendering and ink capture and send recognition request.
   */
  canvas.addEventListener('pointerup', function (event) {
    if (pointerId === event.pointerId) {
      event.preventDefault();
      // Stop ink rendering
      textRenderer.drawEnd(event.offsetX, event.offsetY, context);
      // Stop ink capture
      inkManager.endInkCapture();
      pointerId = undefined;
      // Send recognition request
      doRecognition();
    }
  }, false);
  /*
   * On pointer leave: Continue ink rendering and ink capture.
   */
  canvas.addEventListener('pointerleave', function (event) {
    if (pointerId === event.pointerId) {
      event.preventDefault();
      // Stop ink rendering
      textRenderer.drawEnd(event.offsetX, event.offsetY, context);
      // Stop ink capture
      inkManager.endInkCapture();
      pointerId = undefined;
      // Send recognition request
      doRecognition();
    }
  }, false);
};

characterRecognition();