import { useState, useRef, useEffect } from 'react'
import QrCreator from 'qr-creator'
import './QRGenerator.css'

function QRGenerator() {
  const [text, setText] = useState('')
  const [logoImage, setLogoImage] = useState(null)
  const canvasRef = useRef(null)
  const downloadLinkRef = useRef(null)

  useEffect(() => {
    if (text) {
      generateQR()
    } else {
      clearCanvas()
    }
  }, [text, logoImage])

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  const generateQR = async () => {
    if (!text) return

    const canvas = canvasRef.current
    const size = 300

    // Generate base QR code
    await QrCreator.render({
      text: text,
      radius: 0.5, // Rounded corners
      ecLevel: 'H', // High error correction for logo overlay
      fill: '#000000',
      background: '#ffffff',
      size: size
    }, canvas)

    // Add logo if uploaded
    if (logoImage) {
      const ctx = canvas.getContext('2d')
      const logoSize = size * 0.25 // Slightly larger for better visibility
      const logoX = (size - logoSize) / 2
      const logoY = (size - logoSize) / 2
      
      // Draw logo with promise to ensure it loads
      const img = new Image()
      await new Promise((resolve) => {
        img.onload = () => {
          // White background for logo with rounded corners
          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.roundRect(logoX - 8, logoY - 8, logoSize + 16, logoSize + 16, 8)
          ctx.fill()
          
          // Add subtle border
          ctx.strokeStyle = '#f0f0f0'
          ctx.lineWidth = 1
          ctx.stroke()
          
          // Create rounded rectangle clip for logo
          ctx.save()
          ctx.beginPath()
          ctx.roundRect(logoX, logoY, logoSize, logoSize, 5)
          ctx.clip()
          ctx.drawImage(img, logoX, logoY, logoSize, logoSize)
          ctx.restore()
          resolve()
        }
        img.src = logoImage
      })
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setLogoImage(null)
    // Clear the file input
    const fileInput = document.getElementById('logo-input')
    if (fileInput) fileInput.value = ''
  }

  const downloadQR = () => {
    const canvas = canvasRef.current
    const url = canvas.toDataURL('image/png')
    const link = downloadLinkRef.current
    link.href = url
    link.download = 'qrcode.png'
    link.click()
  }

  return (
    <div className="qr-generator">
      <div className="input-section">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL"
          className="text-input"
        />
        
        <div className="logo-upload">
          {!logoImage ? (
            <>
              <label htmlFor="logo-input" className="upload-label">
                Add Logo (Optional)
              </label>
              <input
                id="logo-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
            </>
          ) : (
            <div className="logo-preview">
              <img src={logoImage} alt="Logo preview" className="preview-image" />
              <button onClick={removeLogo} className="remove-logo-btn">
                Remove Logo
              </button>
            </div>
          )}
        </div>
      </div>

      {text && (
        <div className="qr-display">
          <canvas ref={canvasRef} className="qr-canvas"></canvas>
          <button onClick={downloadQR} className="download-btn">
            Download QR Code
          </button>
        </div>
      )}

      <a ref={downloadLinkRef} style={{ display: 'none' }}></a>
    </div>
  )
}

export default QRGenerator