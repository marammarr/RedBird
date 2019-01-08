import React from 'react'
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios';
import { Link } from 'react-router-dom'
import EditMahasiswa from './EditMahasiswa';
import CreateMahasiswa from './CreateMahasiswa';
import { Alert } from 'reactstrap'
import DeleteMahasiswa from './DeleteMahasiswa'
import ViewMahasiswa from './ViewMahasiswa'
import MuiDataTable from 'mui-datatables'


class ListMahasiswa extends React.Component {
    constructor(props){
      
        super(props)
        this.state={
           
            showCreateMahasiswa:false,
            mahasiswa:[],
            jurusan:[],
            kota:[],
            provinsi:[],
            currentMahasiswa:{},
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
        this.state.mahasiswa.map((row) => {
            if (id == row.id) {
                tmp = row
            }
        })
        this.setState({
            currentMahasiswa : tmp,
            deleteMahasiswa : true
        })
    }
    
    

    viewModalHandler(id) {
        //alert(userId)
        let tmp = {}
        this.state.mahasiswa.map((row) => {
            if (id == row.id) {
                tmp = row
            }
        })
        this.setState({
            currentMahasiswa : tmp,
            viewMahasiswa : true
        })
        //alert(JSON.stringify(this.state.currentUser))
    }

    editModalHandler(id) {
        let tmp = {}
    
        this.state.mahasiswa.map((row) => {
            if (id == row.id) {
                tmp =row
            }
        })
        this.setState({                      
            currentMahasiswa : tmp,
            editMahasiswa : true
        })
        //alert(JSON.stringify(this.state.currentUser))
    }

    closeModalHandler() {
        this.setState({
            viewMahasiswa : false,
            editMahasiswa : false,
            deleteMahasiswa : false    
        })
    }

    showHandler(){
        this.setState({showCreateMahasiswa:true})
    }

    closeHandler(){
        this.setState({showCreateMahasiswa:false})
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
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA, headers:{
            'Content-Type':'application/json',
            'Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                mahasiswa: response.data
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
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA+param,
            method: "delete",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            let currentindex = -1
            this.state.mahasiswa.map((ele, idx)=>{
                if(ele._id==param){
                    currentindex=idx
                    this.props.history.goBack()
                }
            })
            let tmp=this.state.mahasiswa
            tmp.splice(currentindex,1)
            this.setState({
                mahasiswa: tmp
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
            viewMahasiswa : false,
            editMahasiswa : false,
            deleteMahasiswa : false    
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
                mahasiswa: response.data
                
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
     
    render(){
        const columns = ["ID Mahasiswa","NIM","Nama Mahasiswa","Kode Jurusan","Tanggal Lahir","Action"];
        const data=[]

        this.state.mahasiswa.map(row =>
            {
                let tmp=[]
                tmp.push(row.id,row.nim,row.nama,row.kdjur,row.tanggalLahir,<Link to='#'>
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
            <li class="active">List Mahasiswa</li>
        </ul>
       
        <div class="container">
            <h4>List Mahasiswa</h4>

             {
                (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
            }
            {
                (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
            }


                <button type="button" class="btn btn-primary float-right"
                onClick ={this.showHandler}> Add </button>
                <CreateMahasiswa
                create = {this.state.showCreateMahasiswa}
                modalStatus = {this.modalStatus}
                closeHandler={this.closeHandler}
                jur={this.state.jurusan}
                kota={this.state.kota}
                provinsi={this.state.provinsi} />
                <ViewMahasiswa
                modalStatus = {this.modalStatus}
                view = {this.state.ViewMahasiswa}
                closeModalHandler = {this.closeModalHandler} 
                mahasiswa = {this.state.currentMahasiswa}
                />
                <DeleteMahasiswa
                modalStatus = {this.modalStatus}
                delete = {this.state.deleteMahasiswa}
                mahasiswa = {this.state.currentMahasiswa}
                closeModalHandler = {this.closeModalHandler}
                modalStatus = {this.modalStatus}
                 />
                <EditMahasiswa
                edit = {this.state.editMahasiswa}
                closeModalHandler = {this.closeModalHandler}
                usertest = {this.state.currentMahasiswa} 
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
                            this.state.mahasiswa.map((row,x)=>
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

        
export default ListMahasiswa