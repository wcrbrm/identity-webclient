import React from 'react';
import PropTypes from 'prop-types';

const Lbl = ({ onClick, label, comment, disabled, children }) => {
  const styleLabel = {
    flex: 1, whiteSpace: 'nowrap', marginLeft: '5px', color: '#000',
    fontWeight: 'bold', fontSize: 14
  };
  if (disabled) {
    styleLabel.color = '#aaa';
    styleLabel.cursor = 'default';
  }
  const styleComment = {
    fontSize: '0.8em',
    fontWeight: 'normal',
    color: '#444',
    whiteSpace: 'normal',
    paddingRight: 10
  };
  return (
    <div onMouseDown={onClick} style={styleLabel}>
      {label}
      <div style={styleComment}>{comment}</div>
      {children}
    </div>);
};

/* eslint-disable jsx-a11y/label-has-for */
export const RadioButton = ({ value, side, label, comment, children, disabled, checked, onChange }) => {
  const onClick = () => { if (!disabled) onChange(value); };
  const styleTop = {
    display: 'flex', alignContent: 'center', alignItems: 'flex-start', padding: '0px 3px', cursor: 'pointer',
    userSelect: 'none'
  };
  const chkAtLeft = (!side || side === 'left');
  const styleCheck = { textAlign: chkAtLeft ? 'left' : 'right', margin: '0px auto' };
  const styleRadioButtonCont = { marginTop: 10 };
  const styleRadioButton = { stroke: '#333', strokeWidth: '1px', strokeOpacity: '0.5' };
  if (disabled) {
    styleRadioButton.stroke = '#aaa';
    styleRadioButton.cursor = 'default';
  }
  if (checked) {
    styleTop.background = '#ede7f3 linear-gradient(#fff 0%, #ede7f3 80%)';
    styleTop.borderRadius = 4;
    styleTop.border = '1px #007bff solid';
    styleTop.borderTop = '1px #6239bf solid';
    styleTop.borderBottom = '1px #61c38b solid';
  } else {
    styleTop.border = '1px transparent solid';
  }
  return (
    <label className='radioButton' style={styleTop}>
      {(!chkAtLeft && (label || children)) ? <Lbl {...{ onClick, label, comment, children, disabled }} /> : ''}
      <div style={styleCheck} onMouseDown={onClick} >
        <svg width='20' height='20' style={styleRadioButtonCont} >
          <circle cx='10' cy='10' r='8' fill='transparent' style={styleRadioButton} />
          { checked ? <circle cx='10' cy='10' r='4' fill='#666' fillOpacity='0.9' /> : ''}
        </svg>
      </div>
      {(chkAtLeft && (label || children)) ? <Lbl {...{ onClick, label, comment, children, disabled }} /> : ''}
    </label>
  );
};

RadioButton.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default RadioButton;
