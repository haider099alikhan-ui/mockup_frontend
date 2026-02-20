export const DISPLAY_WIDTH = 280;
export const DISPLAY_HEIGHT = 480;

function getElementSnapPoints(element) {
  return {
    left: element.x,
    right: element.x + element.width,
    centerX: element.x + element.width / 2,
    top: element.y,
    bottom: element.y + element.height,
    centerY: element.y + element.height / 2,
  };
}

/**
 * Computes snap-to-guide positions for a moving element.
 * @param {Object} movingElement - Element being dragged { x, y, width, height }
 * @param {Array} allElements - All elements on the slide
 * @param {number} canvasWidth - Canvas width
 * @param {number} canvasHeight - Canvas height
 * @param {number} threshold - Snap threshold in pixels (default 5)
 * @returns {{ snappedX: number|null, snappedY: number|null, guides: Array }}
 */
export function computeSnapGuides(
  movingElement,
  allElements,
  canvasWidth,
  canvasHeight,
  threshold = 5
) {
  const sp = getElementSnapPoints(movingElement);
  const guides = [];
  let snappedX = null;
  let snappedY = null;

  // X-axis targets: canvas center, edges, and other elements
  const xTargets = [
    { val: canvasWidth / 2 },
    { val: 0 },
    { val: canvasWidth },
  ];
  for (const el of allElements) {
    if (el === movingElement) continue;
    const elSp = getElementSnapPoints(el);
    xTargets.push({ val: elSp.left }, { val: elSp.right }, { val: elSp.centerX });
  }

  let bestXDiff = Infinity;
  let bestXResult = null;

  for (const target of xTargets) {
    const snapConfigs = [
      { point: 'left', getNewX: (t) => t },
      { point: 'right', getNewX: (t) => t - movingElement.width },
      { point: 'centerX', getNewX: (t) => t - movingElement.width / 2 },
    ];
    for (const { point, getNewX } of snapConfigs) {
      const movingVal = sp[point];
      const diff = Math.abs(movingVal - target.val);
      if (diff <= threshold && diff < bestXDiff) {
        bestXDiff = diff;
        bestXResult = {
          snappedX: getNewX(target.val),
          guide: { type: 'vertical', position: target.val },
        };
      }
    }
  }

  if (bestXResult) {
    snappedX = bestXResult.snappedX;
    guides.push(bestXResult.guide);
  }

  // Y-axis targets: canvas center, edges, and other elements
  const yTargets = [
    { val: canvasHeight / 2 },
    { val: 0 },
    { val: canvasHeight },
  ];
  for (const el of allElements) {
    if (el === movingElement) continue;
    const elSp = getElementSnapPoints(el);
    yTargets.push({ val: elSp.top }, { val: elSp.bottom }, { val: elSp.centerY });
  }

  let bestYDiff = Infinity;
  let bestYResult = null;

  for (const target of yTargets) {
    const snapConfigs = [
      { point: 'top', getNewY: (t) => t },
      { point: 'bottom', getNewY: (t) => t - movingElement.height },
      { point: 'centerY', getNewY: (t) => t - movingElement.height / 2 },
    ];
    for (const { point, getNewY } of snapConfigs) {
      const movingVal = sp[point];
      const diff = Math.abs(movingVal - target.val);
      if (diff <= threshold && diff < bestYDiff) {
        bestYDiff = diff;
        bestYResult = {
          snappedY: getNewY(target.val),
          guide: { type: 'horizontal', position: target.val },
        };
      }
    }
  }

  if (bestYResult) {
    snappedY = bestYResult.snappedY;
    guides.push(bestYResult.guide);
  }

  return { snappedX, snappedY, guides };
}

/**
 * Renders snap guide lines on the canvas.
 */
export function SnapGuideLines({ guides, canvasWidth, canvasHeight }) {
  if (!guides || guides.length === 0) return null;

  const lineStyle = {
    position: 'absolute',
    backgroundColor: '#00d4ff',
    opacity: 0.8,
    pointerEvents: 'none',
    zIndex: 100,
  };

  return (
    <>
      {guides.map((guide, i) =>
        guide.type === 'horizontal' ? (
          <div
            key={`h-${i}`}
            style={{
              ...lineStyle,
              left: 0,
              top: guide.position,
              width: canvasWidth,
              height: 1,
            }}
          />
        ) : (
          <div
            key={`v-${i}`}
            style={{
              ...lineStyle,
              left: guide.position,
              top: 0,
              width: 1,
              height: canvasHeight,
            }}
          />
        )
      )}
    </>
  );
}
