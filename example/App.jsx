import React from 'react'

import Tooltip from '../src/Tooltip'

const App = () =>
  <div className="outer">
    <div className="inner">
      <Tooltip x={3} y={5}>Tooltip in the top left corner</Tooltip>
      <Tooltip x={5} y={window.innerHeight - 10}>Tooltip in the bottom left corner</Tooltip>
      <Tooltip x={window.innerWidth - 4} y={5}>Tooltip in the top right corner</Tooltip>
      <Tooltip x={200} y={200}>Tooltip in the middle, somewhere</Tooltip>
    </div>
  </div>

export default App
