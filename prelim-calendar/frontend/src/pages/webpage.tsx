
import { useState } from 'react'
import DropBox from '../components/dropbox'
import './webpage.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

function Webpage() {
  const [files, setFiles] = useState<File[]>([])
  const [googleToken, setGoogleToken] = useState<string | null>(null)

  return (
    <div className="App">
      <h1>Drop your Syllabuses Below</h1>
      <DropBox onDrop={(newFile) => setFiles(existingFiles => [...existingFiles, ...newFile])} />
      {files.length > 0 && (
        <div className="mt-4 text-center">
          <p>Selected files:</p>
          <div>
            {files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </div>
        </div>
      )}
      <div className="mt-4 text-center">
        {!googleToken ? (
          <GoogleLogin
            onSuccess={credentialResponse => {
              setGoogleToken(credentialResponse.credential || null)
            }}
            onError={() => {
              alert('Google Login Failed')
            }}
          />
        ) : (
          <p>Google Calendar Connected!</p>
        )}
      </div>
    </div>
  )
}

export default function WebpageWithProvider() {
  return (
    <GoogleOAuthProvider clientId="342579866248-ipilh46tpbcstlic7v8l5pnge60f7475.apps.googleusercontent.com">
      <Webpage />
    </GoogleOAuthProvider>
  )
}