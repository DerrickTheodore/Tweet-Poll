import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import NegativeTweets from './negativeTweets.jsx';
import NeutralTweets from './neutralTweets.jsx';
import PositiveTweets from './positiveTweets.jsx';
import GraphDisplay from './GraphDisplay.jsx';
import BarDisplay from './barDisplay.jsx';
import Search from './Search.jsx';
import PreviousSearches from './PreviousSearches.jsx';
import Loader from './loader.jsx';
import axios from 'axios';
import bodyParser from 'body-parser';
import sentiment from 'sentiment';
import styled from 'styled-components';
import './style/baseStyle.scss';
import dragula from 'react-dragula';
import SaveTweet from './saveTweet.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Modal from 'react-modal';
import IconButton from 'material-ui/IconButton';
import ActionNavigationClose from 'material-ui/svg-icons/navigation/close';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import UserModal from './userModal.jsx';
import Cookies from 'universal-cookie';
import SelectedUsersProfile from './SelectedUsersProfile.jsx';
import Navbar from './navBar.jsx'

////////////////
//EXAMPLE DATA//
////////////////
import userDataExample from '../../profileExampleData.js';
import { userStatuses } from '../../profileExampleData.js'
////////////////


class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      tweets: [],
      negativeTweets: [],
      neutralTweets: [],
      positiveTweets: [],
      previousSearches: [],
      posAverage: 0,
      neutAverage: 0,
      negAverage: 0,
      searchTerm: '',
      lastSearchTerm: 'flock',
      graphData: [],
      graphMode: false, // when user clicks 'view history of ___', changes to true and renders graphDisplay 
      loading: true,
      savedTweets: [],
      clicked: false,
      clickedUser: '',
      //hold data fetched from api call 
      clickedUserData: {},
      clickedUserDataContentLoaded: false,
      isDragging: false,
      authenticated: false,
    }

    this.getUserData = this.getUserData.bind(this);
    this.getAllTweets = this.getAllTweets.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.getHistory = this.getHistory.bind(this);
    this.showGraph = this.showGraph.bind(this);
    this.resetGraphMode = this.resetGraphMode.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.friendClickHandler = this.friendClickHandler.bind(this);
    this.storeUser = this.storeUser.bind(this);
    this.handleFaves = this.handleFaves.bind(this);
  }

  showGraph(e) {
    e.preventDefault()
    this.setState({
      graphMode: true
    });
  }

  clickHandler(user) {
		this.setState({clicked: !this.state.clicked}, () => {
      this.setState({clickedUser: user}, () => {
        this.getUserData()
      })
    })
  }

  friendClickHandler(user) {
    console.log('user:  ', user)
    this.setState({clickedUser: user}, () => {
      this.getUserData()
    })
  }

  resetGraphMode(e) {
    e.preventDefault();
    this.setState({
      graphMode: false
    });
  }


  handleInputChange(e) {
    $('.search.container').removeClass('error');
    this.setState({
      searchTerm: e.target.value
    });
  }

  getHistory() {
    axios.get('/database', {params:{searchTerm: this.state.lastSearchTerm}}).then((response) => {
      console.log('response.data: ', response.data);
      this.setState({
        graphData: response.data // graph will now re-render with data from most recently searched term.
      });
    });
  }

  submitQuery(e) {
    e.preventDefault();
    this.state.searchTerm === '' ? $('.search.container').addClass('error') : this.getAllTweets(this.state.searchTerm, 'hash'); //add extra searchParameter functionallity
  }

  getAllTweets(term, filter) {//add extra searchParameter functionallity
    // first reset state so that new tweets will render properly.
    this.setState({
      negativeTweets: [],
      neutralTweets: [],
      positiveTweets: [],
      loading: true,
      graphMode: false
    });

    axios.post('/search', {searchTerm: term, searchParam: filter}).then((res) => {
      this.setState({
        tweets: res.data,
        lastSearchTerm: term,
        searchTerm: '',
        previousSearches: [...this.state.previousSearches, term],
        loading: false
      });
      this.assignAndCount(this.state.tweets, term)
      this.getHistory();
    });
  }

  getUserData() {
    if(this.state.clickedUser) {
      axios.post(`/UserProfileData`, {clickedUser: this.state.clickedUser})
      .then((results) => {
        let UserProfileDataObject = results.data;
        this.setState({clickedUserData: UserProfileDataObject}, () => {
          this.setState({userModalStylingSheet: 'user-modal-content'})
          this.setState({clickedUserDataContentLoaded: true})
        })
      })
    }
  }

  assignAndCount(tweets) {
    if (!tweets.length) return
    let negativeTweets = [], positiveTweets = [], neutralTweets = [], negAverage, posAverage, neutAverage;
    tweets.forEach(tweet => {
      let score = tweet.sentimentDataObject.reduce((final_score, sentimentObject) => {
        if( this.state.lastSearchTerm.includes( sentimentObject.name ) ) {
          final_score += sentimentObject.score;
        }
        return final_score;
      }, 0)
      tweet.score = score;
      if (score < 0){
        negativeTweets.push(tweet)
      }else if( score === 0){
        neutralTweets.push(tweet)
      } else {positiveTweets.push(tweet)};
    })

    tweets = [...negativeTweets, ...positiveTweets, ...neutralTweets]
    negAverage = (negativeTweets.length / tweets.length) * 100
    posAverage = (positiveTweets.length / tweets.length) * 100
    neutAverage = (neutralTweets.length / tweets.length) * 100

    this.setState({
      tweets,
      negAverage,
      posAverage,
      neutAverage,
      positiveTweets,
      negativeTweets,
      neutralTweets

    })
    axios.post('/database', {average: newAverage, searchTerm: searchTerm});
  }
  handleDrop({idx, type}) {
    let positiveTweets = this.state.positiveTweets;
    let neutralTweets = this.state.neutralTweets;
    let negativeTweets = this.state.negativeTweets;
    let tweet;
    if (type === 'positiveTweets') {
      tweet = positiveTweets.splice(idx, 1)[0]
      tweet.score = -1 * tweet.score
      negativeTweets.splice(idx, 0, tweet)

    } else if (type === 'negativeTweets') {
      tweet = negativeTweets.splice(idx, 1)[0]
      tweet.score = -1 * tweet.score
      positiveTweets.splice(idx, 0, tweet);
    }
    let tweets = [...negativeTweets, ...positiveTweets, ...neutralTweets];
    let negAverage = (negativeTweets.length / tweets.length) * 100
    let posAverage = (positiveTweets.length / tweets.length) * 100
    let neutAverage = (neutralTweets.length / tweets.length) * 100
    this.setState({
      negativeTweets,
      tweets,
      posAverage,
      negAverage,
      neutAverage
    })
  }

  storeUser(userId) {
    const cookies = new Cookies();
    let user = cookies.get('userId')
    if (!user) {
      cookies.set('userId', userId);
      this.setState({
        authenticated: true
      }, () => console.log(this.state.authenticated))
    }
  }

  handleSave({ idx, type }) {
    let tweet;
    const cookies = new Cookies();
    if(type === 'positiveTweets') {
      tweet = this.state.positiveTweets[idx];
    } else {
      tweet = this.state.negativeTweets[idx];
    }
    const userId = cookies.get('userId')
    const favorite = tweet.user_name;
    if (userId) {
      axios.post('/favorites', {userId, favorite})
      .then((fav) => console.log('stored favorite', fav))
    }
  }

  handleDrag() {
    this.setState({
      isDragging: !this.state.isDragging
    })
  }

  handleFaves() {
    const cookies = new Cookies();
    axios.get('/favorites', {
      headers: {'userId': cookies.get('userId')}
    })
    .then(response => {
      return response.data.map(a => a.favorite);
    })
    .then(names => {
      console.log(names)
    })
  }

  componentWillMount() {
    this.getAllTweets('President Trump', '');//add extra searchParameter functionallity
  }

  componentDidMount() {
    const cookies = new Cookies();
    let user = cookies.get('userId')
    if(user) {
      this.setState({
        authenticated: true
      })
    }
  }
  
  render () {
    const styles = {
      smallIcon: {
        width: 36,
        height: 36,
      },
      mediumIcon: {
        width: 48,
        height: 48,
      },
      largeIcon: {
        width: 60,
        height: 60,
      },
      small: {
        width: 72,
        height: 72,
        padding: 16,
      },
      medium: {
        width: 96,
        height: 96,
        padding: 24,
      },
      large: {
        width: 120,
        height: 120,
        padding: 30,
      },
      closeButton: {
        right: "-90%",
        bottom: 85
      }
    };
    const { authenticated } = this.state;
    if (!this.state.loading) {
      if(!this.state.graphMode) {
        return (
          
          <MuiThemeProvider>
          <div className="row">

            { !authenticated ?
              <UserModal storeUser={this.storeUser}/>:
              null
            }

            <div className="siteNav header col col-6-of-6">
              <h1>What the Flock?</h1>
              <img src="./images/poop_logo.png" alt="" className="logo"/>
            </div>
              
            <Modal
              isOpen={this.state.clicked}
              ariaHideApp={false}
              // onAfterOpen={}
              // onRequestClose={requestCloseFn}
              // closeTimeoutMS={n}
              className={{
                base: 'user-modal-content',
                afterOpen: 'user-modal-overlay_after-open',
                beforeClose: 'user-modal-content_before-close'
              }}
              overlayClassName={{
                base: 'user-modal-overlay',
                afterOpen: 'user-modal-overlay_after-open',
                beforeClose: 'user-modal-overlay_before-close'
              }}
              contentLabel="Modal" 
            >
              <SelectedUsersProfile 
                userData={this.state.clickedUserData}
                clickHandler={this.clickHandler}
                friendClickHandler={this.friendClickHandler}
              />
            </Modal>

            <Search submitQuery={this.submitQuery} searchTerm={this.state.searchTerm} getAllTweets={this.getAllTweets} handleInputChange={this.handleInputChange}/>
            {/* <NavBar /> */}
            <div id="error"></div>
            {
              authenticated ?
              <SaveTweet save={this.handleSave} handleFaves={this.handleFaves} isDraggingging={this.state.isDraggingging}/>:
              null
            }
            <BarDisplay negPercentage={this.state.negAverage} neutPercentage={this.state.neutAverage} posPercentage={this.state.posAverage} lastSearchTerm={this.state.lastSearchTerm} loading={this.state.loading} showGraph={this.showGraph}/>
            <div style={{display:"flex"}}>
              <PositiveTweets className="tweetColumns row" dragging={this.handleDrag} drop={this.handleDrop} clickHandler={this.clickHandler} tweets={this.state.positiveTweets}/>
              <NeutralTweets className="tweetColumns row" dragging={this.handleDrag} drop={this.handleDrop} clickHandler={this.clickHandler} tweets={this.state.neutralTweets}/>            
              <NegativeTweets className="tweetColumns row"  dragging={this.handleDrag} drop={this.handleDrop} clickHandler={this.clickHandler} tweets={this.state.negativeTweets}/>
            </div>
          </div>
          </MuiThemeProvider>
        )
      } else {
        	return (
            <div className="row">
              <div className="siteNav header col col-6-of-6">
                <h1>What the Flock?</h1>
                <img src="./images/poop_logo.png" alt="" className="logo"/>
                <button onClick={this.compareClick}> Test</button>
              </div>
              <Search submitQuery={this.submitQuery} searchTerm={this.state.searchTerm} getAllTweets={this.getAllTweets} handleInputChange={this.handleInputChange}/>
              <div id="error"></div>
              <GraphDisplay data={this.state.graphData} term={this.state.lastSearchTerm} resetGraphMode={this.resetGraphMode}/>
            </div>
          )
      }
      
    } else {
      return(
        <div className="row">
        <div className="siteNav header col col-6-of-6">
          <h1>What the Flock?</h1>
          <img src="./images/poop_logo.png" alt="" className="logo"/>
          <button onClick={this.compareClick}> Test</button>          
        </div>
        <Search submitQuery={this.submitQuery} searchTerm={this.state.searchTerm} getAllTweets={this.getAllTweets} handleInputChange={this.handleInputChange}/>
        <div id="error"></div>
        <BarDisplay percentage={this.state.average} lastSearchTerm={this.state.lastSearchTerm} loading={this.state.loading}/>
        <Loader/>
      </div>
      )
    }
  }
}

export default DragDropContext(HTML5Backend)(App)
