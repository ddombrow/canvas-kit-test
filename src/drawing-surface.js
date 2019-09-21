import React, { useRef, useEffect, useState } from "react";

const CanvasKitInit = require("canvaskit-wasm/bin/canvaskit.js");

function DrawingSurface(props) {
  const drawingCanvas = useRef();
  const [ck, setCk] = useState();

  useEffect(() => {
    CanvasKitInit().ready().then((CanvasKit) => {
      const canvas = drawingCanvas.current;
      const surface = CanvasKit.MakeCanvasSurface(canvas.id);
      if (!surface) {
        console.log('Could not make surface');
        return;
      }
      const context = CanvasKit.currentContext();
      const skcanvas = surface.getCanvas();
      setCk(CanvasKit);
      
      let paint = new CanvasKit.SkPaint();
      paint.setAntiAlias(true);
      paint.setColor(CanvasKit.Color(0, 0, 0, 1.0));
      paint.setStyle(CanvasKit.PaintStyle.Stroke);
      paint.setStrokeWidth(4.0);
      // This effect smooths out the drawn lines a bit.
      paint.setPathEffect(CanvasKit.MakeSkCornerPathEffect(50));
      
      // Draw I N K
      let path = new CanvasKit.SkPath();
      path.moveTo(80, 30);
      path.lineTo(80, 80);
      
      path.moveTo(100, 80);
      path.lineTo(100, 15);
      path.lineTo(130, 95);
      path.lineTo(130, 30);
      
      path.moveTo(150, 30);
      path.lineTo(150, 80);
      path.moveTo(170, 30);
      path.lineTo(150, 55);
      path.lineTo(170, 80);
      let paths = [path];
      let paints = [paint];

      const textPaint = new CanvasKit.SkPaint();
      textPaint.setColor(CanvasKit.Color(40, 0, 0, 1.0));
      textPaint.setAntiAlias(true);

      const textFont = new CanvasKit.SkFont(null, 30);
      skcanvas.drawText('The place where things draw!', 100, 100, textPaint, textFont);
      skcanvas.flush();
    });
  }, []);

  return <React.Fragment>
    <canvas id="drawingSurface1" width="800" height="800"  ref={drawingCanvas} />
    { React.Children.map(props.children, c => {
      return React.cloneElement(c, { ...c.props, ck })
    }) }
  </React.Fragment>;
}

export default DrawingSurface;
