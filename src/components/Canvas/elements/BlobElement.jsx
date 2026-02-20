import { memo } from 'react'

function BlobElement({ element }) {
  const borderRadius = element.style?.borderRadius || (element.width === element.height ? '50%' : '0%')
  
  return (
    <div
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        borderRadius: borderRadius,
        backgroundColor: element.style?.color || '#2a2a2a',
        opacity: element.style?.opacity ?? 0.4,
        pointerEvents: 'none',
      }}
    />
  )
}

export default memo(BlobElement)
