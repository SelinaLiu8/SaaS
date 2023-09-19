import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
  
    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])
  
    function calcHeight(el) {
      const height = el.offsetHeight;
      setMenuHeight(height);
    }
  
    function DropdownItem(props) {
      return (
        <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
          {props.children}
        </a>
      );
    }

    return (
        <div className="dropdown-container">
          <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
            <CSSTransition
              in={activeMenu === 'main'}
              timeout={500}
              classNames="menu-primary"
              unmountOnExit
              onEnter={calcHeight}>
              <div className="menu">
                <DropdownItem>My Profile</DropdownItem>
                <DropdownItem goToMenu="settings">
                  Settings
                </DropdownItem>
                <DropdownItem goToMenu="animals">
                  Animals
                </DropdownItem>
              </div>
            </CSSTransition>
    
            <CSSTransition
              in={activeMenu === 'settings'}
              timeout={500}
              classNames="menu-secondary"
              unmountOnExit
              onEnter={calcHeight}>
              <div className="menu">
                <DropdownItem goToMenu="main">
                  <h2>My Tutorial</h2>
                </DropdownItem>
                <DropdownItem>HTML</DropdownItem>
              </div>
            </CSSTransition>
    
            <CSSTransition
              in={activeMenu === 'animals'}
              timeout={500}
              classNames="menu-secondary"
              unmountOnExit
              onEnter={calcHeight}>
              <div className="menu">
                <DropdownItem goToMenu="main">
                  <h2>Animals</h2>
                </DropdownItem>
                <DropdownItem>Kangaroo</DropdownItem>
                <DropdownItem>Frog</DropdownItem>
                <DropdownItem>Horse?</DropdownItem>
                <DropdownItem>Hedgehog</DropdownItem>
              </div>
            </CSSTransition>
          </div>
        </div>
      );
    }