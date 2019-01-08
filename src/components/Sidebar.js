import React from 'react'
import apiconfig from '../configs/api.config.json'
import axios from 'axios'

class Sidebar extends React.Component {
    constructor(props){

        super(props)
        this.state={

            showCreateMenu:false,
            menu:[],
            currentMenu:{},
            alertData: {
                status: 0,
                message: ''
            }
        }
        // this.showHandler=this.showHandler.bind(this)
        // this.submitHandler=this.submitHandler.bind(this)
        // this.unitHandler=this.unitHandler.bind(this)
        // this.closeModalHandler = this.closeModalHandler.bind(this)
        // this.closeHandler=this.closeHandler.bind(this)
        // this.deleteHandler=this.deleteHandler.bind(this)
        // this.deleteModalHandler = this.deleteModalHandler.bind(this)
        // this.viewModalHandler = this.viewModalHandler.bind(this)
        // this.editModalHandler = this.editModalHandler.bind(this)
        // this.modalStatus = this.modalStatus.bind(this)
    }

    getListMenu() {
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.MENU, headers:{
            'Content-Type':'application/json',
            'Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                menu: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    componentDidMount(){
        this.getListMenu()
    }

    render() {
        return (
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
             <div className="sidebar-sticky">
                 <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                     <span>MarammarR</span>
                     <a className="d-flex align-items-center text-muted" href="#"></a>
                 </h5>

                 <h5 className="sidebar-heading d-flex justify-content-between align-items-center mt-4 mb-1 text-muted">
                    <span class="nav-link"><i class="fa fa-th-list"></i> <b>Daftar Menu</b> </span><a className="nav-link" href="/listmenu"><i class="fa fa-plus-square"></i></a>
                 </h5>
                 <hr/>
                                  
                 <ul className="nav flex-column mb-2">
                    {this.state.menu.map((row)=>
                        <li className="nav-item">
                           <a className="nav-link" href={row.path}> <span class={row.icon}></span> {row.nama} </a>
                        </li>
                        )
                    }
                 </ul>

             </div>
         </nav>
        )
    }

}

export default Sidebar