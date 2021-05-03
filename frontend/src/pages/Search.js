import React, { Component } from 'react'
import { Row, Form, Col, Modal, Button} from 'react-bootstrap' 

import instance from '../axios'
import InfiniteScroll from 'react-infinite-scroll-component';

import FilterCard from '../components/UniversiltyFilterCard'
import UniversityDataCard from '../components/UniversityDataCard'

import Select from 'react-select';

export default class Search extends Component {

    constructor() {
        super();

        this.handleFilterUniversityChange = this.handleFilterUniversityChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleDomainEndFilter = this.handleDomainEndFilter.bind(this);
        this.fetchFilteredJobs = this.fetchFilteredJobs.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalSubmit = this.handleModalSubmit.bind(this);
         this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEditCountryChange = this.handleEditCountryChange.bind(this);
        this.handleWebPageChange = this.handleWebPageChange.bind(this);

        this.state = {
            universities: [],
            filters: {
                university: '',
                country: '',
                domainend: '',
                start: 9999999,
                count: 15
            },
            selectedData:{},
            editid: '',
            modalshow: 0,
            is_filter: 0,
            start: 9999999,
            count: 15,
            hasmore: true,
            countryoptions : []
        }
    }

    componentDidMount() {
        const params = {
            count: this.state.count,
            start: this.state.start
        }
        instance.get('/', {params: params})
            .then((res) => {
                // console.log(res);
                if(res.data.university.length>0) {
                    this.setState({
                        universities: res.data.university,
                        start: res.data.university[res.data.university.length-1].id
                    })
                }
            })
    }


    fetchJobs = () => {
        const params = {
            count: this.state.count,
            start: this.state.start
        }
        console.log(params);
        instance.get('/', {params: params})
            .then((res) => {
                // console.log(res);
                if (res.data.university.length <= 0) {
                    this.setState({
                        hasmore: false
                    })
                }

                if(res.data.university.length>0) {
                    this.setState({
                        universities: this.state.universities.concat(res.data.university),
                        start: res.data.university[res.data.university.length-1].id
                    })
                }

                if(this.state.start <= 1) {
                    this.setState({
                        hasmore: false
                    })
                }
            })
        
            // console.log(this.state.universities);
    }  

    handleModalClose() {
        this.setState({
            modalshow: 0
        })
    }

    handleModalSubmit(e) {
        e.preventDefault();

        console.log("edit modal submit");
        instance.post('/updateuniversitydata', this.state.selectedData)
            .then((res) => {
                console.log(res);
                if(res.data.updatedData){
                    console.log(this.state.selectedData);
                    const elementsIndex = this.state.universities.findIndex(university => university.id == this.state.editid )
                    let newArray = [...this.state.universities]
                    newArray[elementsIndex] = {...newArray[elementsIndex], Name: this.state.selectedData.Name,
                                                alpha_two_code: this.state.selectedData.alpha_two_code,
                                                country: this.state.selectedData.country,
                                                created: this.state.selectedData.created,
                                                domain: this.state.selectedData.domain,
                                                id: this.state.selectedData.id,
                                                web_page: this.state.selectedData.web_page}
                    this.setState({
                        universities: newArray,
                        modalshow: 0,
                        editid: '',
                        selectedData: {}
                    })
                }
            })

    }

    handleNameChange(e) {
        this.setState({
            selectedData: {...this.state.selectedData, Name: e.target.value}
        })
    }

    handleWebPageChange(e) {
        this.setState({
            selectedData: {...this.state.selectedData, web_page: e.target.value}
        })
    }

    handleEditCountryChange = country => {
        this.setState({
            selectedData: {...this.state.selectedData, alpha_two_code: country.value, country: country.label}
        })
    }

    fetchFilteredJobs() {

        const params = {
            start: this.state.filters.start,
            count: this.state.filters.count,
            namefilter: this.state.filters.university,
            countrycode: this.state.filters.country,
            domainend: this.state.filters.domainend
        }
        // console.log(params);
        instance.get('/filter',  {params: params})
            .then((res) => {
                console.log(res);

                        if (res.data.filtered_university.length <= 0) {
                            this.setState({
                                hasmore: false
                            })
                        }

                        this.setState({
                            universities: this.state.universities.concat(res.data.filtered_university),
                        })

                        if(res.data.filtered_university.length>0){ 
                            this.setState({
                                filters: {...this.state.filters, start: res.data.filtered_university[res.data.filtered_university.length-1].id}
                            }, () => {
                                if(this.state.start <= 1) {
                                    this.setState({
                                        hasmore: false
                                    })
                                }
                            })
                        }
                
            })

    }

    handleFilterShow() {
        const params = {
            start: this.state.filters.start,
            count: this.state.filters.count,
            namefilter: this.state.filters.university,
            countrycode: this.state.filters.country,
            domainend: this.state.filters.domainend
        }
        console.log(params);
        instance.get('/filter',  {params: params})
            .then((res) => {
                    this.setState({
                        universities: res.data.filtered_university,
                    })

                    if(res.data.filtered_university.length>0){ 
                        this.setState({
                            filters: {...this.state.filters, start: res.data.filtered_university[res.data.filtered_university.length-1].id}
                        })
                    }
            })
    }


