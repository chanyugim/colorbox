import './App.css'
import { useRef, useEffect, useState } from 'react'
import { drawCanvas } from './pages/drawCanvas'

function App() {
  const [count, setCount] = useState(0);
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const closeCanvas = drawCanvas(canvas, ctx, setCount);
    return ()=> {
      closeCanvas();
    }
  }, [drawCanvas, ]);

  return (
    <>
      <p>현재 생성된 박스의 수: {count}</p>
      <canvas id="canvas" width={400} height={400} ref={canvasRef}></canvas>
    </>
  )
}

export default App
