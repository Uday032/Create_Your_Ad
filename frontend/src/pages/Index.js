import React, { Component } from 'react'

export default class Index extends Component {
    render() {
        return (
            <div className="text-center align-items-center full-height">
                <a className="btn btn-primary" href="/upload">Upload Data</a>
                <a className="btn btn-dark ml-3" href="/search">Search Universities</a>
                <a className="btn btn-light ml-3" href="/adduniversity">Add University</a>
            </div>
        )
    }
}
