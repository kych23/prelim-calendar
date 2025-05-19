import { useState } from 'react'
import DropBox from './components/dropbox'
import './webpage.css'

function Webpage() {
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="App">
      <h1>Drop your Syllabuses Below</h1>
      <DropBox onDrop={(newFile) => setFiles(existingFiles => [...existingFiles, ...newFile])} />
      {files.length > 0 && (
        <div className="mt-4 text-center">
          <p>Selected files:</p>
          <ul>
            {files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Webpage
