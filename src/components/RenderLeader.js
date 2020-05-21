import React from 'react'
import {CardText, CardTitle, CardSubtitle} from 'reactstrap';

export default function RenderLeader(props) {
    return (
        <div className="row row-content">
            <div>
                <img src={props.image} alt={props.name} />
            </div>
            <div className="col-12 col-md-8">
                <CardTitle>{props.name}</CardTitle>
                {props.designation ? <CardSubtitle>{props.designation}</CardSubtitle> : null }
                <CardText>{props.description}</CardText>
            </div>
        </div>
    )
}
