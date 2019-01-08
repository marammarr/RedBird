import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class EditUser extends React.Component {
    constructor (props) {
        super(props)
        // let userdata=""
        // if(localStorage.getItem(apiconfig.LS.TOKEN)!= null){
         //let   userdata =JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
       // }        
       
        super(props)
        this.state = {
            formdata: {
                userId : '',
                username: '',
                password: ''
            }
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            formdata : newProps.usertest
        })
       // alert(JSON.stringify(newProps.companytest))
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
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.USER,
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
            if(response.status === 200) {
                alert('Success')
                this.props.history.push('/listUser')
                
            } else {
                alert(response.status)
            }
        })
        .catch((error) => {
            console.log(error);            
        })
    }

    render(){
        // console.log(this.state.formdata)
        return(
            <Modal isOpen={this.props.edit} className={this.props.className}>
                <ModalHeader> Edit Company</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> *User ID : </label>
                        <input type="text" class="form-control" readOnly
                        name="userId" 
                        value={this.state.formdata.userid}  
                        onChange={this.changeHandler} />
                        <label for="text"> *Username : </label>
                        <input type="text" class="form-control" 
                        name="username" 
                        value={this.state.formdata.username} 
                        onChange={this.changeHandler} />
                    </div>
                
                    <div class ="input-group mb-3 input-group-sm"> 
                    <label for="text"> password : </label>
                        <input type="text" class="form-control"
                        name="password" 
                        value={this.state.formdata.password} 
                        onChange={this.changeHandler}/>
                    {/* <label for="text"> address : </label>
                        <input type="text" class="form-control"
                        name="address" 
                        value={this.state.formdata.address} 
                        onChange={this.changeHandler}/>
                    </div>
                    
                    <div class ="input-group mb-3 input-group-sm">
                    <label for="text"> phone : </label>
                        <input type="text" class="form-control"
                        name="phone" 
                        value={this.state.formdata.phone} 
                        onChange={this.changeHandler}/> */}
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
export default EditUser