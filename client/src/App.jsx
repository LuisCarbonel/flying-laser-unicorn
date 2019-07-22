import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from './components/main/Home';
import './App.css';
import Introduction from "./components/main/Introduction";
import CommentsList  from './components/main/CommentsList';
import EateriesList  from './components/main/EateriesList';
import HireUs from "./components/footer/HireUs";
import { Navegation } from "./components/header/NavBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',

      //below are states for commentlist and eatery list//
      comments: [],
      eateries: [],
      commentUpdateFormData: {
        id: "",
        messsage: "",
        yaynay: ""
      },
      eateryUpdateFormData: {
        id: "",
        name: "",
        address: "",
        category: "",
        priceRange: ""
      }
      //above are states for commentlist and eatery list//
    };
  }




  //below is eatieryList and commentList function stuff//
  handleCommentUpdate = (ev) => {
    this.setState(prevState=> ({
      commentUpdateFormData: {
        ...prevState.commentUpdateFormData,
        id: ev.target.name
      }
    }));
  }
  handleEateryUpdate = (ev) => {
    this.setState(prevState=> ({
      ...prevState.eateryUpdateFormData,
      id: ev.target.name
    }));
  }
  handleCommentUpdateChange = (ev) => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      eateryUpdateFormData: {
        ...prevState.commentUpdateFormData,
        [name]: value
      }
    }));
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
  handleCommentUpdateSubmit = async (ev) => {
    ev.preventDefault();
    const data = this.state.commentUpdateFormData;
    console.log(`update Comment No. ${data.id} !!!`);
    //insert function from service to make axios call. await!!
    this.setState({
      commentUpdateFormData: {
        id: "",
        messsage: "",
        yaynay: ""
      }
    })
  }
  handleEateryUpdateSubmit = async (ev) => {
    ev.preventDefault();
    const data = this.state.eateryUpdateFormData;
    console.log(`updated Eatery no. ${data.id} !!!`);
    //insert function from service to make axios call. await!!
    this.setState({
      eateryUpdateFormData: {
        id: "",
        name: "",
        address: "",
        category: "",
        priceRange: ""
      }
    })
  }
  handleCommentCancel = () => {
    this.setState(prevState=> ({
      commentUpdateFormData: {
        ...prevState.commentUpdateFormData,
        id: ""
      }
    }))
  }
  handleEateryCancel = () => {
    this.setState(prevState=> ({
      eateryUpdateFormData: {
        ...prevState.eateryUpdateFormData,
        id: ""
      }
    }))
  }
  //above is eatieryList and commentList function stuff//


  componentDidMount = async () => {
    // await 
  }


  render() {
    return (
      <div className="App">
        <header>
          <Link to="/"> Home </Link>
          <Link to="/introduction"> Introduction </Link>
          <Link to="/comments-list"> Comments List </Link>
          <Link to="/eateries-list"> Eatery List </Link>
          <Navegation />

        </header>

        <main>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/introduction" render={() => <Introduction />} />
          <Route exact path="/comments-list" render={() => <CommentsList
            comments={this.state.comments}
            commentUpdateFormData={this.state. commentUpdateFormData}
            handleUpdate={this.handleCommentUpdate}
            handleChange={this.handleCommentUpdateChange}
            handleSubmit={this.handleCommentUpdateSubmit}
            handleCancel={this.handleCommentCancel}
          />} />
          <Route exact path="/eateries-list" render={() => <EateriesList
            eateries={this.state.eateries}
            eateryUpdateFormData={this.state.eateryUpdateFormData}
            handleUpdate={this.handleEateryUpdate}
            handleChange={this.handleEateryUpdateChange}
            handleSubmit={this.handleEateryUpdateSubmit}
            handleCancel={this.handleEateryCancel}
          />} />
        </main>

        <footer>
          <HireUs />
        </footer>
      </div>
    );
  }
}

export default App;
