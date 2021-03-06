import React from 'react';
import { Link } from 'react-router-dom'; // withRouter
import styled from 'styled-components';

const Sep = () => (<span> | </span>);
const Wrapper = styled.div`
  position: fixed;
  background: white;
  z-index: 1000;
  bottom: 40px;
  left: 0px;
  width: 100%;

  button { position: absolute; left: 5px; bottom: 10px; }
  pre { font-size: 0.8em; }
`;

const Bars = () => (
  <svg width={20} height={20} style={{ width: 20, height: 20 }} viewBox="0 0 1024 768" xmlns="http://www.w3.org/2000/svg">
    <path stroke="blue" fill="red" d="M0 192v128h768v-128h-768z m0 384h768v-128h-768v128z m0 256h768v-128h-768v128z" />
  </svg>
);

export class MockMenu extends React.Component {

  state = { collapsed: false };

  componentWillMount() {
    this.setState({ collapsed: sessionStorage.getItem('masterwalletMock') || false })
  }
  onToggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Wrapper>
        <button className="btn btn-default" onClick={this.onToggle}><Bars /></button>
        {collapsed ? [
        <pre key={1} style={{ textAlign: 'center', margin: 0}}>
          <Link to="/">/</Link>
          <Sep />
          <Link to="/unlock">Unlock</Link>
          <Sep />
          <Link to="/settings">Settings</Link>
          <Sep />
          <Link to="/wallets">My Wallets</Link>
          <Sep />
          <Link to="/assets">My Assets</Link>
        </pre>,
        <pre key={2} style={{ textAlign: 'center', margin: 0}}>
          <Link to="/welcome">Welcome</Link>
          <Sep />
          <Link to="/terms">Terms</Link>
          <Sep />
          <Link to="/privacy">Privacy</Link>
          <Sep />
          <Link to="/storage">Storage</Link>
          <Sep />
          <Link to="/shake">Shake</Link>
          <Sep />
          <Link to="/seed/1">Write Seed</Link>
          <Sep />
          <Link to="/confirm/seed">Confirm Seed</Link>
          <Sep />
          <Link to="/pin">Create PIN</Link>
          <Sep />
          <Link to="/confirm/pin">Confirm PIN</Link>
          <Sep />
          <Link to="/setup/complete">Complete</Link>
        </pre>,
        <pre key={3} style={{ textAlign: 'center', margin: 0}}>
          <Link to="/add">Add</Link>
          <Sep />
          <Link to="/create">Create Wallet</Link>
          <Link to="/create/ETH/name">[1]</Link>
          <Link to="/create/ETH/wallet">[2]</Link>
          <Link to="/create/ETH/paper">[3]</Link>
          <Sep />
          <Link to="/watch">Watch Wallet</Link>
          <Link to="/watch/ETH/name">[1]</Link>
          <Link to="/watch/ETH/wallet">[2]</Link>
          <Link to="/watch/ETH/complete">[3]</Link>
          <Sep />
          <Link to="/exchange">Watch Exchange</Link>
          <Link to="/exchange/kucoin/name">[1]</Link>
          <Link to="/exchange/kucoin/account">[2]</Link>
          <Link to="/exchange/kucoin/complete">[3]</Link>
          <Sep />
          <Link to="/import">Import Wallet</Link>
          <Link to="/import/ETH/name">[1]</Link>
          <Link to="/import/ETH/wallet">[2]</Link>
          <Link to="/import/ETH/complete">[3]</Link>
        </pre>,
        <pre key={4} style={{ textAlign: 'center', margin: 0 }}>
          <Link to="/wallets/1/balance">Balance</Link>
          <Sep />
          <Link to="/wallets/2/receive">Receive</Link>
          <Sep />
          <Link to="/wallets/3/send">Send</Link>
          <Sep />
          <Link to="/wallets/3/transactions/32023030">TX</Link>
          <Sep />
          <Link to="/networks/ETH">Network</Link>
          <Sep />
          <Link style={{ color: 'gray' }} to="/wallets/3/account">Account</Link>
          <Sep />
          <Link style={{ color: 'gray' }} to="/wallets/4/vote">Vote</Link>
        </pre>
        ]: false}
      </Wrapper>
    );
  }
}
