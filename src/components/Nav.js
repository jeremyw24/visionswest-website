import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'
import Logo from './Logo'

import './Nav.css'

export class Navigation extends Component {
  state = {
    active: false,
    activeSubNav: false,
    currentPath: false
  }

  componentDidMount = () =>
    this.setState({ currentPath: this.props.location.pathname })

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()
  // keyboard events
  handleLinkKeyDown = ev => {
    if (ev.keyCode === 13) {
      this.state.active && this.handleMenuToggle()
    }
  }

  toggleSubNav = subNav =>
    this.setState({
      activeSubNav: this.state.activeSubNav === subNav ? false : subNav
    })
  keyToggleSubNav = (e, subNav) => {
    // key o is for open so you can enter key to open
    if (e.keyCode === 79 || e.keyCode === 27) {
      this.toggleSubNav(subNav)
    }
  }
  render() {
    const { active } = this.state,
      { subNav } = this.props,
      NavLink = ({ to, className, children, ...props }) => (
        <Link
          to={to}
          className={`NavLink ${
            to === this.state.currentPath ? 'active' : ''
          } ${className}`}
          onClick={this.handleLinkClick}
          onKeyDown={this.handleLinkKeyDown}
          tabIndex={0}
          aria-label="Navigation"
          role="button"
          {...props}
        >
          {children}
        </Link>
      )

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          <Link
            to="/"
            onClick={this.handleLinkClick}
            onKeyDown={this.handleLinkKeyDown}
            tabIndex={0}
            aria-label="Navigation"
            role="button"
          >
            <Logo />
          </Link>
          <div className="Nav--Links">
            <NavLink to="/">Home</NavLink>
            <div
              className={`Nav--Group ${
                this.state.activeSubNav === 'film-video' ? 'active' : ''
              }`}
            >
              <span
                className={`NavLink Nav--GroupParent ${
                  this.props.location.pathname.includes('film-video')
                    ? 'active'
                    : ''
                }`}
                onClick={() => this.toggleSubNav('film-video')}
                onKeyDown={e => this.keyToggleSubNav(e, 'film-video')}
                tabIndex={0}
                aria-label="Navigation"
                role="button"
              >
                Film & Video
                <div className="Nav--GroupLinks">
                  <NavLink to="/weddings/" className="Nav--GroupLink">
                    Weddings
                  </NavLink>
                  <NavLink to="/live-stream/" className="Nav--GroupLink">
                    Live Stream
                  </NavLink>
                </div>
              </span>
            </div>
            <div
              className={`Nav--Group ${
                this.state.activeSubNav === 'infoPages' ? 'active' : ''
              }`}
            >
              <span
                className={`NavLink Nav--GroupParent ${
                  this.props.location.pathname.includes('infoPages')
                    ? 'active'
                    : ''
                }`}
                onClick={() => this.toggleSubNav('infoPages')}
                onKeyDown={e => this.keyToggleSubNav(e, 'infoPages')}
                tabIndex={0}
                aria-label="Navigation"
                role="button"
              >
                Web & Digital
                <div className="Nav--GroupLinks">
                  <NavLink to="/weddings/" className="Nav--GroupLink">
                    Weddings
                  </NavLink>
                  <NavLink to="/live-stream/" className="Nav--GroupLink">
                    Live Stream
                  </NavLink>
                </div>
              </span>
            </div>
            <div
              className={`Nav--Group ${
                this.state.activeSubNav === 'infoPages' ? 'active' : ''
              }`}
            >
              <span
                className={`NavLink Nav--GroupParent ${
                  this.props.location.pathname.includes('infoPages')
                    ? 'active'
                    : ''
                }`}
                onClick={() => this.toggleSubNav('infoPages')}
                onKeyDown={e => this.keyToggleSubNav(e, 'infoPages')}
                tabIndex={0}
                aria-label="Navigation"
                role="button"
              >
                Funeral Services
                <div className="Nav--GroupLinks">
                  <NavLink to="/weddings/" className="Nav--GroupLink">
                    Memorial Videos
                  </NavLink>
                  <NavLink to="/live/" className="Nav--GroupLink">
                    Live Stream Services
                  </NavLink>
                </div>
              </span>
            </div>
            <NavLink to="/live/">Live Services</NavLink>
            <NavLink to="/contact/">Contact</NavLink>
          </div>
          <button
            className="Button-blank Nav--MenuButton"
            onClick={this.handleMenuToggle}
            tabIndex={0}
            aria-label="Navigation"
          >
            {active ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    )
  }
}

export default ({ subNav }) => (
  <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
)
