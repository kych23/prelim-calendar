import './uploadButton.css'

interface UploadButtonProps {
  files: File[]
}

const UploadButton: React.FC<UploadButtonProps> = ({ files }) => {
  const handleUpload = async () => {
    if (files.length === 0) {
      alert('No files to upload.')
      return
    }

    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })

    try {
      const res = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        throw new Error(`Upload failed: ${res.statusText}`)
      }

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = 'calendar.ics'
      link.click()
    } 
    catch (err) {
      console.error(err)
      alert('Upload failed.')
    }
  }

  return (
    <button onClick={handleUpload} className="upload-button">
      Upload & Generate Calendar
    </button>
  )
}

export default UploadButton
