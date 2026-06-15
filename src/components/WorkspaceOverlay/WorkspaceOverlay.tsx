import React from 'react';
import { ZoomWidget } from './ZoomWidget';
import { TelemetryHUD } from './TelemetryHUD';
import { AssetPortArray } from './AssetPortArray';

export const WorkspaceOverlay = React.memo(function WorkspaceOverlay() {
  return (
    <>
      <ZoomWidget />
      <TelemetryHUD />
      <AssetPortArray />
    </>
  );
});
