import React from 'react';
import './App.css';
import { createUser, loginUser, createEatery, createComment, fetchComments } from './services/api-calls'
import { Route, Link } from 'react-router-dom'
import Home from './components/main/Home';
import CommentsList from './components/main/CommentsList'
import Introduction from "./components/main/Introduction";
import SingleEatery from './components/main/SingleEatery';
import EateriesList from './components/main/EateriesList';
import HireUs from "./components/footer/HireUs";
import NavigationBar from "./components/header/NavBar";
import RegisterUser from "./components/main/RegisterUser";
import LoginUser from "./components/main/LoginUser"
import { CommentsForm } from "./components/main/CommentsForm";
import Eateries from './components/main/Eateries';
import RegisterContainer from './components/main/RegisterContainer';
import LoginContainer from './components/main/LoginContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentFormData: {
        message: '',
        yaynay: ''
      },
      loginFormData: {
        name: '',
        password: ''
      },
      registerFormData: {
        name: '',
        password: '',
        email: ''
      },
      user: '',
      currentUser: "",
      comments: [],
      eateries: [],
      eateryFormData: {
        name: '',
        address: '',
        category: '',
        website: '',
        priceRange: null,
      },
      commentUpdateFormData: {
        id: "",
        messsage: "",
        yaynay: ""
      },
      eateryUpdateFormData: {
        id: "",
        name: "",
        address: "",
        website: "",
        category: "",
        priceRange: ""
      },
      currentEatery: {
        id: "",
        name: "",
        address: "",
        category: "",
        priceRange: ""
      },
      eateriesData: [],
    };
  }
  handleRegisterChange = (e) => {
    const { target: { name, value } } = e;
    this.setState(prevState => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: value,
      }
    }));
  }
  handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.registerFormData);
    const newUser = await createUser(this.state.registerFormData);
  }
  handleLoginChange = (e) => {
    const { target: { name, value } } = e;
    this.setState(prevState => ({
      loginFormData: {
        ...prevState.loginFormData,
        [name]: value,
      }
    }));
  }
  handleLoginSubmit = async (e) => {
    e.preventDefault()
    const resp = await loginUser(this.state.loginFormData.name, this.state.loginFormData.password)
    this.setState({
      currentUser: resp.data.user.name,
      user: resp.data.user.id,
    });
    console.log(this.state.currentUser)
    console.log(this.state.user)
  }
  handleEateryChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      eateryFormData: {
        ...prevState.eateryFormData,
        [name]: value
      }
    }))
  }
  handleCommentUpdate = (ev) => {
    this.setState(prevState => ({
      commentUpdateFormData: {
        ...prevState.commentUpdateFormData,
        id: ev.target.name
      }
    }));
  }

  handleEaterySubmit = async (ev) => {
    ev.preventDefault();
    const eateries = await createEatery(this.state.eateryFormData)
    console.log(eateries)
    this.setState((prevState) => ({
      eateriesData: [...prevState.eateriesData, eateries],
      eateryFormData: {
        name: '',
        address: '',
        category: '',
        website: '',
        priceRange: '',
      },
    }));
  }


  async componentDidMount() {
    if (this.state.currentEatery.id) {
      const comments = await fetchComments(this.state.currentEatery.id);
      const eatery = await eatery(this.state.currentEatery.id);
      const { name, address, category, priceRange } = eatery;
      this.setState(prevState => ({
        currentEatery: {
          ...prevState.currentEatery,
          name: name,
          address: address,
          category: category,
          priceRange
        },
        comments: comments
      }))
    }
  }


  handleDetail = (ev) => {
    this.setState(prevState => ({
      currentEatery: {
        ...prevState.currentEatery,
        id: ev.target.name
      }
    }));
  }
  handleEateryUpdate = (ev) => {
    this.setState(prevState => ({
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
    this.setState(prevState => ({
      commentUpdateFormData: {
        ...prevState.commentUpdateFormData,
        id: ""
      }
    }))
  }
  handleEateryCancel = () => {
    this.setState(prevState => ({
      eateryUpdateFormData: {
        ...prevState.eateryUpdateFormData,
        id: ""
      }
    }))
  }
  //above is eatieryList and commentList function stuff//
  handleCommentFormSubmit = async (ev) => {
    ev.preventDefault();
    console.log("clicked");
    const newComment = await createComment(this.state.commentFormData);
    this.setState({
      commentFormData: {
        message: '',
        yaynay: '',
      }
    })
    console.log(newComment)
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
    console.log(ev.target.value)
  };
  render() {
    return (
      <div className="App">
        <header>
          <NavigationBar />
        </header>

        <main>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/introduction" render={() => <Introduction />} />
          <Route exact path='/addEatery' render={() => <Eateries
            handleEateryChange={this.handleEateryChange}
            handleEaterySubmit={this.handleEaterySubmit}
            eateryFormData={this.state.eateryFormData}
          />} />
          <Route exact path="/comments" render={() => <CommentsForm
            handleChange={this.handleCommentFormChange}
            handleSubmit={this.handleCommentFormSubmit}
          />} />
          <Route exact path="/comments-list" render={() => <CommentsList
            comments={this.state.comments}
            commentUpdateFormData={this.state.commentUpdateFormData}
            handleUpdate={this.handleCommentUpdate}
            handleChange={this.handleCommentUpdateChange}
            handleSubmit={this.handleCommentUpdateSubmit}
            handleCancel={this.handleCommentCancel}
          />} />
          <Route exact path="/eateries-list" render={() => <EateriesList
            eateries={this.state.eateries}
            eateryUpdateFormData={this.state.eateryUpdateFormData}
            handleDetail={this.handleDetail}
            handleUpdate={this.handleEateryUpdate}
            handleChange={this.handleEateryUpdateChange}
            handleSubmit={this.handleEateryUpdateSubmit}
            handleCancel={this.handleEateryCancel}
          />} />
          {/*TODO: Ask why this was  here?*/}
          {/*{this.state.currentEatery &&*/}
          {/*<SingleEatery*/}
          {/*    currentEatery={this.state.currentEatery}*/}
          {/*    comments={this.state.comments}*/}
          {/*/>}*/}
          <Route path="/login" exact render={() => <LoginUser
            handleChange={this.handleLoginChange}
            handleSubmit={this.handleLoginSubmit}
            formData={this.state.loginFormData} />} />
          <Route path="/register" exact render={() => <RegisterUser
            formData={this.state.registerFormData}
            handleChange={this.handleRegisterChange}
            handleSubmit={this.handleRegisterSubmit} />} />
        </main>
        <footer>
          <HireUs />
        </footer>
      </div>
    );
  }
}
export default App;