import { useState } from 'react'
import { Button } from './components/ui/button'
import { ChatBot } from './components/chat-bot'
function App() {
 
  return (
    <>
      <div className=' min-h-screen w-full flex items-center justify-center '>
        <ChatBot />
      </div>
    </>
  )
}

export default App
