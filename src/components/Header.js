import React from 'react'
import {Link} from 'react-router-dom'


class Header extends React.Component {

    onSignOut() {       
           
            //localStorage.clear();           
            this.props.history.push('/')               
    }

    toHome(){
        this.props.history.push('/home')
    }
    render() {
        return (
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" onClick={this.toHome}>Ngetes Ajah</a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <Link className="nav-link" to="" onClick={this.onSignOut}>Sign out</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Header