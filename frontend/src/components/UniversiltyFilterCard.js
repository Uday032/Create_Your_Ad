import React, { Component } from 'react'
import {Card, Form, Row, Col} from 'react-bootstrap'
import Select from 'react-select';

import instance from '../axios'

export default class UniversiltyFilterCard extends Component {

    constructor() {
        super();

        this.state = {
            countryoptions : [],
        }
    }

    componentDidMount() {
        instance.get('/getcountries')
            .then((res) => {
                this.setState({
                    countryoptions: res.data.countries.map((country) => {
                        return({
                            'value': country[0],
                            'label': country[1]
                        })
                    })
                },() => {
                    this.setState({
                        countryoptions: [...this.state.countryoptions]
                    })
                })
            })
    }

    render() {
        return (
            <Card border="dark">
                <Card.Header>Filter</Card.Header>
                <Card.Body>
                <Card.Text>
                    <div>
                        <Form.Group as={Row} className="align-items-center" controlId="formPlaintextEmail">
                            <Form.Label column sm="5">
                                Country Code
                            </Form.Label>
                            <Col sm="7">
                                <Select
                                    value={this.props.country}
                                    onChange={this.props.handleCountryChange}
                                    options={this.state.countryoptions}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" controlId="formPlaintextEmail">
                            <Form.Label column sm="5">
                                Domain End
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="text" placeholder="1" 
                                    value = {this.props.domainend}
                                    onChange= {this.props.handleDomainEndFilter}
                                />
                            </Col>
                        </Form.Group>
                    </div>
                </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}
