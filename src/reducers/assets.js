/*
const mockWallets = [
  {
    name: 'EOS Default',
    address: 'E0S0d49804D9367Cf9c11D1Fcc78632887B',
    network: 'EOS',
    icon: '/networks/EOS.png',
    estimate: '1,101',
    currency: 'USD',
    assets: [
      { id: 'EOS', name: 'EOS', amount: '200,303', icon: '/networks/EOS.png' },
      { id: 'EOSDAC', name: 'EOS DAC', amount: '30' },
      { id: 'KARMA', name: 'Karma Token', amount: '25' }
    ]
  },
  {
    name: 'Wallet 1',
    address: '0x111F46382d49804D9367Cf9c11D1Fcc786128c7c',
    network: 'ETH',
    icon: '/networks/ETH.png',
    assets: [
      { id: 'ETH', name: 'Ethereum', amount: '11.003020', icon: '/networks/ETH.png' },
      { id: 'WETH', name: 'Wrapped Ethereum', amount: '3.001020', icon: '/icons/weth_28.png' },
    ]
  },
  {
    name: 'BTC Main Wallet',
    address: '0x000F46382d49804D9367Cf9c11D1Fcc78634447B',
    network: 'BTC',
    icon: '/networks/BTC.png',
    estimate: '201',
    currency: 'USD',
    assets: [
      { id: 'BTC', name: 'Bitcoin', amount: '0.102020', icon: '/networks/BTC.png' },
    ]
  },
  {
    name: 'Kucoin Main Acc',
    address: '23838-93923-30033930',
    network: 'KUCOIN',
    icon: '/exchanges/kucoin.png',
    assets: [

    ]
  },
  {
    name: 'Binance Secondary Account',
    address: 'asdfsdf23-3-04203404040',
    network: 'BINANCE',
    icon: '/exchanges/binance.png',
    assets: [

    ]
  }
];

const mockAssets = [
  { id: 'BTC', name: 'Bitcoin', amount: '0.102020', icon: '/networks/BTC.png' },
  { id: 'EOS', name: 'EOS', amount: '200,303', icon: '/networks/EOS.png' },
  { id: 'EOSDAC', name: 'EOS DAC', amount: '30' },
  { id: 'ETH', name: 'Ethereum', amount: '11.003020', icon: '/networks/ETH.png' },
  { id: 'KARMA', name: 'Karma Token', amount: '25' },
  { id: 'WETH', name: 'Wrapped Ethereum', amount: '3.001020', icon: '/icons/weth_28.png' }
];
*/
const initialState = {
  total: '0',
  currency: 'USD',
  showPrices: true,
  wallets: [],
  assets: [],
  verifyWallet: { name: '', isUnique: true },
  status: { isLoading: true, error: '' }
};

const fixIcons = (wallets) => (wallets.map(w => ({...w, icon: `/networks/${w.network}.png`})));

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_NAME': {
      const { value } = action.payload;
      const namesUsed = state.wallets.map(w => w.name);
      const verifyWallet = { name: value, isUnique: namesUsed.indexOf(value) === -1 };
      return { ...state, verifyWallet };
    }
    case 'WALLETS_LIST_RECEIVED': {
      const status = { isLoading: false, error: '' };
      return { ...state, wallets: fixIcons(action.payload), status };
    }
    case 'WALLETS_LIST_REQUEST': {
      const status = { isLoading: true, error: '' };
      return { ...state, status };
    }
    case 'WALLETS_LIST_ERROR': {
      const status = { isLoading: false, error: action.payload  };
      return { ...state, status };
    }
    default:
  }
  return state
};

