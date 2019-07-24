import React from 'react';
import { withRouter } from 'react-router-dom';
import CommentsList from './CommentsList';
import { CommentsForm } from './CommentsForm';
import {
  eateryInfo,
  updateEatery,
  fetchComments,
  deleteEatery,
  createComment,
  deleteComment,
  updateComment
} from '../../services/api-calls'


class SingleEatery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updating: false,
      commenting: false,
      updatingcommentId: null,
      eateryData: {
        name: "",
        address: "",
        website: "",
        category: "",
        price_range: ""
      },
      eateryUpdateFormData: {
        id: "",
        name: "",
        address: "",
        website: "",
        category: "",
        price_range: ""
      },
      comments: [],
      commentFormData: {
        message: "",
        yaynay: ""
      },
      commentUpdateFormData: {
        message: "",
        yaynay: ""
      }
    }
  }

  componentDidMount = async () => {
    const eateryid = parseInt(this.props.match.params.id)
    const resp = await eateryInfo(eateryid);
    const resp2 = await fetchComments(eateryid);
    const comments = resp2.comments;
    const data = resp.restaurant;
    this.setState({
      eateryData: {
        ...data,
        id: eateryid
      },
      comments
    })
    console.log(this.state.comments);
  }

  // below is for the Eatery on this page's update and deletion //////////
  handleUpdate = (eateryData) => {
    this.setState({
      updating: true,
      eateryUpdateFormData: eateryData
    })
  }

  handleUpdateCancel = () => {
    this.setState({
      updating: false
    })
  }

  handleEateryUpdateChange = (ev) => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      eateryUpdateFormData: {
        ...prevState.eateryUpdateFormData,
        [name]: value
      }
    }));
    
  }

  handleEateryUpdateSubmit = async (ev) => {
    ev.preventDefault();
    const data = this.state.eateryUpdateFormData;
    const resp = await updateEatery(data);
 
    this.setState(prevState => ({
      eateryUpdateFormData: {
        ...prevState.eateryUpdateFormData,
        name: "",
        address: "",
        category: "",
        price_range: ""
      },
      updating: false,
      eateryData: resp,
    }))
  }

  handleDelete = async (id) => {
    const resp = await deleteEatery(id);
    this.props.history.push('/eateries-list');
  }
   // above is for the Eatery on this page's update and deletion //////////
  
  
  // below is for posting new comments ////////////////////////////////////
  handleAddComment = () => {
    this.setState(prevState=> ({
      commenting: !prevState.commenting
    }))
  }
  
  handleCommentFormChange = (ev) => {
    ev.preventDefault();
    const { name, value } = ev.target;
    this.setState(prevState => ({
      commentFormData: {
        ...prevState.commentFormData,
        [name]: value
      }
    }));
    console.log(ev.target.value);
  };

 handleCommentFormSubmit = async (ev) => {
    ev.preventDefault();
   const data = { ...this.state.commentFormData, id: this.state.eateryData.id };
   console.log(data);
    const newComment = await createComment(data);
    this.setState({
    commentUpdateFormData: {
    message: '',
    yaynay: '',
    },
    commenting: false
  })
}
// aboove is for posting new comments ////////////////////////////////////


// below is for updating/deleting comments ////////////////////////////////////
  handleCommentDelete = async (id) => {
    const resp = await deleteComment(id);
    this.setState(prevState => ({
      comments: prevState.comments.filter(comment => comment.id !== id)
    }))
}
  
  handleCommentUpdate = (id) => {
  this.setState({
    updatingcommentId: id
  });
  }
  
  handleCommentUpdateChange = (ev) => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      commentUpdateFormData: {
        ...prevState.commentUpdateFormData,
        [name]: value
      }
    }));
  }

  handleCommentUpdateSubmit = async (ev) => {
    ev.preventDefault();
    console.log('clicked');
    const data = { ...this.state.commentUpdateFormData, id: this.state.updatingcommentId };
    console.log(data);
    const resp = await updateComment(data);
    console.log(resp);
    this.setState({
      commentUpdateFormData: {
        message: "",
        yaynay: ""
      },
      updatingcommentId: null
    })
  }


  handleCommentCancel = () => {
    //..
  }





  render() {
    return (
      <>
        <div className="eateryInfo">
          <h2>{this.state.eateryData.name}</h2>
          <p>Address: {this.state.eateryData.address}</p>
          <p>Category: {this.state.eateryData.category}</p>
          <p>Price Range: {this.state.eateryData.price_range}</p>
          <p>Website: {this.state.eateryData.website}</p>
          {!this.state.updating &&
            <button onClick={() => { this.handleUpdate(this.state.eateryData) }}> Update </button>}
          {!this.state.updating &&
            <button onClick={() => { this.handleDelete(this.state.eateryData.id) }}> Delete </button>}
        </div>

        {this.state.updating &&
          (<form onSubmit={this.handleEateryUpdateSubmit}>
            <input
              type="text"
              value={this.state.eateryUpdateFormData.name}
              name="name"
              placeholder="name of the restraurant"
              onChange={this.handleEateryUpdateChange}
            />
            <input
              type="text"
              value={this.state.eateryUpdateFormData.address}
              name="address"
              placeholder="address of the restraurant"
              onChange={this.handleEateryUpdateChange}
            />
            <input
              type="text"
              value={this.state.eateryUpdateFormData.category}
              name="category"
              placeholder="category of the restraurant"
              onChange={this.handleEateryUpdateChange}
            />
            <input
              type="text"
              value={this.state.eateryUpdateFormData.price_range}
              name="price_range"
              placeholder="$$$ of the restraurant"
              onChange={this.handleEateryUpdateChange}
            />
            <button name={this.props.currentEatery.id}> Finalize </button>
            <button onClick={this.handleUpdateCancel}> Cancel </button>
          </form>)}
        
          <button onClick={this.handleAddComment}>
          {!this.state.commenting ? "Leave a comment" : "Cancel commenting"}
            </button>

        {this.state.commenting &&
          <CommentsForm
          handleChange={this.handleCommentFormChange}
          handleSubmit={this.handleCommentFormSubmit}/>
        }

        <CommentsList
          comments={this.state.comments}
          updatingId={this.state.updatingcommentId}
          handleDelete={this.handleCommentDelete}
          handleUpdate={this.handleCommentUpdate}
          handleChange={this.handleCommentUpdateChange}
          handleSubmit={this.handleCommentUpdateSubmit}
          
          commentUpdateFormData={this.props.commentUpdateFormData}
        
          handleCancel={this.props.handleCommentCancel}
        />

      </>

    )
  }
}

export default withRouter(SingleEatery);