    handleDelete(e) {
        e.preventDefault()

        const id = e.target.parentElement.parentElement.getAttribute("div-id")
        const params = {
            deleteid: id
        }
        console.log(params);
        instance.get('/delete', {params: params})
            .then((res) => {
                console.log(res);
                if(res.data.success) {
                    for(var i =0;i<this.state.universities.length;i++) {
                        console.log("insdie for ", this.state.universities[i].id, id);
                        if(this.state.universities[i].id==id) {
                            const newList = this.state.universities.splice(i, 1);
                            console.log(newList);
                            this.setState({
                                universities: this.state.universities.filter(university => university.id != id)
                            })
                        }
                    }
                }
            })
    }

    handleEdit(e) {
        e.preventDefault();
        const id = e.target.parentElement.parentElement.getAttribute("div-id")
        console.log(id);
        this.setState({
            modalshow: 1
        })
        const params = {
            editid: id
        }
        this.setState({
            editid: id
        })
        instance.get('/getuniqueueser', {params: params})
            .then((res) => {
                console.log(res);
                this.setState({
                    selectedData: res.data.university
                })
            })

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

    handleFilterUniversityChange(e) {

        if(this.state.filters.domainend!='' || this.state.filters.country!='' || e.target.value!='') {
            this.setState({
                is_filter: 1,
                hasMore: true
            })
        }

        this.setState({
            filters: {...this.state.filters, university: e.target.value, start: 9999999,},
        }, () => {this.handleFilterShow()})  

        console.log(this.state.is_filter);
    }
    
    handleDomainEndFilter(e) {

        if(this.state.filters.university!='' || this.state.filters.country!='' || e.target.value!='') {
            this.setState({
                is_filter: 1,
                hasMore: true
            })
        }

        this.setState({
            filters: {...this.state.filters, domainend: e.target.value, start: 9999999,},
        }, () => {this.handleFilterShow()})
    }

    handleCountryChange = country => {

        if(this.state.filters.domainend!='' || this.state.filters.university!='' || country!='') {
            this.setState({
                is_filter: 1,
                hasMore: true
            })
        }
        
        this.setState({
            filters:  {...this.state.filters, country: country, start: 9999999,},
        }, () => {this.handleFilterShow()})
    }

    render() {
        return (
            <div>
                <Row>
                    <Col md="4">
                        <FilterCard 
                            handleFilterUniversityChange = {this.handleFilterUniversityChange}
                            university = {this.state.filters.university}

                            handleCountryChange= {this.handleCountryChange}
                            country= {this.state.filters.country}

                            handleDomainEndFilter = {this.handleDomainEndFilter}
                            domainend = {this.state.filters.domainend}
                        />
                    </Col>
                    <Col md="8">
                        {
                            this.state.universities.length>0?

                                // this.state.universities.map((university) => {
                                //     return(
                                //         <UniversityDataCard
                                //             universityName= {university.Name}
                                //         />
                                //     );
                                // })
                                <InfiniteScroll
                                    dataLength = {
                                        this.state.universities.length
                                    }
                                    next = {
                                        this.state.is_filter===0? this.fetchJobs : this.fetchFilteredJobs
                                    }
                                    hasMore = {
                                        this.state.hasmore
                                    }
                                    loader = {
                                        <h4> Loading... </h4>
                                    }
                                >

                                

                                {
                                    this.state.universities.length>0 ?
                                        this.state.universities.map((university) => {
                                            return(
                                                <UniversityDataCard
                                                    key ={university.id}
                                                    id = {university.id}
                                                    handleDelete = {this.handleDelete}
                                                    handleEdit={this.handleEdit}

                                                    universityName= {university.Name}
                                                    domainname={university.domain}
                                                    alphacode= {university.alpha_two_code}
                                                    country={university.country}
                                                    webpage={university.web_page}
                                                />
                                            );
                                        })
                                    :
                                    'No University '
                                }
                                </InfiniteScroll>
                            :
                                <div className="text-center">
                                    <span className="text-danger">No University in the Database.</span>
                                </div>
                        }
                    </Col>
                </Row>

                 <Modal show={this.state.modalshow} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Edit Data</Modal.Title>
                    </Modal.Header>
                    <Form>
                    <Modal.Body>
                        <Row className="justify-content-md-center">
                            <Col md="12">
                                <Form.Group as={Row} className="align-items-center" controlId="formPlaintextEmail">
                                    <Form.Label column sm="5">
                                        University Name:
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control type="text" placeholder="Caltech" 
                                            value = {this.state.selectedData.Name}
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
                                            value={{"value":this.state.selectedData.alpha_two_code, "label":this.state.selectedData.country }}
                                            onChange={this.handleEditCountryChange}
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
                                            value = {this.state.selectedData.web_page}
                                            onChange= {this.handleWebPageChange}
                                            required
                                        />
                                    </Col>
                                </Form.Group>

                                <div className="mt-3 text-center">    
                                    <span className="text-success">{this.state.success}</span>
                                    <span className='text-danger'>{this.state.error}</span>
                                </div>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleModalSubmit}>
                            Update
                        </Button>
                    </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}
