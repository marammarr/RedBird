import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
//import axios from 'axios'
//import apiconfig from '../../../configs/api.config.json'

class ViewKrs extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader> View Krs</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> *ID: </label>
                        <input type="text" class="form-control" readOnly
                        name="id" 
                        value={this.props.krs.id}  
                        onChange={this.changeHandler} />
                                               
                    </div>
                    <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> *Kode KRS : </label>
                        <input type="text" class="form-control" 
                        name="kode" 
                        value={this.props.krs.kode} 
                        onChange={this.changeHandler} />
                    </div>
                
                    <div class ="input-group mb-3 input-group-sm"> 
                    <label for="text"> *NIM : </label>
                        <input type="text" class="form-control" 
                        name="nim" 
                        value={this.props.krs.nim} 
                        onChange={this.changeHandler} />
                     <label for="text"> *Kode Matkul : </label>
                        <input type="text" class="form-control"
                        name="kdMatkul" 
                        value={this.props.krs.kdMatkul} 
                        onChange={this.changeHandler}/>
                    </div>
                    
                    <div class ="input-group mb-3 input-group-sm">
                    <label for="text"> *Semester : </label>
                        <input type="text" class="form-control"
                        name="semester" 
                        value={this.props.krs.semester} 
                        onChange={this.changeHandler}/> 
                   </div>
                   
                   <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> *SKS : </label>
                        <input type="text" class="form-control" 
                        name="sks" 
                        value={this.props.krs.sks} 
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
export default ViewKrs