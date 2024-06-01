import { Editor } from '@monaco-editor/react'
import { useState } from 'react'
import { useRef } from 'react'
import LanguageDropdown from './LanguageDropdown'
import LANGUAGE_DATA from '../data.json'

export default function CodeEditor ({setOutput}) {
  const editorRef = useRef(null)
  const [language, setLanguage] = useState('cpp')
  const [value, setValue] = useState('#include <iostream>\nusing namespace std;\nint main(){\n      cout << 9876543210 << endl;\n      return 0;\n  }')
  const [theme, setTheme] = useState('light')

  function onChange (value) {
    setValue(value)
  }

  function onMount (editor, monaco) {
    editorRef.current = editor
    editor.focus()
  }

  function onSelectLanguage (event) {
    setLanguage(event.target.value)
    setValue('//Welcome to the_codetron')
    setOutput('')
  }

  function startCodeExcecution () {
    const data = {
      code: value,
      language: language
    }
    fetch('http://192.168.1.9:3000/code/execute', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {

        console.log('Response Recieved: ')
        return response.json()
      })
      .then(data => {
        const newData = JSON.parse(data)
        console.log(newData.output)
        if (newData.output === null) {
          setOutput(prev => {
            return newData.error + '\n' + prev
          })
        } else {
          setOutput(prev => {
            return newData.output + '\n' + prev
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='code-editor'>
      <div className='buttons'>
        <button className='run-code' onClick={startCodeExcecution}>
          Run Code
        </button>
        <h3 className='title'>welcome to the_codetron</h3>
        <LanguageDropdown language={language} onSelectLanguage={onSelectLanguage} />
      </div>
      <Editor
        height='93%'
        language={language}
        options={{minimap: {enabled: false}}}
        defaultValue='//Welcome to the_codetron'
        value={value}
        theme={theme}
        onChange={value => onChange(value)}
        onMount={onMount} />
    </div>

  )
}
