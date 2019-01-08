import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'
import { Link } from 'react-router-dom'
import Select from 'react-select'

class CreateMahasiswa extends React.Component{
    constructor (props){
        super(props)
        // let number=this.props.company
        // console.log(number)
        //let userdata=JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        // let userdata=""
       
        // if(localStorage.getItem(apiconfig.LS.TOKEN)!=null){
         //let   userdata =JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        //}
        this.state={
            formdata:{
                id:'',
                nim:'',
                kdjur:'',
                alamat:'',
                kdkota:'',
                kdprov:'',
                tanggalLahir:''
            },
            jurusan:[],
            kota:[],
            provinsi:[],
            selectedOptionProv: {},
            selectedOptionKot: {}
        }
        // let number=this.state.company.length
        this.submitHandler=this.submitHandler.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
        this.handlerChange1=this.handleChange1.bind(this)
        this.handlerChange2=this.handleChange2.bind(this)
    }
    changeHandler(e){
        let tmp=this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
    }
    submitHandler(){
        //alert(JSON.stringify(this.state.formdata))
        //let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let datasend = this.state.formdata
        datasend["kdkota"]=this.state.selectedOptionKot.value
        datasend["kdprov"]=this.state.selectedOptionProv.value
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA,
            method: "post",
            headers:{
                //"Authorization": token,
                "Content-Type" : "application/json"
            },
            data: datasend//this.state.formdata
        }
        axios(option)
        .then((response)=>{
            if(response.data.parameterNilai===1){
                // alert('Success')
                //  //console.log(response)
                // this.props.history.push('/listMahasiswa')
                // this.setState({form-field-name
                //     viewJurusan : false
                // })

                this.props.modalStatus(1,'Success')
            } else {
                alert(response.status)
            }
        })
        .catch((error)=>{
            console.log(error);            
        })
    }
    
    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            jurusan : newProps.jur,
            kota : newProps.kota,
            provinsi : newProps.provinsi
        })
       // alert(JSON.stringify(newProps.companytest))
    }
    getListKdJur(){
        
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

    //HANDLE SELECTBOX KOTA & PROVINSI
    
    handleChange1 = (selectedOption) => {
      this.setState({selectedOptionProv:selectedOption})
      /* alert(this.state.selectedOptionProv.value) */
    };
    
    handleChange2 = (selectedOption) => {
      this.setState({selectedOptionKot: selectedOption})
      /* alert(this.state.selectedOptionKot.value) */
    }
    
    render(){

        //ATUR SELECTBOX KOTA & PROV
        const options1 = []
        this.state.provinsi.map((row,x)=>
            options1.push({"value":row.kode, "label":row.nama})
        )
        
          const options2 = []
          this.state.kota.map((row,x)=>
            options2.push({"value":row.kode, "label":row.nama, "link":row.kdprov})
            )
            console.log(options2)
      
          const filteredOptions = options2.filter((o) => o.link === this.state.selectedOptionProv.value)
        return(
            
            <Modal isOpen={this.props.create} className={this.props.className}>
                <ModalHeader> Add Mahasiswa</ModalHeader>
                <ModalBody >
                <form>
                <div class ="input-group mb-4 input-group-sm">
                    <label for="text">ID Mahasiswa</label>
                    <input type="text" class="form-control" placeholder="" readOnly
                    name="id" value={this.state.formdata.id} onChange={this.changeHandler} />
                </div>
                <div class ="input-group mb-4 input-group-sm">
                    <label for="text">Nama </label>
                    <input type="text" class="form-control" placeholder="Nama Mahasiswa" 
                    name="nama" value={this.state.formdata.nama} onChange={this.changeHandler} required/>
                </div>
                <div class ="input-group mb-3 input-group-sm">
                     <label for="text">NIM</label>
                    <input type="text" class="form-control" placeholder="NIM Mahasiswa" 
                    name="nim" value={this.state.formdata.nim} onChange={this.changeHandler} required/>
                </div>
                <div class="input-group mb-3 input-group-sm">
                     <label for="text">Kode Jurusan</label>
                    <select class="form-control" 
                    name="kdjur" value={this.state.formdata.kdjur} onChange={this.changeHandler} required>
                    <option value="">PILIH JURUSAN</option>
                    {
                        this.state.jurusan.map((row,x)=>
                        <option value={row.kode}>{row.kode}</option>
                        )
                    }
                    
                    </select>
                </div>
                <div class ="input-group mb-5 input-group-sm">
                        <p>Provinsi</p>
                        <Select class="form-control"
                        name="provinsi"
                        label={this.state.selectedOptionProv.value}
                        //value={this.state.selectedOptionProv.value}
                        onChange={this.handleChange1}
                        options={options1}
                        />
                        <p>Kota</p>
                        <Select class="form-control"
                        name="kota"
                        label={this.state.selectedOptionKot.value}
                        //value={this.state.selectedOptionKot.value}
                        onChange={this.handleChange2}
                        options={filteredOptions}
                        />
                </div>
                <div class ="input-group mb-3 input-group-sm">
                     <label for="text">Alamat</label>
                    <textarea class="form-control" placeholder="Alamat Mahasiswa" 
                    name="alamat" value={this.state.formdata.alamat} onChange={this.changeHandler} required/>
                    
                     <label for="text">Tanggal Lahir</label>
                    <input type="date" class="form-control" placeholder="Tanggal Lahir" 
                    name="tanggalLahir" value={this.state.formdata.tanggalLahir} onChange={this.changeHandler} id="date" required/>
                    
                </div>
                </form>
                    <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                    
                    {/* <label for="text">address</label>
                    <textarea type="text-area" class="form-control" placeholder="address" 
                    name="address" value={this.state.formdata.address} onChange={this.changeHandler} required/>
                    */}
                   </div>
                   {/* <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                    <label>phone</label>
                    <input type="text" class="form-control" placeholder="phone" 
                    name="phone" value={this.state.formdata.phone} onChange={this.changeHandler} required/>
                   
                       </div>
                       </form> */}
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick ={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick={this.props.closeHandler}>Cancel</Button>
                </ModalFooter>
        </Modal>
        )
    }
}
export default CreateMahasiswa