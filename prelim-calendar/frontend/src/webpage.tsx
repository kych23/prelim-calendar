
import { useState } from 'react'
import DropBox from './components/dropbox'
import './webpage.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

function Webpage() {
  const [file, setFile] = useState<File | null>(null)
  const [googleToken, setGoogleToken] = useState<string | null>(null)

  return (
    <div className="App">
      <h1>Drop your Syllabuses Below</h1>
      <DropBox onDrop={(files) => setFile(files[0])} />
      {file && <p className="mt-4 text-center">Selected: {file.name}</p>}
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