import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class deleteMenu extends React.Component {
    constructor(props) {
        super(props)

        super(props)
        this.state = {
            formdata: {
                id:'',
                iconMenu:'',
                textMenu:'',
                pathMenu:''
            }
        }
        this.deleteHandler = this.deleteHandler.bind(this)
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            formdata : newProps.menu
        })
        // alert('delete'+JSON.stringify(newProps.user))
    }

    deleteHandler(){
        //let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MENU,
            method: "delete",
            headers: {
                //"Authorization": token
                "Content-Type" : "application/json"
            },
            data: this.state.formdata
        }
        axios(option)
        .then((response) => {
            // alert(JSON.stringify(response))
            if (response.status === 200) {
                this.props.modalStatus(1, 'Data Berhasil Dihapus')
            } else {
                this.props.modalStatus(2, 'Failed')
            }
        })
        .catch((error) => { 
            console.log(error)
        })
    }

    render(){
        return(
            <Modal isOpen={this.props.delete} className={this.props.className}>
                <ModalHeader> Delete Menu </ModalHeader>
                <ModalBody >
                    <p> Yakin ingin dihapus? </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.deleteHandler}>Yes</Button>
                    <Button color="danger" onClick={this.props.closeModalHandler}>No</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default deleteMenu