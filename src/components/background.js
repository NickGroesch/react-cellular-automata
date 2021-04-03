import React, { useCallback, useState, useMemo } from 'react';

function makeAutomator(arrayOfValues) {
    return { // object to be used: nextSelf = object[left][self][right]
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
    //const automator = 
    const automator = makeAutomator(selection)
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
    return (<>
        <div style={{ zIndex: 0, position: 'fixed', width: "100vw", height: '100vh' }}>

            <div id="present">
                {present.map((bool, index) => <div style={{
                    height: '12.5vh',
                    width: (100 / present.length) + "vw",
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
                        width: `${100 / present.length}vw`,
                        backgroundColor:
                            bool ? 'lightBlue' : 'lightGreen',
                        float: 'left',
                    }} />)}
                </div>))}
            </div>
        </div >
        <div style={{ zIndex: 1, position: 'fixed' }}>
            <div style={{ zIndex: 1, position: "absolute", left: "25vw", top: '25vh', borderRadius: "50%", backgroundColor: "pink", width: "25vw" }}>
                <button onClick={iterate}>Advance Automaton</button>
                <p>please only c's and v's : the only letters coders need since stack overflow</p>
                <p>
                    <label htmlFor="array">string of however many c and v's to represent top row</label>
                    <input onKeyDown={(e) => {
                        // console.log(e.key)
                        if (e.key == "Enter") {
                            const cvs = e.target.value.split("")
                            const truthys = cvs.map(cv => cv == "c")
                            setPast([])
                            setPresent(truthys)
                        }
                        if (!["c", "v", "Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)) e.preventDefault()

                    }} />
                </p>
                <p>
                    <label htmlFor="array">string of rules 8 c and v's</label>
                    <input onKeyDown={(e) => {
                        // console.log(e.key)
                        if (e.key == "Enter") {
                            console.log(e.target.value)
                            const cvs = e.target.value.split("")
                            const truthys = cvs.map(cv => cv == "c")
                            setSelection(truthys)
                        }
                        if (!["c", "v", "Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)) e.preventDefault()

                    }} />
                </p>
            </div>
        </div>
    </>);
}

export default Canvas;