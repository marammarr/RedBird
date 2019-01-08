import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
//import axios from 'axios'
//import apiconfig from '../../../configs/api.config.json'

class ViewMahasiswa extends React.Component {
    render(){
        //alert(JSON.stringify(this.props.user))
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader> View Mahasiswa</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> *Id Mahasiswa: </label>
                        <input type="text" class="form-control" readOnly
                        name="id" 
                        value={this.props.mahasiswa.id} 
                        onChange={this.changeHandler} />
                        <label for="text"> *Nama Mahasiswa : </label>
                        <input type="text" class="form-control" placeholder="Type Username" readOnly
                        name="nama" 
                        value={this.props.mahasiswa.nama} 
                        onChange={this.changeHandler} />
                        <label for="text"> *NIM : </label>
                        <input type="text" class="form-control" placeholder="Type Username" readOnly
                        name="nim" 
                        value={this.props.mahasiswa.nim} 
                        onChange={this.changeHandler} />

                        <label for="text"> *Alamat : </label>
                        <input type="text" class="form-control" placeholder="Type Username" readOnly
                        name="alamat" 
                        value={this.props.mahasiswa.alamat} 
                        onChange={this.changeHandler} />

                        <label for="text"> *Kota : </label>
                        <input type="text" class="form-control" placeholder="Type Username" readOnly
                        name="kota" 
                        value={this.props.mahasiswa.kota} 
                        onChange={this.changeHandler} />
                    </div>
                
                    {/* <div class ="input-group mb-3 input-group-sm"> 
                    <label for="text"> address : </label>
                        <input type="text" class="form-control" placeholder="email" readOnly
                        name="email" 
                        value={this.props.company.email} 
                        onChange={this.changeHandler}/>
                    <label for="text"> address : </label>
                        <input type="text" class="form-control" placeholder="Type address" readOnly
                        name="address" 
                        value={this.props.company.address} 
                        onChange={this.changeHandler}/>
                    </div>
                    
                    <div class ="input-group mb-3 input-group-sm">
                    <label for="text"> phone : </label>
                        <input type="text" class="form-control" placeholder="phone" readOnly
                        name="phone" 
                        value={this.props.company.address} 
                        onChange={this.changeHandler}/>
                   </div> */}
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.props.closeModalHandler}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default ViewMahasiswa