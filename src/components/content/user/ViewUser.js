import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
//import axios from 'axios'
//import apiconfig from '../../../configs/api.config.json'

class viewUser extends React.Component {
    render(){
        //alert(JSON.stringify(this.props.user))
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader> View User</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> *User Id : </label>
                        <input type="text" class="form-control" readOnly
                        name="userid" 
                        value={this.props.user.userid} 
                        onChange={this.changeHandler} />
                        <label for="text"> *Username : </label>
                        <input type="text" class="form-control" placeholder="Type Username" readOnly
                        name="username" 
                        value={this.props.user.username} 
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
export default viewUser