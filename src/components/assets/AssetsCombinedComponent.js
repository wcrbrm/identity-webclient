import React from 'react';
import { WizardPanel } from './../panel/index';

const _t = {
  assetsCombined: 'All Assets'
};

export const AssetsCombinedComponent = () => (
  <WizardPanel title={_t.assetsCombined}>
    <h4 style={{ borderRadius: '50%', border: '1px green solid', height: 150, lineHeight: '150px', textAlign: 'center' }}>XXXX USD</h4>
    <ul>
      <li>ASSET #1: NNN, X.XX USD</li>
      <li>ASSET #2: NNN, X.XX USD</li>
      <li>ASSET #3: NNN, X.XX USD</li>
      <li>ASSET #4: NNN, X.XX USD</li>
    </ul>
  </WizardPanel>
);