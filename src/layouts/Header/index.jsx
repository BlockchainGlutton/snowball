import { useEffect } from "react";

import { Logo } from "../../data/data-layout/data-Header.js";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";

import {
  Addshrink,
  addActiveClass,
  OpenMenu,
  moveSmooth,
  connectWallet,
  makeSubStringForAddr,
} from "../../utils/";

import "./header.css";

import Preloader from "../../components/Preloader";

const Header = () => {
  const { isAuthenticated, account } = useMoralis();

  useEffect(() => {
    Addshrink();
  }, []);

  useEffect(() => {
    OpenMenu();
  }, []);

  useEffect(() => {
    moveSmooth();
  }, []);

  return (
    <>
      <Preloader />
      <header className="header-area wow fadeInDown" data-wow-delay="0.2s">
        <div className="classy-nav-container breakpoint-off">
          <div className="container">
            <nav
              className="classy-navbar justify-content-between"
              id="dreamNav"
            >
              <a className="nav-brand" href="/">
                <img src={Logo} alt="logo" style={{ height: 40 }} />
              </a>
              <div className="classy-navbar-toggler">
                <span className="navbarToggler" onClick={addActiveClass}>
                  <span />
                  <span />
                  <span />
                </span>
              </div>
              <div className="classy-menu">
                <div className="classycloseIcon">
                  <div className="cross-wrap" onClick={addActiveClass}>
                    <span className="top" />
                    <span className="bottom" />
                  </div>
                </div>
                <div className="classynav">
                  <ul id="nav">
                    {/* <li><a onClick={moveSmooth} href="#home">Home</a></li> */}

                    {/* <li><a onClick={() => {moveSmooth(); addActiveClass()}} href="#">Home</a></li> */}
                    <li>
                      <a
                        onClick={() => {
                          moveSmooth();
                          addActiveClass();
                        }}
                        href="https://anonydoxx.io/"
                      >
                        Website
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          moveSmooth();
                          addActiveClass();
                        }}
                        href="#"
                      >
                        Get Verified
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          moveSmooth();
                          addActiveClass();
                        }}
                        href="#roadmap"
                      >
                        Terms & Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          moveSmooth();
                          addActiveClass();
                        }}
                        href="#team"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    {/* <li><a onClick={moveSmooth} href="#contact">Contact</a></li> */}
                  </ul>
                  <a
                    href="https://anonydoxx-network-app.vercel.app/"
                    // onClick={() => {
                    //   connectWallet();
                    //   addActiveClass();
                    // }}
                    className="btn login-btn ml-50"
                  >
                    {/* {isAuthenticated && account
                      ? makeSubStringForAddr(account)
                      : "Connect"} */}
                    Connect
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
