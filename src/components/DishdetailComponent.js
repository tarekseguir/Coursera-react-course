import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
export class Dishdetail extends Component {
    renderDish(dish) {
        if (dish != null){
            console.log(dish);
            return(
                <Card key={dish.id}>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
    }

    renderComments(comments) {
        if (comments != null){
            console.log(comments);
            return(<div>
                <ul class="list-unstyled">
                {comments.map((comment) =>{
                    return <div className="container">
                        <li>{comment.comment}</li>
                        <li>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                        </div>
                })
                }
                </ul>
            </div>);
        }
        else{
            return(<div></div>);
        }
    }

    render() {
        return (
            <div className="row">
                {(this.props != null)? 
                <div>
                    <div  className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props)}
                    </div>
                    
                    <div className="col-12 col-md-5 p-l">
                    <h4 className="p-1">Comments</h4>
                        {this.renderComments(this.props.comments)}
                    </div>
                </div> : null}
            </div>
        )
    }
}

export default Dishdetail
