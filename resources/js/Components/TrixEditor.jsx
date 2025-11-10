import { useEffect, useRef } from 'react'
import 'trix/dist/trix.css'
import 'trix'

export default function TrixEditor({ value = '', onChange, inputName = 'note' }) {
  const inputRef = useRef(null)

  useEffect(() => {
    const el = inputRef.current
    const handler = (e) => {
      onChange && onChange(e.target.value)
    }
    el.addEventListener('trix-change', handler)
    return () => el.removeEventListener('trix-change', handler)
  }, [onChange])

  return (
    <>
      <input id={inputName} type="hidden" defaultValue={value} ref={inputRef} />
      <trix-editor input={inputName}></trix-editor>
    </>
  )
}
