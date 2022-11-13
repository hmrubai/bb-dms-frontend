import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import sm_logo from '../../../../assets/images/sm_logo.png';
import { ConfigContext } from '../../../../contexts/ConfigContext';
import * as actionType from '../../../../store/actions';

const NavLogo = () => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const { dispatch } = configContext;

  let toggleClass = ['mobile-menu'];
  if (collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }
  const mystyle = {
    ' backgroundImage': `url(${sm_logo})`,
    'border-radius': '10px',
    width: '35px',
    height: '35px',
    display: 'inline-flex',
    ' align-items': 'center',
    'justify-content': 'center',
    background: 'none' 
  };

  return (
    <React.Fragment>
      <div className="navbar-brand header-logo">
        <Link to="/" className="b-brand">
          <div className="b-bg" style={mystyle}>
            {/* <i className="feather icon-trending-up" /> */}
            <img className="img-fluid" src={sm_logo} alt="" />
          </div>
          <span className="b-title">BB DMS</span>
        </Link>
        <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}>
          <span />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NavLogo;
