"use client"

import { useState, useEffect } from "react"

export default function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (count > 0) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [count])

  const increment = () => setCount((prev) => prev + 1)
  const decrement = () => setCount((prev) => Math.max(0, prev - 1))
  const reset = () => setCount(0)

  
  const dynamicOpacity = Math.min(count / 100, 1)
  const dynamicBackground = `rgba(29, 78, 216, ${dynamicOpacity})`

  return (
    <div className="w-full flex p-4 justify-center items-center transition-all duration-500"
    style={{ backgroundColor: dynamicBackground }}
    >
      <div
        className="bg-opacity-20 backdrop-blur-md p-8  w-full" 
      >
        <h2 className="text-4xl font-extrabold text-gray-400 mb-6 text-center">
          Counter: {count}
        </h2>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={decrement}
            className="transform hover:scale-110 transition-transform duration-300 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-6 rounded-full shadow-lg"
          >
            -
          </button>
          <button
            onClick={reset}
            className="transform hover:scale-110 transition-transform duration-300 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-full shadow-lg"
          >
            Reset
          </button>
          <button
            onClick={increment}
            className="transform hover:scale-110 transition-transform duration-300 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full shadow-lg"
          >
            +
          </button>
          
        </div>
      </div>
    </div>
  )
}
