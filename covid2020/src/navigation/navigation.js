import React from 'react'

class Navbar extends React.Component {
    render() {
        return (
            <>
            <div className="navbar">{this.props.children}</div>
            </>
        )
    }
}

class NavButton extends React.Component {
    render() {
        return (
            <span className="navbutton">{this.props.children}</span>
        )
    }
}

export {NavButton};
export default Navbar;