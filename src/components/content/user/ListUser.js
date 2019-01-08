import React from 'react'
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios';
import { Link } from 'react-router-dom'
import EditUser from './EditUser';
import CreateUser from './CreateUser';
import { Alert } from 'reactstrap'
import DeleteUser from './DeleteUser'
import ViewUser from './ViewUser'
import MuiDataTable from 'mui-datatables'

class ListUser extends React.Component {
    constructor(props){
      
        super(props)
        this.state={
           
            showCreateUser:false,
            user:[],
            currentUser:{},
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

    deleteModalHandler(userId) {
        let tmp = {}
        this.state.user.map((row) => {
            if (userId == row.userid) {
                tmp = row
            }
        })
        this.setState({
            currentUser : tmp,
            deleteUser : true
        })
    }
    
    

    viewModalHandler(userId) {
        //alert(userId)
        let tmp = {}
        this.state.user.map((row) => {
            if (userId == row.userid) {

                tmp = row
            }
        })
        this.setState({
            currentUser : tmp,
            viewUser : true
        })
        //alert(JSON.stringify(this.state.currentUser))
    }

    editModalHandler(userId) {
        let tmp = {}
    
        this.state.user.map((row) => {
            if (userId == row.userid) {
                tmp =row
            }
        })
        this.setState({                      
            currentUser : tmp,
            editUser : true
        })
        //alert(JSON.stringify(this.state.currentUser))
    }

    closeModalHandler() {
        this.setState({
            viewUser : false,
            editUser : false,
            deleteUser : false    
        })
    }

    showHandler(){
        this.setState({showCreateUser:true})
    }

    closeHandler(){
        this.setState({showCreateUser:false})
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
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY,
            method: "post",
            headers:{
                "Authorization": token,
                "Content-Type" : "application/json"
            },
            data: this.state.formdata
        }
        axios(option)
        .then((response)=>{
            if(response.data.parameterNilai===1){
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
    getlistUser() {
        //let token = localStorage.getItem(apiconfig.LS.TOKEN)
        // let option = {
        //     url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY,
        //     method: "get",
        //     headers: {
        //         "Authorization": token
        //     }
        // }
        // axios(option)
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.VIEW_NO_DELETE, headers:{
            'Content-Type':'application/json',
            'Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                user: response.data
                
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
        this.getlistUser()
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
            viewUser : false,
            editUser : false,
            deleteUser : false    
        })
        this.getListUnit()
    }

    searchHandler(e){
        let i = e.target.value
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.USER+i, headers:{
            'Content-Type':'application/json',
            'Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                user: response.data
                
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
     
    render(){

        const columns = ["ID User","Username","action"];
        const data=[]

        this.state.user.map(row =>
            {
                let tmp=[]
                tmp.push(row.userid,row.username,<Link to='#'>
                    <span onClick = {() => {this.viewModalHandler(row.userid)}} className="fa fa-search" style= {{fontSize : '18px', paddingRight : '30px'}} />
                    <span onClick = {() => {this.editModalHandler(row.userid)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />            
                    <span onClick = {() => {this.deleteModalHandler(row.userid)}} class="fa fa-trash" style={{fontSize : '18px'}} />
                            
                </Link>)
                data.push(tmp)
            }
            )
            const options = {
                filter:false,
                responsive: "scroll",
                print: false,
                download: false,
                selectableRows: false,
                viewRows: false,
                rowsPerPage: 5
            }
    return (
        <div>
        <ul class="breadcrumb">
            <li><a href="#">Home</a> <span class="divider">/</span></li>
            <li><a href="#">Master</a> <span class="divider">/</span></li>
            <li class="active">List user</li>
        </ul>
       
        <div class="container">
            <h4>List user</h4>

             {
                (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
            }
            {
                (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
            }


                <button type="button" class="btn btn-primary float-right"
                onClick ={this.showHandler}> Add </button>
                <CreateUser
                create = {this.state.showCreateUser}
                closeHandler={this.closeHandler} />
                <ViewUser
                view = {this.state.viewUser}
                closeModalHandler = {this.closeModalHandler} 
                user = {this.state.currentUser}
                />
                <DeleteUser
                delete = {this.state.deleteUser}
                user = {this.state.currentUser}
                closeModalHandler = {this.closeModalHandler}
                modalStatus = {this.modalStatus}
                 />
                <EditUser
                edit = {this.state.editUser}
                closeModalHandler = {this.closeModalHandler}
                usertest = {this.state.currentUser} 
                modalStatus = {this.modalStatus}
                /> 
                <br/> <br/>
                {/* <form class="form-inline">
                <div class ="container">
                <input type="text" placeholder="No" class="col-sm-3 padding=5px" id="text"/>
                <input type="text" placeholder="User ID" class="col-sm-3 padding=5px" id="text"/>
                <input type="text" placeholder="Username" class="col-sm-2 padding=5px" id="text"/>
                
                <button type="button" class="btn btn-warning float-right " 
                onClick ={this.searchHandler}> Search </button>
                </div>
                </form> */}
                <MuiDataTable data={data} columns={columns} options={options} title={"User Data"} />
                {/* <table id="mytable" class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>No</th>    
                        <th>UserId</th>
                        <th>Username</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                       {
                            this.state.user.map((row,x)=>
                                <tr>
                                  <td>{x+1}</td>
                                  <td>{row.userid}</td>
                                  <td>{row.username}</td>
                                  <td>
                                  <Link to='#'>
                       <span onClick = {() => {this.viewModalHandler(row.userid)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />    
                        
                      <span onClick = {() => {this.editModalHandler(row.userid)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />            
                        
                         <span onClick = {() => {this.deleteModalHandler(row.userid)}} class="fa fa-trash" style={{fontSize : '18px'}} />
                            
                      </Link>
                    </td>
                                </tr>
                            )
                       }
                       
                         
                    </tbody>
                </table> */}
                </div>
                </div>
        )
    }
}

        
export default ListUser