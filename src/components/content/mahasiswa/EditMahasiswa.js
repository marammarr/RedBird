import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'
import Select from 'react-select'

class EditMahasiswa extends React.Component {
    constructor (props) {
        super(props)
        // let userdata=""
        // if(localStorage.getItem(apiconfig.LS.TOKEN)!= null){
         //let   userdata =JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
       // }        
       
        super(props)
        this.state = {
            formdata: {
                id:0,
                nim:'',
                kdjur:'',
                alamat:'',
                kdkota:'',
                kdprov:'',
                tanggalLahir:''
            },
            provinsi:[],
            kota:[],
            jurusan:[],
            selectedOptionProv:[],
            selectedOptionKot:[]
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    componentWillReceiveProps(newProps) {
        console.log('TESSS '+newProps)
        this.setState({
            formdata : newProps.usertest,
            provinsi: newProps.provinsi,
            kota:newProps.kota,
            jurusan:newProps.jurusan,
            //selectedOptionProv:[{"value":newProps.usertest.kdprov,"label":newProps.usertest.kdprov.value}]
        })
        /* newProps.usertest.map((row,x)=>
            console.log(row.kdkota)
        ) */
       //alert(JSON.stringify(newProps))
    }

    changeHandler(e) {
        
        let tmp = this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
        //alert(JSON.stringify(tmp))
    }

    submitHandler() {
        //let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA,
            method: "put",
            headers:{
                //"Authorization": token,
                "Content-Type" : "application/json"
            },
            data: this.state.formdata
           
        }
        axios(option)
        .then((response) => { 
            // console.log(this.state.formdata)
            if(response.data.parameterNilai === 1) {
                alert('Success')
                this.props.history.push('/listMahasiswa')
                this.props.closeModalHandler()
            } else {
                alert(response.status)
            }
        })
        .catch((error) => {
            console.log(error);            
        })
    }

    render(){
        
        //console.log(JSON.stringify(this.state.formdata)+' tesss')

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
            <Modal isOpen={this.props.edit} className={this.props.className}>
                <ModalHeader> Edit Mahasiswa</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> *ID Mahasiswa: </label>
                        <input type="text" class="form-control" readOnly
                        name="id" 
                        value={this.state.formdata.id}  
                        onChange={this.changeHandler} />
                                               
                    </div>
                    <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> *Nama Mahasiswa : </label>
                        <input type="text" class="form-control" 
                        name="nama" 
                        value={this.state.formdata.nama} 
                        onChange={this.changeHandler} />
                    </div>
                
                    <div class ="input-group mb-3 input-group-sm"> 
                    <label for="text"> *NIM : </label>
                        <input type="text" class="form-control" 
                        name="nim" 
                        value={this.state.formdata.nim} 
                        onChange={this.changeHandler} />
                     {/* <label for="text"> *Kode Jurusan : </label>
                        <input type="text" class="form-control"
                        name="kdjur" 
                        value={this.state.formdata.kdjur} 
                        onChange={this.changeHandler}/> */}
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
                        value={this.state.selectedOptionProv.value}//this.state.selectedOptionProv.filter(selectedOptionProv => selectedOptionProv.label === this.state.formdata.kdprov)}
                        onChange={this.handleChange1}
                        options={options1}
                        />
                        <p>Kota</p>
                        <Select class="form-control"
                        name="kota"
                        label={this.state.selectedOptionKot.value}
                        value={this.state.selectedOptionKot.value}
                        onChange={this.handleChange2}
                        options={filteredOptions}
                        />
                </div>
                    
                    <div class ="input-group mb-3 input-group-sm">
                    <label for="text"> *Alamat : </label>
                        <input type="text" class="form-control"
                        name="phone" 
                        value={this.state.formdata.alamat} 
                        onChange={this.changeHandler}/> 
                   </div>
                   
                   <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> *Tanggal Lahir : </label>
                        <input type="date" class="form-control" 
                        name="tanggalLahir" 
                        value={this.state.formdata.tanggalLahir} 
                        onChange={this.changeHandler} />
                    </div>
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick ={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick={this.props.closeModalHandler}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default EditMahasiswa