import React from 'react';
import { Steps } from './../controls/Steps';
import { PinCode } from './../controls/PinCode';
import { InstallationMenu, findWizardStep } from './../../config/Wizards';
import { WizardPanel, Next } from './../panel/index';

const _t = {
  createPin: 'Create PIN',
  usage: 'PIN code encrypts your seed key and provides you temporary access to the wallet.',
  willBeRequired: 'It will be required for unlocking the wallet.',
  continue: 'Continue'
};

export const PinComponent = ({ install, onUpdatePin, onContinue }) => {
  const menu = InstallationMenu;
  const step = findWizardStep(menu, '/pin');
  const onComplete = () => (onContinue(menu[step + 1]));
  return (
    <WizardPanel title={_t.createPin} wide={true}>
      {install.pinCode.length === 4 ? <Next title={_t.continue} to={menu[step + 1]} /> : false}
      <p style={{ textAlign: 'center', marginBottom: 0, marginTop: 30 }}>{_t.usage}</p>
      <p style={{ textAlign: 'center' }}>{_t.willBeRequired}</p>

      <PinCode value={install.pinCode} onChange={onUpdatePin} onComplete={onComplete} />

      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
}
