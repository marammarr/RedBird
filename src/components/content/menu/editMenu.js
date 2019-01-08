import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class editMenu extends React.Component {
    constructor (props) {
        super(props)
        // let userdata=""
        // if(localStorage.getItem(apiconfig.LS.TOKEN)!= null){
         //let   userdata =JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
       // }

        super(props)
        this.state = {
            formdata: {
                id:'',
                icon:'',
                nama:'',
                path:'',
                role:''
            }
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            formdata : newProps.menutest
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
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MENU,
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
                this.props.modalStatus(1, 'Data Berhasil Diubah')
            } else {
                this.props.modalStatus(2, 'Failed')
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
                <ModalHeader>Edit Data Menu</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> *ID MENU : </label>
                        <input type="text" class="form-control" readOnly
                        name="id"
                        value={this.state.formdata.id}
                        onChange={this.changeHandler} />
                    </div>


                    <div class ="input-group mb-3 input-group-sm">
                    <label for="text">Kode Menu</label>
                        <input type="text" class="form-control" placeholder="Kode Menu"
                        name="kode" onChange={this.changeHandler} required/>
                    </div>
                    <div class ="input-group mb-3 input-group-sm">
                    <label for="text"> *Nama Menu : </label>
                        <input type="text" class="form-control"
                        name="nama"
                        value={this.state.formdata.nama}
                        onChange={this.changeHandler} />
                    </div>

                    <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> Path Menu : </label>
                        <input type="text" class="form-control"
                        name="path"
                        value={this.state.formdata.path}
                        onChange={this.changeHandler}/>
                    </div>

                    <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> Icons Menu : </label>
                        <input type="text" class="form-control"
                        name="icon"
                        value={this.state.formdata.icon}
                        onChange={this.changeHandler}/>
                    </div>

                    {/* <div class ="input-group mb-3 input-group-sm">
                    <label for="text"> phone : </label>
                        <input type="text" class="form-control"
                        name="phone"
                        value={this.state.formdata.phone}
                        onChange={this.changeHandler}/>
                </div> */}
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick={this.props.closeModalHandler}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default editMenu