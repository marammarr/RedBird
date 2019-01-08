import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'
import Select from 'react-select'

class createMenu extends React.Component{
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
                icon:'',
                nama:'',
                path:'',
                role:'',
                dihapus:false
            }
        }
        // let number=this.state.company.length
        this.submitHandler=this.submitHandler.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
    }
    changeHandler(e){
        let tmp=this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
    }
    selectChangeHandler = (dipilih)=>{
        this.state.formdata['role']=dipilih.value
        //alert('anda pilih '+JSON.stringify(this.state.formdata))
    }
    submitHandler(){
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MENU,
            method: "post",
            headers:{
                //"Authorization": token,
                "Content-Type" : "application/json"
            },
            data: this.state.formdata
        }
        axios(option)
        .then((response)=>{
            if(response.data.parameterNilai === 1) {
                this.props.modalStatus(1, 'Data Berhasil Tersimpan')
            } else {
                this.props.modalStatus(2, 'Failed')
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    render(){
        let opsiRole = [{'value':'ROLE ADMIN','label':'ROLE ADMIN'},{'value':'ROLE USER','label':'ROLE USER'}]
        return(
            <Modal isOpen={this.props.create} className={this.props.className}>
                <ModalHeader>Add Menu</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                        <label for="text">ID Menu</label>
                        <input type="text" class="form-control" placeholder="" readOnly
                        name="id" onChange={this.changeHandler} />
                    </div>
                    <div class ="input-group mb-3 input-group-sm">
                    <label for="text">Kode Menu</label>
                        <input type="text" class="form-control" placeholder="Kode Menu"
                        name="kode" onChange={this.changeHandler} required/>
                    </div>
                    <div class ="input-group mb-3 input-group-sm">
                    <label for="text">Nama Menu</label>
                        <input type="text" class="form-control" placeholder="Nama Menu"
                        name="nama" onChange={this.changeHandler} required/>
                    </div>
                    <div class ="input-group mb-3 input-group-sm">
                        <label>Path Menu</label>
                        <input type="text" class="form-control" placeholder="Path Menu"
                        name="path" onChange={this.changeHandler} required />
                    </div>
                    <div class ="input-group mb-3 input-group-sm">
                        <label>Role</label>
                        <Select class="form-control" name="role" onChange={this.selectChangeHandler} options={opsiRole} label={this.state.formdata.role} required />
                    </div>
                    <div class ="input-group mb-3 input-group-sm">
                        <label>Icons Menu</label>
                        <input type="text" class="form-control" placeholder="Icons Menu"
                        name="icon" onChange={this.changeHandler} required />
                    </div>
                </form>
                {/* <form class="form-inline">
                <div class ="input-group mb-3 input-group-sm">
                    <label for="text">address</label>
                    <textarea type="text-area" class="form-control" placeholder="address"
                    name="address" value={this.state.formdata.address} onChange={this.changeHandler} required/>
                </div>
                </form>
                <form class="form-inline">
                <div class ="input-group mb-3 input-group-sm">
                    <label>phone</label>
                    <input type="text" class="form-control" placeholder="phone"
                    name="phone" value={this.state.formdata.phone} onChange={this.changeHandler} required/>
                </div>
                </form> */}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick ={this.props.closeHandler}>Cancel</Button>
                </ModalFooter>
        </Modal>
        )
    }
}
export default createMenu