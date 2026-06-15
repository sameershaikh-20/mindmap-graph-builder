import React from 'react';
import { GRID } from '../../constants/config';

interface GridBackgroundProps {
  zoomScale: number;
  panX: number;
  panY: number;
}

export const GridBackground = React.memo(function GridBackground({ zoomScale, panX, panY }: GridBackgroundProps) {
  const dotSize = GRID.size * zoomScale;
  const majorDotSize = dotSize * 4;
  const dotOffsetX = panX % dotSize;
  const dotOffsetY = panY % dotSize;
  const majorDotOffsetX = panX % majorDotSize;
  const majorDotOffsetY = panY % majorDotSize;

  const showMajor = zoomScale >= 0.5;
  const showMinor = zoomScale <= 2.0;
  const minorOpacity = Math.min(0.3, (2.0 - zoomScale) / 2);

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
      background: 'radial-gradient(ellipse at 50% 50%, #1e1e3f 0%, #1a1a2e 70%)',
    }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {showMinor && (
            <pattern
              id="grid-minor-dots"
              width={dotSize}
              height={dotSize}
              patternUnits="userSpaceOnUse"
              x={dotOffsetX}
              y={dotOffsetY}
            >
              <circle cx={dotSize / 2} cy={dotSize / 2} r={1} fill={`rgba(255,255,255,${0.06 * minorOpacity})`} />
            </pattern>
          )}
          {showMajor && (
            <pattern
              id="grid-major-dots"
              width={majorDotSize}
              height={majorDotSize}
              patternUnits="userSpaceOnUse"
              x={majorDotOffsetX}
              y={majorDotOffsetY}
            >
              <circle cx={majorDotSize / 2} cy={majorDotSize / 2} r={1.5} fill="rgba(255,255,255,0.12)" />
            </pattern>
          )}
        </defs>
        {showMinor && <rect width="100%" height="100%" fill="url(#grid-minor-dots)" />}
        {showMajor && <rect width="100%" height="100%" fill="url(#grid-major-dots)" />}
      </svg>
    </div>
  );
});
