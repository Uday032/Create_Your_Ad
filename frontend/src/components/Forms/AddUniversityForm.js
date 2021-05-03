import React, { Component } from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap'
import Select from 'react-select';

import instance from '../../axios'

export default class AddUniversityForm extends Component {

    constructor(){
        super();

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleWebPageChange = this.handleWebPageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            countryoptions : [],
            country: '',
            name: '',
            web_page: '',
            success: '',
            error: ''
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
                })
            })
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleWebPageChange(e) {
        this.setState({
            web_page: e.target.value
        })
    }

    handleCountryChange = country => {
        this.setState({country})
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("submittted");
        const data = {
            'name': this.state.name,
            'alpha_two_code': this.state.country.value,
            'web_page': this.state.web_page
        }

        instance.post('/adduniversity', data)
            .then((res) => {
                if(res.data.success) {
                    this.setState({
                        success: res.data.msg,
                        error: '',
                        country: '',
                        name: '',
                        web_page: '',
                    })
                } else {
                    this.setState({
                        error: 'Error Adding the Data. Please try agin in some time',
                        success: ''
                    })
                }
            })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row className="justify-content-md-center">
                    <Col md="6">
                        <Form.Group as={Row} className="align-items-center" controlId="formPlaintextEmail">
                            <Form.Label column sm="5">
                                University Name:
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="text" placeholder="Caltech" 
                                    value = {this.state.name}
                                    onChange= {this.handleNameChange}
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" controlId="formPlaintextEmail">
                            <Form.Label column sm="5">
                                Country:
                            </Form.Label>
                            <Col sm="7">
                                <Select
                                    value={this.state.country}
                                    onChange={this.handleCountryChange}
                                    options={this.state.countryoptions}
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center" controlId="formPlaintextEmail">
                            <Form.Label column sm="5">
                                Web Page:
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="text" placeholder="http://www.marywood.edu" 
                                    value = {this.state.web_page}
                                    onChange= {this.handleWebPageChange}
                                    required
                                />
                            </Col>
                        </Form.Group>

                        <div className="text-center ">
                            <Button variant="primary" className="mt-4" type="submit">
                                Submit
                            </Button>
                        </div>
                        

                        <div className="mt-3 text-center">    
                            <span className="text-success">{this.state.success}</span>
                            <span className='text-danger'>{this.state.error}</span>
                        </div>
                    </Col>
                </Row>
            </Form>
        )
    }
}
