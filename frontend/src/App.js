import { useRef, useState } from 'react'
import CodeEditor from './components/CodeEditor'
import OutputArea from './components/OutputArea'
import Header from './components/Header'
import './index.css'
import AuthContextProvider from './store/AuthContext'

export default function App () {
  const [output, setOutput] = useState('')

  return (
    <AuthContextProvider>
      <main>
        <Header />
        <div className='main'>
          <CodeEditor setOutput={setOutput} />
          <OutputArea output={output} />
        </div>
      </main>
    </AuthContextProvider>

  )
}
