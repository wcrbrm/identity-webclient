import React from 'react';
import { Steps } from './../../controls/Steps';
import { CreateMenu } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import { NetworkSelector } from './../../controls/NetworkSelector';

const _t = {
  selectNetwork: 'New Wallet: Select Network',
  continue: 'Continue'
};

export class CreateWalletNetworkComponent extends React.Component {
  state = {
    network: 'ETH',
    testnet: 1
  };

  onChange = (value) => {
    this.setState({ network: value });
  };
  onTestNet = (value) => {
    this.setState({ testnet: value });
  }

  render() {
    const { network, testnet } = this.state;
    const menu = CreateMenu(network);
    const step = 0;

    return (
      <WizardPanel title={_t.selectNetwork}>
        {network ? <Next to={menu[step + 1]} title={_t.continue} /> : false}
        <NetworkSelector
          value={network} onChange={this.onChange} 
          isTestNet={testnet}
          onTestNet={this.onTestNet}
        />
        <Steps {...{ step, menu }} />
      </WizardPanel>
    )
  }
}

