import React from 'react';
import IFrame from 'react-iframe';
import TextInput from './../controls/TextInput';
import RadioButtonGroup from './../controls/RadioButtonGroup';
import { isElectron, fetchBlob } from './../../services/ApiRequest';

const _t = {
  printWallet: 'Print Wallet',
  labelInsecure: 'Insecure Paper Wallet',
  labelSecure: 'Password Protected Paper Wallet',
  yourPassword: 'Secret Wallet Password'
};

export default class PaperWalletComponent extends React.Component {

  state = {
    password: '',
    mode: 'insecure',
    pdfUrl: '',
    encrypting: false,
    downloading: false
  };

  componentWillMount = () => {
    const secure = this.props.secure === 'true';
    if (!secure) {
      this.setState({ mode: 'insecure', valid: true }, () => { this.loadFrame() });
    } else {
      this.setState({ mode: 'secure', valid: false });
    }
  };

  onChange = (password) => {
    const valid = /^[\x00-\x7F]+$/.test(password);
    this.setState({ password, valid, pdfUrl: '' });
  };

  onChangeMode = (mode) => {
    this.setState({ mode, pdfUrl: '', downloading: false, password: '' }, () => {
      if (mode === 'insecure') {
        this.loadFrame();
      };
    });
  };

  loadFrame = async () => {
    const { walletId } = this.props;
    const { password } = this.state;
    if (walletId) {
      this.setState({ encrypting: true, pdfUrl: '' });
      const url = `/api/wallets/${walletId}/pdf?rotate=true`;
      const headers = new Headers();
      if (password) {
        headers.append('BIP38-Passphrase', password);
      }
      
      const response = await fetchBlob(url, { headers });
      const pdfUrl = URL.createObjectURL(response);
      this.setState({
        pdfUrl,
        encrypting: false
      });
    }
  };

  render() {

    const { password, mode, encrypting, pdfUrl, valid, downloading } = this.state;

    const iframe = (
      <IFrame
        url={pdfUrl}
        //url='http://localhost:7773/api/wallets/81b98d95ea338af6c3a5928e4a9055ea58bbf26a/pdf?rotate=true'
        height="750px"
        width="300px"
        display="initial"
        position="relative"
      />
    );

    return (
      <div style={{ margin: '30px auto' }}>
        {_t.printWallet}
        <div style={{ marginTop: 10 }}>
          <RadioButtonGroup options={[
            { value: 'insecure', label: _t.labelInsecure },
            { value: 'secure', label: _t.labelSecure }
          ]} onChange={this.onChangeMode} value={mode} />
        </div>
        {mode === 'secure' ?
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 5 }}>
              <TextInput
                value={password}
                onChange={this.onChange}
                placeholder={_t.yourPassword}
                style={{
                  textAlign: 'center',
                  float: 'left',
                  width: '88%'
                }}
              />
              <button
                className={`btn btn-xs btn-warning ${!valid ? 'disabled' : ''}`}
                style={{
                  padding: "2px 10px",
                  float: 'right'
                }}
                onClick={() => {
                  if (password && valid) {
                    this.loadFrame();
                  }
                }}
              >
                <img 
                  src={`media/${encrypting ? 'loader365thumb.gif' : 'lock-solid.svg'}`} 
                  style={{ width: 'auto', height: 12 }}
                  alt='Submit Password'
                />
              </button>
            </div>
          </div> : false
        }
        <div style={{ textAlign: 'center' }}>
          {
            isElectron() ? (
              downloading ?
                iframe :
                (
                  pdfUrl 
                  ? 
                  <button
                    className='btn btn-success'
                    onClick={() => { this.setState({ downloading: true }) }}>
                    {_t.printWallet}
                  </button> 
                  : false
                )
                
            )
              : iframe
          }
        </div>
      </div>
    );

  }
}