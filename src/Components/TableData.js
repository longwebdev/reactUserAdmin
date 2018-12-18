import React, { Component } from 'react';
import TableDataRow from './TableDataRow';

class TableData extends Component {
  deleteButtonClick =  (idUser) => {
    //props.deleteUser
    this.props.deleteUser(idUser);
  } 

    mappingDataUser = ()=> this.props.dataUserProps.map((value, key)=>(
        <TableDataRow 
        deleteButtonClick = { (idUser) => this.deleteButtonClick(idUser) }
        changeEditUserStatus = { () => this.props.changeEditUserStatus() }
        editFunClick={ (user) =>   this.props.editFun(value)} 
        key={key} 
        userName={value.name} 
        stt={key} 
        tel={value.tel} 
        Permission={value.Permission}
        id = {value.id}
        />
    ))
      //this.props.editFun

    render() {
        return (
            <div className="col">
  <table className="table table-striped table-hover">
    <thead className="thead-inverse">
      <tr>
        <th>STT</th>
        <th>Tên</th>
        <th>Điện Thoại</th>
        <th>Quyền</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
            {this.mappingDataUser()}            
                     
    </tbody>
  </table>
</div>

        );
    }
}

export default TableData;