import React from 'react';
import { GRID } from '../../constants/config';

interface GridBackgroundProps {
  zoomScale: number;
  panX: number;
  panY: number;
}

export const GridBackground = React.memo(function GridBackground({ zoomScale, panX, panY }: GridBackgroundProps) {
  const minorSize = GRID.size * zoomScale;
  const majorSize = minorSize * 4;
  const minorOffsetX = panX % minorSize;
  const minorOffsetY = panY % minorSize;
  const majorOffsetX = panX % majorSize;
  const majorOffsetY = panY % majorSize;

  const showMajor = zoomScale >= 0.5;
  const showMinor = zoomScale <= 2.0;

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
      background: '#1a1a2e',
    }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {showMinor && (
            <pattern
              id="grid-minor"
              width={minorSize}
              height={minorSize}
              patternUnits="userSpaceOnUse"
              x={minorOffsetX}
              y={minorOffsetY}
            >
              <path d={`M ${minorSize} 0 L 0 0 0 ${minorSize}`} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
            </pattern>
          )}
          {showMajor && (
            <pattern
              id="grid-major"
              width={majorSize}
              height={majorSize}
              patternUnits="userSpaceOnUse"
              x={majorOffsetX}
              y={majorOffsetY}
            >
              <path d={`M ${majorSize} 0 L 0 0 0 ${majorSize}`} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
            </pattern>
          )}
        </defs>
        {showMajor && <rect width="100%" height="100%" fill="url(#grid-major)" />}
        {showMinor && <rect width="100%" height="100%" fill="url(#grid-minor)" />}
      </svg>
    </div>
  );
});
