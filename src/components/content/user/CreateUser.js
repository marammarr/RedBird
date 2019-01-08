import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'
import { Link } from 'react-router-dom'

class CreateUser extends React.Component{
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
                userid:'',
                username:'',
                password:''
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
    submitHandler(){
        //alert(JSON.stringify(this.state.formdata))
        //let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.USER,
            method: "post",
            headers:{
                //"Authorization": token,
                "Content-Type" : "application/json"
            },
            data: this.state.formdata
        }
        axios(option)
        .then((response)=>{
            if(response.data.parameterNilai===1){
                alert('Success')
                 //console.log(response)
                this.props.history.push('/listUser')
                this.setState({
                    viewUser : false
                })
            } else {
                alert(response.status)
            }
        })
        .catch((error)=>{
            console.log(error);            
        })
    }
    render(){
        return(
            
            <Modal isOpen={this.props.create} className={this.props.className}>
                <ModalHeader> Add User</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                <div class ="input-group mb-3 input-group-sm">
                    <label for="text">User ID</label>
                    <input type="text" class="form-control" placeholder=""
                    name="userid" value={this.state.formdata.userid} onChange={this.changeHandler} />
                    <label for="text">Username</label>
                    <input type="text" class="form-control" placeholder="Username" 
                    name="username" value={this.state.formdata.username} onChange={this.changeHandler} required/>
                     </div>
                    </form>
                    <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                    <label>Password</label>
                    <input type="text" class="form-control" placeholder="password" 
                    name="password" value={this.state.formdata.password} onChange={this.changeHandler} required />
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
export default CreateUser