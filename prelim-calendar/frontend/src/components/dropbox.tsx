import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import './dropbox.css'

function DropBox({ onDrop }: { onDrop: (files: File[]) => void }) {
  const handleDrop = useCallback((acceptedFiles: File[]) => {onDrop(acceptedFiles)}, [onDrop])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: true,
  })

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
      <input {...getInputProps()} />
      <p className="dropzone-text">
        {isDragActive
          ? 'Drop the PDF here...'
          : 'Drag and drop your syllabus PDF here, or click to upload'}
      </p>
    </div>
  )
}

export default DropBox
