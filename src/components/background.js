import React, { useCallback, useState } from 'react';

function makeAutomator(arrayOfValues) {
    return {
        [true]: {
            [true]: {
                [true]: arrayOfValues[0],
                [false]: arrayOfValues[1]
            },
            [false]: {
                [true]: arrayOfValues[2],
                [false]: arrayOfValues[3]
            }
        },
        [false]: {
            [true]: {
                [true]: arrayOfValues[4],
                [false]: arrayOfValues[5]
            },
            [false]: {
                [true]: arrayOfValues[6],
                [false]: arrayOfValues[7]
            }
        }
    }
}

function Canvas(props) {
    const [present, setPresent] = useState([true, false, false, true, true, true, false, false, false, true])
    const [selection, setSelection] = useState([true, false, false, true, true, false, false, true])
    const [past, setPast] = useState([])
    const automator = useCallback(makeAutomator(selection))
    console.log(automator)
    const iterate = (e) => {
        const nextTime = []
        for (let index = 0; index < present.length; index++) {
            const element = present[index]
            const rightElement = present[(index + 1) % present.length]
            const leftElement = present[(index - 1 + present.length) % present.length]
            console.log([leftElement, element, rightElement])
            const nextBit = automator[leftElement][element][rightElement]
            nextTime.push(nextBit)
        }
        setPresent(nextTime)
        const newPast = [present, ...past]
        const newPastLim = newPast.slice(0, newPast.length > 7 ? 7 : newPast.length)
        setPast(newPastLim)
    }
    const toggleBool = (index) => {
        const mutable = [...present]
        mutable.splice(index, 1, !mutable[index])
        setPresent(mutable)
    }
    return (
        <div>
            <button onClick={iterate}>Advance</button>
            <div id="present">
                {present.map((bool, index) => <div style={{
                    height: '12.5vh',
                    width: '10vw',
                    backgroundColor:
                        bool ? 'blue' : 'green',
                    float: 'left',
                    borderColor: "black",
                    borderWidth: "3px"
                }}
                    onClick={() => toggleBool(index)} />)}
            </div>
            <div id="past">
                {past.map(rowArray => (<div style={{ height: '12.5vh' }}>
                    {rowArray.map(bool => <div style={{
                        height: '12.5vh',
                        width: '10vw',
                        backgroundColor:
                            bool ? 'lightBlue' : 'lightGreen',
                        float: 'left',
                        borderColor: "black",
                        borderWidth: "3px"
                    }} />)}
                </div>))}
            </div>
        </div>
    );
}

export default Canvas;