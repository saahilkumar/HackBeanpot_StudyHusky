import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col, Alert, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {ButtonDropdown} from "reactstrap";


class ContainerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      occupied: false,
      leftRoom: false,
      room: 'Select room'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.handleLeaveClick = this.handleLeaveClick.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state.id);
    });
  }

  handleSubmit(e) {
    this.setState({ occupied: true}, () => {
      console.log(this.state.room + ' ' + this.state.id);
    });
    //this.props.onLocChange(this.state.room);
    this.props.submitAdd(e);
    e.preventDefault();
  }

  handleLeaveClick(e) {
      this.props.submitSub(e);
      this.setState({ leftRoom: true}, ()=> {
          console.log(this.state.leftRoom);
      })
  }

  handleRoomChange(roomVal) {
    // const promise = this.setState({ room: roomVal});
    // const promise2 = promise.then(this.props.populate(), console.log('fail'));
    this.setState({ room: roomVal }, () => {
      this.props.onLocChange(this.state.room);
    });
    // this.props.populate();
  }

  render() {
    return (
      <div className='m-5'>
          <h2>Nice job! You now have {this.props.kudos} kudos!</h2>
        <Form onSubmit={this.handleSubmit}>
        <FormGroup>
            <Label>Please enter your NUID</Label>
            <Input type="text" name="id" placeholder="000000000" onChange={(this.handleChange)}/>
        </FormGroup>
        {!this.state.occupied && <DropdownComponent2 onRoomChange={this.handleRoomChange} roomNumber={this.state.room}/>}
        {this.state.occupied && <Alert color="success">You've joined this room!</Alert>}
        {this.state.leftRoom && <Alert color="danger">You've left this room!</Alert>}
        {!this.state.occupied && !this.state.leftRoom && <Button type="submit" color="success">Join this room</Button>}
        {this.state.occupied && !this.state.leftRoom && <Button color="danger" onClick = {this.handleLeaveClick}>Leave this room</Button>}
        </Form>
      </div>
    );
  }
}

class DropdownComponent2 extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      dropDownValue: 'Select location',
      dropdownOpen: false
    };
  }

  toggle(event) {

    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  changeValue(e) {
    this.props.onRoomChange(e.currentTarget.textContent);
    console.log('hello');
    // this.setState({dropDownValue: e.currentTarget.textContent}, () => {
    //     console.log(this.state.dropDownValue);
    // });
    // this.setState({dropDownValue: e.currentTarget.textContext}, () => {
    //         this.props.onRoomChange(e.currentTarget.textContent);
    //     })
  }

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret color="primary">
          {this.props.roomNumber}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.changeValue}>SN11</DropdownItem>
          <DropdownItem onClick={this.changeValue}>SN12</DropdownItem>
          <DropdownItem onClick={this.changeValue}>SN13</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }

}

export {ContainerComponent, DropdownComponent2};
