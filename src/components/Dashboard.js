import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

import DashboardSwitcher from './DashboardSwitcher'

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar />
                        <DashboardSwitcher />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard