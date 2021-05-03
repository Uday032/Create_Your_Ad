import React, { Component } from 'react'
import {Button} from 'react-bootstrap' 

import instance from '../axios'

export default class UploadData extends Component {
    constructor() {
        super();

        this.handleUploadData = this.handleUploadData.bind(this);

        this.state= {
            success: '',
            show_redirect: 0,
            error: ''
        }
    }

    handleUploadData(e) {

        this.setState({
            success: 'Please wait, Data is Uploading...',
            show_redirect: 0,
             error: ''
        })

        instance.get('/fake')
            .then((res) => {
                if(res.data.success) {
                    this.setState({
                        success: 'Data Uploaded.',
                        show_redirect: 1,
                        error: ''
                    })
                } else {
                    this.setState({
                        error: res.data.msg,
                        success: ''
                    })
                }
            })

    }

    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleUploadData}>Click Here to Upload Data</Button>{' '}
                <div className="mt-4">
                    <span className="text-success">{this.state.success}{this.state.show_redirect? <a href="/search"> Click here to see uploaded data </a>: ''}</span>
                    <span className="text-danger">{this.state.error}</span>
                </div>
            </div>
        )
    }
}
