import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

class CreateKrs extends React.Component{
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
                kode:'',
                nim:'',
                kdMatkul:[],
                sks: '0',
                semester: '0'
            },
            matakuliahs : [
                {name: 'kdMatkul', value:"mk01", isChecked: false, label: 'Fisika Dasar'},
                {name: 'kdMatkul', value:"mk02", isChecked: false, label: 'Kimia Dasar'},
                {name: 'kdMatkul', value:"mk03", isChecked: false, label: 'Bahasa Inggris'},
                {name: 'kdMatkul', value:"mk04", isChecked: false, label: 'Bahasa Indonesia'},
                {name: 'kdMatkul', value:"mk05", isChecked: false, label: 'Agama Islam'},
                {name: 'kdMatkul', value:"mk06", isChecked: false, label: 'Sosial Budaya'}
            ]
        }
        // let number=this.state.company.length
        this.submitHandler=this.submitHandler.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
    }
    
    changeHandler(e){
        let tmp=this.state.formdata
        if(e.target.type==='checkbox'){ // Kalo typenya chackbox
            //tmp[e.target.name]=[] // hapus semua dulu
            this.state.matakuliahs.map((row,i)=> //Perulangan matakuliah
                {
                    if(row.value===e.target.value){ //klo value row sama ama value objek pilih
                        row.isChecked=!row.isChecked //Ubah nilai isChecknya
                        if(row.isChecked)   // Jika nilai isChecknya true 
                            tmp[e.target.name].push(e.target.value)
                        else    //Kalo false, hapus
                            tmp[e.target.name].splice(tmp.kdMatkul.indexOf(e.target.value),1)
                    }
                }
            )
            //console.log("pilih "+JSON.stringify(this.state.matakuliahs))
            //console.log("pilih "+JSON.stringify(tmp))
        }else{
            tmp[e.target.name]=e.target.value
        }
        
        this.setState({
            formdata:tmp
        })
    }
    submitHandler(){
        //alert(JSON.stringify(this.state.formdata))
        //let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let datamaudikirim = this.state.formdata

        
        // METODE 2

        this.state.formdata.kdMatkul.forEach(kd =>
            {
                datamaudikirim['kdMatkul']=kd
            }
        )
            
            //alert(JSON.stringify(datas))
            const opsi = {
                url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.KRS,
                method: "post",
                headers:{
                    //"Authorization": token,
                    "Content-Type" : "application/json"
                },
                data: this.state.formdata
            }
            axios(opsi)
                .then((response)=>{
                    if(response.data.parameterNilai===1){
                        this.props.history.push('/listKrs')
                        this.setState({
                            viewKrs : false
                        })
                    } else {
                        alert(response.status)
                    }
                })
                .catch((error)=>{
                    console.log(error);            
                })
            
            
        alert('Success')
    }

    changeCheck = (e) => {
        let matkuls = this.state.matakuliahs
        matkuls.forEach(matkul => matkul.isChecked =  
        e.target.checked)
        if(e.target.checked){ 
            this.state.formdata.kdMatkul=[]
            matkuls.forEach(matkul => 
            this.state.formdata.kdMatkul.push(matkul.value))
        }else{
            this.state.formdata.kdMatkul=[]
        } 
        this.setState({
            matakuliahs: matkuls
        })
        //console.log("pilih "+JSON.stringify(this.state.formdata))
    }

    render(){
        
        return(
            
            <Modal isOpen={this.props.create} className={this.props.className}>
                <ModalHeader> 
                    <Typography variant='display1' align='center' gutterBottom>
                        Add KRS
                    </Typography>
                </ModalHeader>
                <ModalBody >
                <form class="">
                <div class ="input-group mb-3 input-group-sm">
                    <label for="text">ID Krs
                    <input type="text" class="form-control" placeholder="ID Krs" readOnly
                    name="id" value={this.state.formdata.id} onChange={this.changeHandler} />
                    </label>
                </div>
                <div class="col-md-12 input-group">
                    <label for="text">Kode Krs :
                    <input type="text" class="form-control" placeholder="Kode Krs" 
                    name="kode" value={this.state.formdata.kode} onChange={this.changeHandler} required/>
                    </label>
                </div>
                <div class="col-md-12 input-group">
                    <label for="text">NIM :
                    <input type="text" class="form-control" placeholder="NIM" 
                    name="nim" value={this.state.formdata.nama} onChange={this.changeHandler} required/>
                    </label>
                </div>
                <div class="col-md-6 row">
                    <span class="col-md-12">Mata Kuliah Yang Diambil :</span>
                     <input type="checkbox" id="togcek" onChange={this.changeCheck} />Pilih Semua<br></br>
                     <div style={{background:'gray',height:'2px'}} ></div>
                        {/* <Checkbox /> */}
                     {
                         this.state.matakuliahs.map((row,x)=>
                            <label class="col-md-12">
                            <input type="checkbox" name={row.name} value={row.value} checked={row.isChecked} onChange={this.changeHandler} />
                            {row.label}
                            </label>
                        )
                    }
                        
                     </div>
                     <div class="col-md-12 input-group">
                        <label>Semester : 
                            <input type="number" name="semester" onChange={this.changeHandler} class="form-control" value={this.state.formdata.semester} required min="1" max="20"  />
                        </label> 
                    </div>
                    <div class="col-md-12 input-group">
                        <label>SKS :
                            <input type="number" name="sks" onChange={this.changeHandler} class="form-control" value={this.state.formdata.sks} required min="1" max="29"  />
                        </label> 
                    </div>
                    </form>
                    <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                    
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
export default CreateKrs