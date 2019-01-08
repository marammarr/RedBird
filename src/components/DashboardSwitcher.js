import React from 'react'
import { Switch, Route } from 'react-router-dom'
//import Listmahasiswa from './content/company/Listcompany';
//import Listjurusan from './content/company/Listcompany';
//import Test from './content/company/Test';
import home from './content/Home'
import ListJurusan from './content/jurusan/ListJurusan'
import ListUser from './content/user/ListUser'
import ListMahasiswa from './content/mahasiswa/ListMahasiswa'
import listMenu from './content/menu/listMenu'
import listKrs from './content/krs/ListKrs'

import { Redirect } from 'react-router';
import apiconfig from '../configs/api.config.json'
import ViewUser from './content/user/ViewUser';

const DashboardSwitcher = () => {
 
    return (
     
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <Switch>
            <Route path="/home" component={home} />
            <Route path="/listUser" component={ListUser} />
            <Route path="/listMahasiswa" component={ListMahasiswa} />
            <Route path="/listJurusan" component={ListJurusan} />
            <Route path="/viewUser" component={ViewUser} /> 
            <Route path="/listMenu" component={listMenu} />
            <Route path="/listKRS" component={listKrs} />
            </Switch>
        </main>
    )
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem(apiconfig.LS.TOKEN)!=null? ( // Kalo belun login balik login kuy
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
export default DashboardSwitcher