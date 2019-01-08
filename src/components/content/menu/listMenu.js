import React from 'react'
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios'
import { Link } from 'react-router-dom'
import EditMenu from './editMenu'
import CreateMenu from './createMenu'
import { Alert } from 'reactstrap'
import DeleteMenu from './deleteMenu'
import ViewMenu from './viewMenu'
import MUIDataTables from "mui-datatables"


class listMenu extends React.Component {
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
            // unit:[]
        }
        this.showHandler=this.showHandler.bind(this)
        this.submitHandler=this.submitHandler.bind(this)
        // this.changeHandler=this.changeHandler.bind(this)
        this.unitHandler=this.unitHandler.bind(this)
        this.closeModalHandler = this.closeModalHandler.bind(this)
        this.closeHandler=this.closeHandler.bind(this)
        this.deleteHandler=this.deleteHandler.bind(this)
        this.deleteModalHandler = this.deleteModalHandler.bind(this)
        this.viewModalHandler = this.viewModalHandler.bind(this)
        this.editModalHandler = this.editModalHandler.bind(this)
        this.modalStatus = this.modalStatus.bind(this)
    }

    viewModalHandler(id) {
        let tmp = {}
        this.state.menu.map((row) => {
            if (id == row.id) {
                tmp = row
            }
        })
        this.setState({
            currentMenu : tmp,
            viewMenu : true
        })
    }

    deleteModalHandler(id) {
        let tmp = {}
        this.state.menu.map((row) => {
            if (id == row.id) {
                tmp=({id:row.id,iconMenu:row.iconMenu,textMenu:row.textMenu,pathMenu:row.pathMenu,status:true})
            }
        })
        this.setState({
            currentMenu : tmp,
            deleteMenu : true
        })
    }

    editModalHandler(id) {
        let tmp = {}
        this.state.menu.map((row) => {
            if (id == row.id) {
                tmp =row
            }
        })
        this.setState({
            currentMenu : tmp,
            editMenu : true
        })
    }

    closeModalHandler() {
        this.setState({
            viewMenu : false,
            editMenu : false,
            deleteMenu : false
        })
    }

    showHandler(){
        this.setState({showCreateMenu:true})
    }

    closeHandler(status, message){
        this.setState({showCreateMenu:false})
    }

    // changeHandler(e){
    //     let tmp=this.state.formdata
    //     tmp[e.target.name]=e.target.value
    //     this.setState({
    //         formdata:tmp
    //     })
    // }

    unitHandler(e){
        let tmp=this.state.formdata
        tmp.m_unit_id=e.target.value
        this.setState({
            formdata:tmp
        })
    }

    submitHandler(){
        let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MENU,
            method: "post",
            headers:{
                "Authorization": token,
                "Content-Type" : "application/json"
            },
            data: this.state.formdata
        }
        axios(option)
        .then((response)=>{
            if(response.data.code===200){
                alert('Success')
                this.props.history.push('/dashboard')
            } else {
                alert(response.data.message)
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    getListMenu() {
        //let token = localStorage.getItem(apiconfig.LS.TOKEN)
        // let option = {
        //     url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY,
        //     method: "get",
        //     headers: {
        //         "Authorization": token
        //     }
        // }
        // axios(option)
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

    // componentWillMount(){
    //     //this.loadData();
    //     this.getListCompany()
    // }

    // componentDidMount(){
    //     var self = this;
 	// 	$('#mytable').dataTable({
	// 	  "sPaginationType": "bootstrap",
	// 	  "bAutoWidth": false,
	// 	  "bDestroy": true,
	// 	  "fnDrawCallback": function() {
    //         	self.forceUpdate();
    //       },
	// 	});
    // }

    // componentDidUpdate(){
    //     $('#mytable').dataTable({
    //      "sPaginationType": "bootstrap",
    //      "bAutoWidth": false,
    //      "bDestroy": true,
    //    });
    // }

    componentDidMount(){
        this.getListMenu()
    }

    deleteHandler(param){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY+'/'+param,
            method: "delete",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            let currentindex = -1
            this.state.company.map((ele, idx)=>{
                if(ele._id==param){
                    currentindex=idx
                    this.props.history.goBack()
                }
            })
            let tmp=this.state.company
            tmp.splice(currentindex,1)
            this.setState({
                company: tmp
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    modalStatus(status, message) {
        this.setState({
            alertData : {
                status : status,
                message : message
            },
            showCreateMenu: false,
            viewMenu : false,
            editMenu : false,
            deleteMenu : false
        })
        this.getListMenu()
    }

    render(){
        const columns = ["No", "Menu", "Path Menu", "Role", "Action"];
        const data=[]

        this.state.menu.map(row =>
            
            {
                let tmp=[]
                tmp.push(row.id,row.nama,row.path,row.role,<Link to='#'>
                    <span onClick = {() => {this.viewModalHandler(row.id)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />

                    <span onClick = {() => {this.editModalHandler(row.id)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />

                    <span onClick = {() => {this.deleteModalHandler(row.id)}} class="fa fa-trash" style={{fontSize : '18px'}} />    
                </Link>
                )
                data.push(tmp)
            })

            const options = {
                filter: false,
                responsive: "scroll",
                print: false,
                download: false,
                selectableRows: false,
                viewColumns: false,
            };

        return (
            <div>
            <div class="container">
                <h4>List Menu</h4>
                {
                    (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
                }
                {
                    (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
                }
                    <button type="button" class="btn btn-primary float-right"
                    onClick = {this.showHandler}><span class="fa fa-plus"></span> Add </button>

                    <CreateMenu
                    create = {this.state.showCreateMenu}
                    closeHandler={this.closeHandler} 
                    modalStatus = {this.modalStatus}
                    />
                    <ViewMenu
                    view = {this.state.viewMenu}
                    closeModalHandler = {this.closeModalHandler}
                    menu = {this.state.currentMenu}
                    />
                    <DeleteMenu
                    delete = {this.state.deleteMenu}
                    menu = {this.state.currentMenu}
                    closeModalHandler = {this.closeModalHandler}
                    modalStatus = {this.modalStatus}
                    />
                    <EditMenu
                    edit = {this.state.editMenu}
                    closeModalHandler = {this.closeModalHandler}
                    menutest = {this.state.currentMenu}
                    modalStatus = {this.modalStatus}
                    />
                    <br/><br/>

                    <MUIDataTables
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </div>
            </div>
        )
    }
}

export default listMenu