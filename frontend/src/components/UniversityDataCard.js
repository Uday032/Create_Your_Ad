import React, { Component } from 'react'
import {Card, Row, Col} from 'react-bootstrap'

import {MdEdit, MdDelete} from "react-icons/md";

export default class UniversityDataCard extends Component {
    render() {
        return (
            <div>
            <Card border="dark mb-4" card-id={this.props.id}>
                <Card.Body>
                <div>
                    <div className="float-left">
                        <Card.Title>{this.props.universityName}</Card.Title>
                    </div>
                    <div className="float-right inline-flex">
                        <div  div-id={this.props.id} ><a href="#" onClick={this.props.handleEdit} div-id={this.props.id} className="atag_black"><MdEdit size={20}/></a></div>
                        <div div-id={this.props.id} className="pl-2"><a href="#" div-id={this.props.id} onClick={this.props.handleDelete} className="atag_black"><MdDelete size={20}/></a></div>
                    </div>
                </div>
                <div className="clearbothdiv"></div>
                <Card.Text>
                    <div className="ml-2">
                        <Row>
                            <Col md="4">
                                <span className="h6">Domain Name: </span>
                            </Col>
                            <Col md="8">
                                <a href={this.props.webpage} domainname-id={this.props.id} target="_blank">{this.props.domainname}</a>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                                <span className="h6">Alpha Two Code: </span>
                            </Col>
                            <Col md="8" alpha-id={this.props.id}>
                                {this.props.alphacode}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                                <span className="h6">Country: </span>
                            </Col>
                            <Col md="8" country-id={this.props.id}>
                                {this.props.country}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                                <span className="h6">Web Page: </span>
                            </Col>
                            <Col md="8" webpage-id={this.props.id}>
                                <a href={this.props.webpage} target="_blank">{this.props.webpage}</a>
                            </Col>
                        </Row>

                    </div>
                </Card.Text>
                </Card.Body>
            </Card>
            </div>
        )
    }
}
