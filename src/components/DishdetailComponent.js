import React,{ Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import {LocalForm, Control, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmitComment(values){
        this.handleClick();
        console.log(this.props.dishId);
        this.props.addComment(this.props.dishId, values.rating, values.yourname, values.comment);
    }
    render() {
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);
        return (
            <div>
                <Button outline onClick={this.handleClick}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.handleClick}>
                    <ModalHeader toggle={this.handleClick}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                            <Col>
                            <Label htmlFor="rating"><h5>Rating</h5></Label>
                                <Control.select model=".rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                </Col>
                                <br/>
                                <Col>
                                <Label htmlFor="yourname"><h5>Your Name</h5></Label>
                                
                                    <Control.text 
                                        model='.yourname' 
                                        id="yourname" 
                                        name="yourname"    
                                        placeholder="Your Name"
                                        className='form-control' 
                                        validators={{
                                            required, 
                                            minLength: minLength(3), 
                                            maxLength: maxLength(15)
                                        }}/>
                                        <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        />
                                        </Col>
                                        <br/>
                                <Col>
                                    <Label htmlFor="comment"><h5>Comment</h5></Label>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" className='form-control'/>
                                </Col>
                                <br/>
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
    

    function RenderDish({dish}) {
        if (dish != null){
            return(
                <div className="col-12 m-1">
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
    }

    function RenderComments({comments}) {
        if (comments != null){
            return(<div>
                <ul className="list-unstyled">
                {comments.map((comment,id) =>{
                    return <div className="container" key={id}>
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

    const  DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null){
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                        />
                        <CommentForm dishId={props.dish.id} addComment={props.addComment} />
                    </div>
                </div>
                
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

export default DishDetail
