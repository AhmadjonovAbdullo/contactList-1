import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Button, Col, Container, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            contactList: [],
            item1: "",
            item2: "",
            item3: "",
            it1: "",
            it2: "",
            it3: "",
            val: (-1),
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    AddHere1 = (e) => {
        this.setState({
            item1: e.target.value,
        });
        console.log(this.state.item1)
    };
    AddHere2 = (e) => {
        this.setState({
            item2: e.target.value,
        });
        console.log(this.state.item2)
    };
    AddHere3 = (e) => {
        this.setState({
            item3: e.target.value
        });
        console.log(this.state.item3)
    };
    edita = (e) => {
        this.state.contactList.forEach((item, index) => {
            if (index == e.target.value) {
                this.setState({
                    val: index,
                    modal: !this.state.modal
                }, () => {
                    console.log("this.state.val = ", this.state.val)
                });
            }
        });
    };

    delete = (e) => {
        let List = this.state.contactList.filter((item, index) => {
            if (index.toString() !== e.target.value)
                return item;
        });

        this.setState({
            contactList: List,
        })
    };


    rend = (e) => {
        if (this.state.val != (-1)) {
            let name = this.state.item1;
            let numberPhone = this.state.item2;
            let mailAddress = this.state.item3;
            let items = {
                name,
                numberPhone,
                mailAddress
            };
            let temp = [];
            let index = this.state.val;
            console.log(index);
            for (let i = 0; i < index; i++)
                temp.push(this.state.contactList[i]);
            temp.push(items);
            for (let i = index + 1; i < this.state.contactList.length; i++)
                temp.push(this.state.contactList[i]);
            this.setState({
                contactList: [...temp],
                modal: !this.state.modal,
                val: -1
            });
        } else {
            let name = this.state.item1;
            let numberPhone = this.state.item2;
            let mailAddress = this.state.item3;
            let items = {
                name,
                numberPhone,
                mailAddress
            };
            this.setState({
                contactList: [...this.state.contactList, items],
                modal: !this.state.modal
            });
        }
    };

    render() {
        return (
            <div className="App">
                <Container>
                    <Row>
                        <Col md={{size: 12}}>
                            <div>
                                <Button className="btn btn-dark" onClick={this.toggle}
                                        style={{width: '100%'}}>AddContact{this.props.buttonLabel}</Button>
                                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                    <ModalHeader toggle={this.toggle}>Contact</ModalHeader>
                                    <ModalBody>
                                        <Input onChange={this.AddHere1} className="form-control"
                                               placeholder="enter name"/>
                                        <br/>
                                        <Input onChange={this.AddHere2} className="form-control"
                                               placeholder="enter phone"/>
                                        <br/>
                                        <Input onChange={this.AddHere3} className="form-control"
                                               placeholder="enter email"/>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.rend} value={this.state.val}>Ok</Button>
                                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                            <table className="table table-striped table-active table-hover table-bordered bg-light">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>FullName</th>
                                    <th>PhoneNumber</th>
                                    <th>MailAdress</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.contactList.map((item, index) => {
                                        return <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.numberPhone}</td>
                                            <td>{item.mailAddress}</td>
                                            <td>
                                                <button onClick={this.edita} className="btn btn-danger" value={index}/>
                                                <button onClick={this.delete} className="btn btn-dark" value={index}/>
                                            </td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

App.propTypes = {};

export default App;