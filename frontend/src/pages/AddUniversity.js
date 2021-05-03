import React, { Component } from 'react'

import AddUniversityForm from '../components/Forms/AddUniversityForm'

export default class AddUniversity extends Component {
    render() {
        return (
            <div>
                <div className="text-center mb-5">
                    <h4>Add University</h4>
                </div>
                <AddUniversityForm />
            </div>
        )
    }
}
