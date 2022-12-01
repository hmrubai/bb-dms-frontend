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
 
  return (
    <React.Fragment>
      <div className="navbar-brand header-logo">
        <Link to="/" className="">
          <div className="b-bg" >
          
            <img className="img-fluid " width={25} src={sm_logo} alt="" />
          </div>
          <span className="b-title h6" >DMS</span>
        </Link>
        <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}>
          <span />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NavLogo;
