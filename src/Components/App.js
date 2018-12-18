import React, { Component } from 'react';
import './../App.css';
import Header from './Header';
import Search from './Search';
import TableData from './TableData';
import AddUser from './AddUser';
import DataUser from './Data.json';

const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      hienThiForm : false,
      data : [],
      searchText:'',
      editUserStatus:false,
      userEditObject:{}
    }
  }
  
  componentWillMount() {
    //kiểm tra xem có localStorage hay chưa
    // console.log(localStorage.getItem('userData'));
    // console.log(DataUser);
    if(localStorage.getItem('userData') === null){
      localStorage.setItem('userData',JSON.stringify(DataUser));
    }
    else{
      var temp = JSON.parse(localStorage.getItem('userData'));
      this.setState({
        data:temp
      });
     }
  }
  
  changeEditUserStatus =  () => {
    this.setState({
      editUserStatus: !this.state.editUserStatus
    });
  } 

  deleteUser =  (idUser) => {
    var tempData = this.state.data.filter(item => item.id !== idUser); 
    this.setState({
      data:tempData
    }); 
    // đẩy dữ liệu   
    localStorage.setItem('userData',JSON.stringify(tempData));
  } 
  getUserEditInfoApp =  (info) => {
    // console.log('thông tin đã sẵn sàng được cập nhập' + info.name);
    this.state.data.forEach( (value,key) => {
      if(value.id === info.id){
        value.name = info.name;
        value.tel = info.tel;
        value.Permission = info.Permission;
      }
    })
    localStorage.setItem('userData',JSON.stringify(this.state.data));
  } 
  editUser =  (user) => {
    // console.log('Đã kết nối oke');
    // console.log(user);
    this.setState({
      userEditObject:user
    });
  } 

  getNewUserData =  (name,tel,Permission) => {
    var item = {};
    item.id = uuidv1();
    item.name = name;
    item.tel = tel;
    item.Permission = Permission;
    // console.log(item);   
    var items = this.state.data;
    items.push(item);

    this.setState({
      data:items
    });
    //console.log(this.state.data);
    localStorage.setItem('userData',JSON.stringify(items));
  } 

  getTextSearch = (dl) =>{
    this.setState({
      searchText:dl
    });
    
  }
  doiTrangThai = ()=>{
    this.setState({
      hienThiForm : !this.state.hienThiForm
    });
  }
  //thongBao = ()=>{alert('Kết nối thành công');}
  render() {
    // localStorage.setItem('userData',JSON.stringify(DataUser));

    var ketqua = [];
    this.state.data.forEach((item)=>{
      if(item.name.indexOf(this.state.searchText) !== -1){
        ketqua.push(item);
      }
    })
    return (
      <div>
        <Header/>
        <div className="searchForm">
          <div className="container">
            <div className="row">
              <Search
               getUserEditInfoApp = { (info) => this.getUserEditInfoApp(info) }
               userEditObject ={ this.state.userEditObject }
               checkConnectProps = {(dl)=>this.getTextSearch(dl)}
               ketNoi={()=>this.doiTrangThai()} 
               hienThiForm={this.state.hienThiForm}
               editUserStatus={this.state.editUserStatus}
               changeEditUserStatus = { () => this.changeEditUserStatus() }
               />
              <TableData
               deleteUser = { (idUser) => this.deleteUser(idUser) }
               editFun={ (user) => this.editUser(user) } 
               dataUserProps={ketqua}
               changeEditUserStatus = { () => this.changeEditUserStatus() }
               />
              <AddUser add={ (name,tel,Permission) => this.getNewUserData(name,tel,Permission) } hienThiForm={this.state.hienThiForm}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
