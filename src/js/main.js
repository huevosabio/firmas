'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { ButtonInput, Input } from 'react-bootstrap';
import Firebase from 'firebase';
// React-Bootstrap-Validation for validating form input
import { Form, ValidatedInput, FileValidator } from 'react-bootstrap-validation'

var mountNode = document.getElementById('content');
var fireBase = new Firebase("https://firmas.firebaseio.com/");

class PetitionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                firstName: "",
                lastName: "",
                email: "",
                streetCurrent: "",
                zipCurrent: "",
                cityCurrent: "",
                streetIFE: "",
                zipIFE: "",
                cityIFE: ""
            }
        };
    }

    render() {
        return (
            <Form 
                onValidSubmit={this._handleValidSubmit.bind(this)}
                onInvalidSubmit={this._handleInvalidSubmit.bind(this)}>
                <div className="row">
                    <ValidatedInput name="firstName" type="text" label="Nombre" value={this.state.values.firstName} onChange={this.handleChange.bind(this)} validate="required" errorHelp="Needs to be completed" groupClassName="col-sm-6" />
                    <ValidatedInput name="lastName" type="text" label="Apellidos" value={this.state.values.lastName} onChange={this.handleChange.bind(this)} validate="required" errorHelp="Needs to be completed" groupClassName="col-sm-6" />
                    <ValidatedInput name="email" type="email" label="Email"  value={this.state.values.email} onChange={this.handleChange.bind(this)} validate="required,isEmail" errorHelp="Needs to be completed" groupClassName="col-sm-12"/>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2 className="panel-title">Domicilio Actual</h2>
                    </div>
                    <div className="panel-body">
                        <ValidatedInput name="streetCurrent" value={this.state.values.streetCurrent} onChange={this.handleChange.bind(this)} type="text" label="Calle" validate="required" errorHelp="Needs to be completed" groupClassName="col-sm-12"/>
                        <ValidatedInput name="zipCurrent" value={this.state.values.zipCurrent} onChange={this.handleChange.bind(this)} type="number" label="ZIP Code" validate="required" errorHelp="Needs to be completed" groupClassName="col-xs-4"/>
                        <ValidatedInput name="cityCurrent" value={this.state.values.cityCurrent} onChange={this.handleChange.bind(this)} type="text" label="Ciudad" validate="required" errorHelp="Needs to be completed" groupClassName="col-xs-8"/>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2 className="panel-title">Domicilio IFE</h2>
                    </div>
                    <div className="panel-body">
                        <Input type="checkbox" name="copyAddress" ref="copyAddress" label="Domicilio IFE es el mismo" onChange={this._copyAddress.bind(this)} />
                        <ValidatedInput name="streetIFE" value={this.state.values.streetIFE} onChange={this.handleChange.bind(this)} type="text" label="Calle" validate="required" errorHelp="Needs to be completed" groupClassName="col-sm-12" />
                        <ValidatedInput name="zipIFE" value={this.state.values.zipIFE} onChange={this.handleChange.bind(this)} type="number" label="ZIP Code" validate="required" errorHelp="Needs to be completed" groupClassName="col-xs-4"/>
                        <ValidatedInput name="cityIFE" value={this.state.values.cityIFE} onChange={this.handleChange.bind(this)} type="text" label="Ciudad" validate="required" errorHelp="Needs to be completed" groupClassName="col-xs-8"/>
                    </div>
                </div>
                <ValidatedInput
                    name="idCard"
                    type="file"
                    label="ID card"
                    validate={files => {
                        if (FileValidator.isEmpty(files)) {
                            return 'Please select a file';
                        }

                        if (!FileValidator.isEachFileSize(files, 0, 4194304)) {
                            return 'Each file must not be larger than 1MB';
                        }

                        if (!FileValidator.isExtension( files, [ 'jpg', 'jpeg', 'png' ])) {
                            return 'Only image files';
                        }

                        return true;
                    }}
                />
                <ButtonInput type="submit" groupClassName="col-sm-12" />
            </Form>
        );
    }

    handleChange(e) {
        var key = e.target.name;
        var obj = {};
        obj[key] = e.target.value;
        var updatedValues = Object.assign({}, this.state.values, obj);
        this.setState({values: updatedValues});
    }

    _copyAddress(e) {
        if(this.refs.copyAddress.getChecked()) {
            var obj = {
                    streetIFE: this.state.values.streetCurrent,
                    zipIFE: this.state.values.zipCurrent,
                    cityIFE: this.state.values.cityCurrent
            }
            var updatedValues = Object.assign({}, this.state.values, obj);
            this.setState({values: updatedValues});
        }
    }

    _handleValidSubmit(values) {
        fireBase.set(values);
    }

    _handleInvalidSubmit(errors, values) {
        console.log(values);
    }
}


ReactDOM.render(<PetitionForm />, mountNode);