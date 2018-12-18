import React, { Component } from 'react';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.userEditObject.id,
            name : this.props.userEditObject.name,
            tel : this.props.userEditObject.tel,
            Permission : this.props.userEditObject.Permission
        }
    }
    
    //props.userEditObject
    //props.getUserEditInfo
    isChange =  (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]:value
        });
    } 
    saveButton =  () => {
        var info = {};
        info.id = this.state.id;
        info.name = this.state.name;
        info.tel = this.state.tel;
        info.Permission = this.state.Permission;
        
        this.props.getUserEditInfo(info);
        this.props.changeEditUserStatus();//ẩn form
    } 
    render() {
        //console.log(this.state);
        return (
            <div className="row">
                    <div className="col-12">
                    <form method="post">
                        <div className="card text-white bg-warning mb-3 mt-2">
                            <div className="card-header text-center">Sửa thông tin User trong hệ thống</div>
                            <div className="card-body text-primary">
                            <div className="form-group">                                        
                                <input type="text" onChange={ (event) => this.isChange(event) } defaultValue={this.props.userEditObject.name} name="name" className="form-control"placeholder="Tên User" />                                    
                            </div>
                            <div className="form-group">                                        
                                <input type="text" onChange={ (event) => this.isChange(event) } defaultValue={this.props.userEditObject.tel} name="tel" className="form-control"placeholder="Điện Thoại" />                                    
                            </div>
                            <div className="form-group">                                                                                        
                                <select className="custom-select"  name="Permission" onChange={ (event) => this.isChange(event) } defaultValue={this.props.userEditObject.Permission} required>
                                <option value>Chọn Quyền Mặc Định</option>
                                <option value={1}>Admin</option>
                                <option value={2}>Moderator</option>
                                <option value={3}>Normal</option>
                                </select>                                                                                                                                
                            </div>
                            <div className="form-group">
                                <input type="button" onClick={ () => this.saveButton() } value="Lưu" className="btn btn-block btn-danger"    />
                            </div>
                            </div>  
                        </div>
                        </form>
                    </div> 
                </div> 
        );
    }
}

export default EditUser;