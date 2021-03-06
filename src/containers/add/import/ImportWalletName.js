import { connect } from 'react-redux';
import { ImportWalletNameComponent } from './../../../components/add/import/ImportWalletNameComponent';

const section = 'import';

const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({
  onChange: (value) => {
    dispatch({ type: 'UPDATE_NAME', payload: { section, value } });
  }
});

export const ImportWalletName = connect(mapStateToProps, mapDispatchToProps)(ImportWalletNameComponent);
export default { ImportWalletName };
