import { useState } from 'react'
import DropBox from './components/dropbox'
import './webpage.css'

function Webpage() {
  const [file, setFile] = useState<File | null>(null)

  return (
    <div className="App">
      <h1>Drop your Syllabuses Below</h1>
      <DropBox onDrop={(files) => setFile(files[0])} />
      {file && <p className="mt-4 text-center">Selected: {file.name}</p>}
    </div>
  )
}

export default Webpage
