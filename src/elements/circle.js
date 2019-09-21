import React, { useEffect } from "react";

function Circle({ck, cx, cy, r, stroke, fill}) {
    useEffect(() => {
        if (!ck) {
            return;
        }

        //console.log(ck);
        console.log("I'm drawing here.");
    }, [ck, cx, cy, r, stroke, fill])
    return null;
}

export default Circle;