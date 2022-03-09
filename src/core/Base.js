import React from 'react'
import Menu from './Menu'

export default function Base({
    title="My title",
    description="My description",
    className="bg-dark text-white p-4",
    children
}) {
    return (
        <div>
        <Menu />
        <div className="container-fluid ">
            <div className="jumbotron bg-dark text-white text-center mb-0 p-2">
                <h2 className="display-4">{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
        {/* <footer className="footer bg-dark  py-3">
            <div className="container-fluid bg-success text-white text-center">
                <h6 className="mb-3">If You got Any Questions feel free to reach out</h6>
                <button className="btn btn-warning btn-lg text-white mb-2">Contact US</button>
            </div>
        </footer> */}
        </div>
    )
}
