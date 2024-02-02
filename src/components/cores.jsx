import React, { useState, useEffect } from "react";
import { CiLock, CiUnlock } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";

export function Cores() {

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        };
    })

    const letters = '0123456789ABCDEF'
    const [cor, setCor] = useState([...new Array(5)].map(color => generateColor(color)))
    const [lock, setLock] = useState([false, false, false, false, false])

    function generateColor(color) {
        color = "#"
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    function changeColor() {
        setCor((previousColor) => {
            return previousColor.map((color, colorIndex) => lock[colorIndex] ? color : generateColor(color))
        })
    }

    function changeLock(cellIndex) {
        setLock((previousLock) => {
            return previousLock.map((e, i) => i === cellIndex ? !e : e)
        }
        )
    }

    function handleKeyDown(e) {
        if (e.key === " ") {
            changeColor()
        }
    }

    return (
        <div>
            <h1 className="font-bold text-3xl my-12">Gerador de cores 🎨</h1>
            <div className="flex gap-12 justify-center ">
                {[...new Array(5)].map((cell, cellIndex) => (
                    <div className="flex flex-col shadow-lg bg-white rounded-md pt-2 px-2 hover:scale-110 duration-500 hover:shadow-2xl">
                        <div className="flex flex-col rounded-md h-64 w-52" key={cellIndex} style={{ backgroundColor: cor[cellIndex] }} onClick={() => navigator.clipboard.writeText(cor[cellIndex])}>
                        </div>
                        <div className="flex justify-center py-4 gap-3">
                            <p >{cor[cellIndex]}</p>
                            <div className="cursor-pointer self-center" onClick={() => navigator.clipboard.writeText(cor[cellIndex])}><MdContentCopy /></div>
                        </div>
                        <div className="flex items-center justify-center pb-5 g-5">
                            <button onClick={() => changeLock(cellIndex)}>
                                {lock[cellIndex] ? <CiLock style={{ textAlign: "center" }} /> : <CiUnlock style={{ textAlign: "center" }} />}
                            </button>
                        </div>
                    </div>)
                )}
            </div>
            <button className="mt-12 py-4 px-10 rounded-md shadow-md text-white font-bold bg-[#786abf] hover:bg-[#6e63a3]" onClick={changeColor}>Gerar cores</button>
            <p className="flex justify-end mt-32 mr-2">Direitos reservados de Fábio e Malu</p>
        </div>
    )
}
