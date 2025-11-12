// resources/js/Components/TrixEditor.jsx
import { useEffect, useRef } from 'react'
import 'trix/dist/trix.css'
import 'trix'

export default function TrixEditor({ value = '', onChange, inputName = 'note' }) {
  const inputRef = useRef(null)
  const editorRef = useRef(null)

  // sinkron ke react
  useEffect(() => {
    const inputEl = inputRef.current
    const handler = (e) => {
      onChange && onChange(e.target.value)
    }
    inputEl.addEventListener('trix-change', handler)
    return () => inputEl.removeEventListener('trix-change', handler)
  }, [onChange])

  // paksa arah teks LTR
  useEffect(() => {
    const editorEl = editorRef.current
    if (editorEl) {
      editorEl.setAttribute('dir', 'ltr')
      editorEl.style.textAlign = 'left'
    }
  }, [])

  return (
    <>
      {/* hidden input yang dipegang Trix */}
      <input id={inputName} type="hidden" defaultValue={value} ref={inputRef} />
      {/* editor-nya */}
      <trix-editor ref={editorRef} input={inputName}></trix-editor>
    </>
  )
}
