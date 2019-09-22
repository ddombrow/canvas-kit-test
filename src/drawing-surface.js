import React, { useRef, useEffect, useState } from "react";

const CanvasKitInit = require("canvaskit-wasm/bin/canvaskit.js");

function DrawingSurface(props) {
  const drawingCanvas = useRef();
  const [drawCtx, setDrawCtx] = useState();

  useEffect(() => {
    CanvasKitInit().ready().then((CanvasKit) => {
      const canvas = drawingCanvas.current;
      const surface = CanvasKit.MakeCanvasSurface(canvas.id);
      if (!surface) {
        console.log('Could not make surface');
        return;
      }
      const context = CanvasKit.currentContext();
      const skCanvas = surface.getCanvas();
      setDrawCtx({
        CK: CanvasKit,
        skCanvas
      });

      const textPaint = new CanvasKit.SkPaint();
      textPaint.setColor(CanvasKit.Color(40, 0, 0, 1.0));
      textPaint.setAntiAlias(true);

      const textFont = new CanvasKit.SkFont(null, 30);
      skCanvas.drawText('The place where things draw!', 100, 100, textPaint, textFont);
      skCanvas.flush();
    });
  }, []);

  return <React.Fragment>
    <canvas id="drawingSurface1" width="800" height="800"  ref={drawingCanvas} />
    { React.Children.map(props.children, c => {
      return React.cloneElement(c, { ...c.props, drawCtx })
    }) }
  </React.Fragment>;
}

export default DrawingSurface;
