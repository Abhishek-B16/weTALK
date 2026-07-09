import { useState } from 'react'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
     
     <div>
      <h1>my app</h1>
      <header>
        <Show when="signed-out">
          <SignInButton mode="modal" />
          <SignUpButton  mode="modal" />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>

     </div>
    
  )
}

export default App
