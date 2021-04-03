import React from "react"

let yPos = 0;
let points = [];
function increment() {
    yPos++;
}

export const context = {
    yPosition: yPos,
    increment: increment,
};

export const automataContext = React.createContext(
    context.yPosition // default value
);