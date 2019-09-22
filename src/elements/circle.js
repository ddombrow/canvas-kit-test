import React, { useEffect } from "react";

function Circle({drawCtx, cx, cy, r, stroke, fill}) {
    useEffect(() => {
        if (!drawCtx) {
            return;
        }
        const { CK, skCanvas } = drawCtx;
        let paint = new CK.SkPaint();
        paint.setAntiAlias(true);
        paint.setColor(CK.Color(0, 0, 0, 1.0));
        paint.setStyle(CK.PaintStyle.Stroke);
        paint.setStrokeWidth(4.0);
        // This effect smooths out the drawn lines a bit.
        paint.setPathEffect(CK.MakeSkCornerPathEffect(50));
        //console.log(ck);
        
        //const center = ck.SkPoint.Make(cx, cy);
        let path = new CK.SkPath();
        path.arcTo(cx, cy+r, cx+r, cy, r);
        path.arcTo(cx+r, cy, cx+r, cy+r, r);
        path.arcTo(cx+r, cy+r, cx, cy-r, r);
        path.arcTo(cx, cy-r, cx, cy+r, r);

        skCanvas.drawPath(path, paint);

        console.log("I'm drawing here.");
    }, [drawCtx, cx, cy, r, stroke, fill])
    return null;
}

export default Circle;