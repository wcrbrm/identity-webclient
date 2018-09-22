import React from 'react';
import Esc from './../panel/Esc';
import { WalletPanel } from './../panel/index';
import { JDentIcon } from './../jdenticon/index';
import { calcFontSize } from './../../services/FontResize';
import TextInput from './../controls/TextInput';

const _t = {
  send: 'Send Assets',
  toAddress: 'To The Address',
  imageForVerification: 'Image For Verification',
  buttonLabel: 'SEND',
  from: 'Sender:',
  to: 'Receiver:',
  change: 'Change:',
  amount: 'Amount:',
  fee: 'Fee:'
};

const assetsTotal = (wallet) => {
  let value = 0;
  if (wallet && wallet.assets && wallet.assets.assets) {
    value = wallet.assets.assets.reduce((total, asset) => total + asset.value, 0);
  }
  return value;
};

const isValid = ({ qty, to, availableAssets }) => (
  !isNaN(qty) && parseFloat(qty) > 0 && parseFloat(qty) <= availableAssets && to.length > 0
);

export class WalletSendComponent extends React.Component {

  state = {
    to: '',
    qty: 0,
  };

  componentWillMount() {
    const id = this.props.match.params.walletId;
    this.props.onInit({id});
  };

  componentWillReceiveProps(nextProps) {
    // Update assets after successful transaction
    const transactions = this.props.transactions;
    const nextTransactions = nextProps.transactions;
    if (transactions.txid !== nextTransactions.txid) {
      this.props.onInit({ id: this.props.match.params.walletId });
    }
  };

  onChange = (field, value) => {
    this.setState({ [field]: value });
  };

  onSubmit = () => {
    const { walletId } = this.props.match.params;
    const { to, qty } = this.state;
    if (isValid({ qty, to, availableAssets: assetsTotal(this.props.wallet) })) {
      this.props.onSubmit({ walletId, to, amount: qty });
    }
  };

  render() {
    const { wallet, transactions } = this.props;
    const { object, isLoading, error, assets } = wallet; // unused: isLoading, error
    const { id, network } = object; // unused: address, network, testnet, name, icon
    const { qty, to } = this.state;
    const { sender } = transactions;
    const errorMessage = error ? error : assets.error;
    const availableAssets = assetsTotal(wallet);
    
    const valid = isValid({ qty, to, availableAssets });

    sender.tx = {
      "txid": "75f459f7153da77c27ce9bfd0e8408f9657fc21eae41cd76e460771609682a95",
      "from": "mwoCPWDGL1gcEbQmgpDSkXuZPdntPPycja",
      "to": "n1Scko3896jYrxX3rnjvySPQvTZp1rchkZ",
      "change": "mwoCPWDGL1gcEbQmgpDSkXuZPdntPPycja",
      "amount": 0.01,
      "fee": 0.0002021
    };
    return (
      <WalletPanel {...object} back={true} isLoading={isLoading}>
        <Esc to={`/wallets/${id}/balance`} />
        {errorMessage ? (
           <div className='error'>{errorMessage}</div>
        ) : (
          <div>
            <h3 style={{ fontSize: 18, textAlign: 'center', color: '#8760f6' }}>{_t.send}</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextInput 
                  value={qty} 
                  autofocus={true} 
                  onChange={v => this.onChange('qty', v)} 
                  style={{ width: 150, textAlign: 'center' }} 
                  type='number' 
                  min={0} 
                />
                <div style={{ color: 'rgb(169,169,169)' }}>{availableAssets}</div>
              </div>
              <div style={{ fontWeight: 'bold', margin: 5 }}>&nbsp; {network}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 70 }}>
                {sender.processing 
                  ? 
                  <img src='media/loader365thumb.gif' style={{ width: 20, height: 20 }} />
                  :
                  <button 
                    className={`btn btn-success ${valid ? '' : 'disabled'}`}
                    style={{ margin: 5 }}
                    onClick={this.onSubmit}
                  >
                    {_t.buttonLabel}
                  </button>
                }
              </div>
            </div>
            <h3 style={{ marginTop: 20, fontSize: 18, textAlign: 'center', color: '#8760f6' }}>
              {_t.toAddress}
            </h3>
            <div>
              <TextInput value={to} onChange={v => this.onChange('to', v)} style={{ width: '100%', textAlign: 'center' }}/>
            </div>
            {sender.error ? <div className='alert alert-danger'>
              {sender.error}
            </div> : false}
            {sender.tx ? 
              <div 
                className='alert alert-success'
                style={{ 
                  wordWrap: 'break-word',
                  textAlign: 'left'
                }}
              >
                <p style={{ fontSize: 'smaller' }}><b>{sender.tx.txid}</b></p>
                {Object.keys(sender.tx).map(f => 
                  f === 'txid' 
                  ? false 
                  : (<div style={{ 
                    fontSize: calcFontSize({ text: `${_t[f]} ${sender.tx[f]}`, maxWidth: 255 }) 
                  }}>
                    <b>{_t[f]}</b> {sender.tx[f]}
                  </div>)
                )}
              </div> : false}
            {to ? [
              <div key={1} style={{ textAlign: 'center', fontSize: 12, color: '#888' }}>{_t.imageForVerification}</div>,
              <div key={2} style={{ margin: '0px auto', width: 100,  background: '#fff' }}>
                <JDentIcon value={to} size={100} />
              </div>
            ] : false}
          </div>
        )}
      </WalletPanel>
    );
  }
};
