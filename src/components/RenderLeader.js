import React from 'react'

export default function RenderLeader(props) {
    return (
        <div className="row row-content">
            <div>
                <img src={props.image} alt={props.name} />
            </div>
            <div className="col-12 col-md-8">
                <h3>{props.name}</h3>
                {props.designation ? <h5>{props.designation}</h5> : null }
                <p>{props.description}</p>
            </div>
        </div>
    )
}
