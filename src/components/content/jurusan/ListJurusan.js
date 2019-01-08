import React from 'react'
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios';
import { Link } from 'react-router-dom'
import EditJurusan from './EditJurusan';
import CreateJurusan from './CreateJurusan';
import { Alert } from 'reactstrap'
import DeleteJurusan from './DeleteJurusan'
import ViewJurusan from './ViewJurusan'
import MuiDataTable from 'mui-datatables'


class ListJurusan extends React.Component {
    constructor(props){
      
        super(props)
        this.state={
           
            showCreateJurusan:false,
            jurusan:[],
            currentJurusan:{},
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

    deleteModalHandler(idJurusan) {
        let tmp = {}
        this.state.jurusan.map((row) => {
            if (idJurusan == row.id) {
                tmp = row
            }
        })
        this.setState({
            currentJurusan : tmp,
            deleteJurusan : true
        })
    }
    
    

    viewModalHandler(jurusanId) {
        //alert(userId)
        let tmp = {}
        this.state.jurusan.map((row) => {
            if (jurusanId == row.id) {
                tmp = row
            }
        })
        this.setState({
            currentJurusan : tmp,
            viewJurusan : true
        })
        alert("tes "+this.state.currentJurusan.id+" , "+tmp.id)
        //alert(JSON.stringify(this.state.currentUser))
    }

    editModalHandler(jurusanId) {
        let tmp = {}
    
        this.state.jurusan.map((row) => {
            if (jurusanId == row.id) {
                tmp =row
            }
        })
        this.setState({                      
            currentJurusan : tmp,
            editJurusan : true
        })
        //alert(JSON.stringify(this.state.currentUser))
    }

    closeModalHandler() {
        this.setState({
            viewJurusan : false,
            editJurusan : false,
            deleteJurusan : false    
        })
    }

    showHandler(){
        this.setState({showCreateJurusan:true})
    }

    closeHandler(){
        this.setState({showCreateJurusan:false})
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
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.JURUSAN,
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
    getlistData() {
        //let token = localStorage.getItem(apiconfig.LS.TOKEN)
        // let option = {
        //     url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY,
        //     method: "get",
        //     headers: {
        //         "Authorization": token
        //     }
        // }
        // axios(option)
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.JURUSAN.UTAMA, headers:{
            'Content-Type':'application/json',
            'Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                jurusan: response.data
            })
            //alert(JSON.stringify(this.state.jurusan)+'\n'+this.state.jurusan)
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
        this.getlistData()
    }
    deleteHandler(param){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.JURUSAN+'/'+param,
            method: "delete",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            let currentindex = -1
            this.state.jurusan.map((ele, idx)=>{
                if(ele._id==param){
                    currentindex=idx
                    this.props.history.goBack()
                }
            })
            let tmp=this.state.jurusan
            tmp.splice(currentindex,1)
            this.setState({
                jurusan: tmp
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
            viewModal : false,
            editModal : false,
            deleteModal : false    
        })
        this.getListUnit()
    }
     
    render(){
        const columns = ["ID Jurusan","Kode Jurusan","Nama Jurusan","action"];
        const data=[]

        this.state.jurusan.map(row =>
            {
                let tmp=[]
                tmp.push(row.id,row.kode,row.nama,<Link to='#'>
                    <span onClick = {() => {this.viewModalHandler(row.id)}} className="fa fa-search" style= {{fontSize : '18px', paddingRight : '30px'}} />
                    <span onClick = {() => {this.editModalHandler(row.id)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />            
                    <span onClick = {() => {this.deleteModalHandler(row.id)}} class="fa fa-trash" style={{fontSize : '18px'}} />
                            
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
            <li class="active">List Jurusan</li>
        </ul>
       
        <div class="container">
            <h4>List Jurusan</h4>

             {
                (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
            }
            {
                (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
            }


                <button type="button" class="btn btn-primary float-right"
                onClick ={this.showHandler}> Add </button>
                <CreateJurusan
                create = {this.state.showCreateJurusan}
                closeHandler={this.closeHandler} />
                <ViewJurusan
                view = {this.state.viewJurusan}
                closeModalHandler = {this.closeModalHandler} 
                user = {this.state.currentJurusan}
                />
                <DeleteJurusan
                delete = {this.state.deleteJurusan}
                user = {this.state.currentJurusan}
                closeModalHandler = {this.closeModalHandler}
                modalStatus = {this.modalStatus}
                 />
                <EditJurusan
                edit = {this.state.editJurusan}
                closeModalHandler = {this.closeModalHandler}
                usertest = {this.state.currentJurusan} 
                modalStatus = {this.modalStatus}
                /> 
                <br/> <br/>
                <form class="form-inline">
                <div class ="container">
                <input type="text" placeholder="Company Code" class="col-sm-3 padding=5px" id="text"/>
                <input type="text" placeholder="Company Name" class="col-sm-3 padding=5px" id="text"/>
                <input type="date" placeholder="Created date" class="col-sm-3 padding=5px datepicker" id="date"/>
                <input type="text" placeholder="Created By" class="col-sm-2 padding=5px" id="text"/>
                
                <button type="button" class="btn btn-warning float-right " 
                onClick ={this.searchHandler}> Search </button>
                </div>
                </form>
                <MuiDataTable data={data} columns={columns} options={options} title={"User Data"} />
                {/* <table id="mytable" class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>No</th>    
                        <th>ID Jurusan</th>
                        <th>Nama</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                       {
                            this.state.jurusan.map((row,x)=>
                                <tr>
                                  <td>{x+1}</td>
                                  <td>{row.id}</td>
                                  <td>{row.kode}</td>
                                  <td>{row.nama}</td>
                                  <td>
                                  <Link to='#'>
                       <span onClick = {() => {this.viewModalHandler(row.id)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />    
                        
                      <span onClick = {() => {this.editModalHandler(row.id)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />            
                        
                         <span onClick = {() => {this.deleteModalHandler(row.id)}} class="fa fa-trash" style={{fontSize : '18px'}} />
                            
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

        
export default ListJurusan