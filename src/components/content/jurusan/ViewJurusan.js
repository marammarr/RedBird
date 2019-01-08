import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
//import axios from 'axios'
//import apiconfig from '../../../configs/api.config.json'

class ViewJurusan extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader> View Jurusan</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> *ID Mahasiswa: </label>
                        <input type="text" class="form-control" readOnly
                        name="id" 
                        value={this.props.user.id}  
                        onChange={this.changeHandler} />
                                               
                    </div>
                    <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> *Nama Mahasiswa : </label>
                        <input type="text" class="form-control" 
                        name="nama" 
                        value={this.props.user.nama} 
                        onChange={this.changeHandler} />
                    </div>
                
                    <div class ="input-group mb-3 input-group-sm"> 
                    <label for="text"> *NIM : </label>
                        <input type="text" class="form-control" 
                        name="nim" 
                        value={this.props.user.nim} 
                        onChange={this.changeHandler} />
                     <label for="text"> *Kode Jurusan : </label>
                        <input type="text" class="form-control"
                        name="kdjur" 
                        value={this.props.user.kdjur} 
                        onChange={this.changeHandler}/>
                    </div>
                    
                    <div class ="input-group mb-3 input-group-sm">
                    <label for="text"> *Alamat : </label>
                        <input type="text" class="form-control"
                        name="phone" 
                        value={this.props.user.alamat} 
                        onChange={this.changeHandler}/> 
                   </div>
                   
                   <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> *Tanggal Lahir : </label>
                        <input type="date" class="form-control" 
                        name="tanggalLahir" 
                        value={this.props.user.tanggalLahir} 
                        onChange={this.changeHandler} />
                    </div>
                    
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.props.closeModalHandler}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default ViewJurusan