import React from 'react'
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios';
import { Link } from 'react-router-dom'
import EditKrs from './EditKrs';
import CreateKrs from './CreateKrs';
import { Alert } from 'reactstrap'
import DeleteKrs from './DeleteKrs'
import ViewKrs from './ViewKrs'
import MuiDataTable from 'mui-datatables'


class ListKrs extends React.Component {
    constructor(props){
      
        super(props)
        this.state={
           
            showCreateKrs:false,
            krs:[],
            jurusan:[],
            kota:[],
            provinsi:[],
            currentKrs:{},
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

    deleteModalHandler(id) {
        let tmp = {}
        this.state.krs.map((row) => {
            if (id == row.id) {
                tmp = row
            }
        })
        this.setState({
            currentKrs : tmp,
            deleteKrs : true
        })
    }
    
    viewModalHandler(id) {
        //alert(userId)
        let tmp = {}
        this.state.krs.map((row) => {
            if (id == row.id) {
                tmp = row
            }
        })
        this.setState({
            currentKrs : tmp,
            ViewKrs : true
        })
        //alert(JSON.stringify(this.state.currentUser))
    }

    editModalHandler(id) {
        let tmp = {}
    
        this.state.krs.map((row) => {
            if (id == row.id) {
                tmp =row
            }
        })
        this.setState({                      
            currentKrs : tmp,
            editKrs : true
        })
        //alert(JSON.stringify(this.state.currentUser))
    }

    closeModalHandler() {
        this.setState({
            ViewKrs : false,
            editKrs : false,
            deleteKrs : false    
        })
    }

    showHandler(){
        this.setState({showCreateKrs:true})
    }

    closeHandler(){
        this.setState({showCreateKrs:false})
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
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA,
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
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.KRS, headers:{
            'Content-Type':'application/json',
            'Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                krs: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
        //ambil jurusan
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.JURUSAN.UTAMA, headers:{
            'Content-Type':'application/json','Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                jurusan: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
        //ambil kota
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.KOTA, headers:{
            'Content-Type':'application/json','Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                kota: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
        //ambil provinsi
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.PROVINSI, headers:{
            'Content-Type':'application/json','Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                provinsi: response.data
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
        this.getlistData()
    }
    deleteHandler(param){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.KRS+param,
            method: "delete",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            let currentindex = -1
            this.state.krs.map((ele, idx)=>{
                if(ele._id==param){
                    currentindex=idx
                    this.props.history.goBack()
                }
            })
            let tmp=this.state.krs
            tmp.splice(currentindex,1)
            this.setState({
                krs: tmp
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
            ViewKrs : false,
            editKrs : false,
            deleteKrs : false    
        })
        this.getListUnit()
    }

    searchHandler(e){
        let i = e.target.value
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.KRS+i, headers:{
            'Content-Type':'application/json',
            'Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                krs: response.data
                
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
     
    render(){
        const columns = ["ID","Kode KRS","NIM","SKS","SEMESTER","Action"];
        const data=[]

        this.state.krs.map(row =>
            {
                let tmp=[]
                tmp.push(row.id,row.kode,row.nim,row.sks,row.semester,<Link to='#'>
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
            <li><a href="/home">Home</a> <span class="divider">/</span></li>
            <li><a href="#">Master</a> <span class="divider">/</span></li>
            <li class="active">List Krs</li>
        </ul>
       
        <div class="container">
            <h4>List Krs</h4>

             {
                (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
            }
            {
                (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
            }


                <button type="button" class="btn btn-primary float-right"
                onClick ={this.showHandler}> Add </button>
                <CreateKrs
                create = {this.state.showCreateKrs}
                modalStatus = {this.modalStatus}
                closeHandler={this.closeHandler}
                jur={this.state.jurusan}
                kota={this.state.kota}
                provinsi={this.state.provinsi} />
                <ViewKrs
                modalStatus = {this.modalStatus}
                view = {this.state.ViewKrs}
                closeModalHandler = {this.closeModalHandler} 
                krs = {this.state.currentKrs}
                />
                <DeleteKrs
                modalStatus = {this.modalStatus}
                delete = {this.state.deleteKrs}
                krs = {this.state.currentKrs}
                closeModalHandler = {this.closeModalHandler}
                modalStatus = {this.modalStatus}
                 />
                <EditKrs
                edit = {this.state.editKrs}
                closeModalHandler = {this.closeModalHandler}
                usertest = {this.state.currentKrs} 
                modalStatus = {this.modalStatus}
                jurusan={this.state.jurusan}
                kota={this.state.kota}
                provinsi={this.state.provinsi}
                /> 
                <br/> <br/>
                <MuiDataTable data={data} columns={columns} options={options} title={"User Data"} />
                {/* <table id="mytable" class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>No</th>    
                        <th>ID</th>
                        <th>NIM</th>
                        <th>Nama</th>
                        <th>Kode Jurusan</th>
                        <th>Alamat</th>
                        <th>Tanggal Lahir</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                       {
                            this.state.krs.map((row,x)=>
                                <tr>
                                  <td>{x+1}</td>
                                  <td>{row.id}</td>
                                  <td>{row.nim}</td>
                                  <td>{row.nama}</td>
                                  <td>{row.kdjur}</td>
                                  <td>{row.alamat}</td>
                                  <td>{row.tanggalLahir}</td>
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

        
export default ListKrs