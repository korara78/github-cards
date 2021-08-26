import React from 'react';
import './style.css';
import axios from 'axios';

//const axios = require('axios').default;//


// review Wrap Up
// Sample usernames to search gaearon, sophiebits, sebmarkbage, bvaughn, monatheoctocat

/*const testData = [
  {
    name: "Dan Abramov",
    avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
    company: "Facebook"
  },
  {
    name: "Sophie Alpert",
    avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
    company: "Humu"
  },
  {
    name: "Sebastian Markbåge",
    avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4",
    company: "Facebook"
  }
];
*/

//Cardlist Component to convert an array of records into array of Card components
//Apply the map method to "parent App's props.profiles" into an array of Card elements.
//Using spread operator in the Card element, all properties of that object will become props for the component.
//React will process the array of element calls
//React will join the array of Card componets and auto render them all
//key prop is assigned to each profile called profile.id as recommended by React
const CardList = (props) => (
  <div>
    {props.profiles.map((
      profile //[<Card />, <Card />, <Card />,]//
    ) => (
      <Card key={profile.id} {...profile} /> //[React.createElement(), React.createElement(), React.createElement(),]//
    ))}
  </div>
);



//Card Component to render information about a GitHub Profile//
class Card extends React.Component {
  render() {
    //Capture all the props from the profile object for each instance of Card
    const profile = this.props;
    return (
      <div className="github-profile">
        <img className="headshot" src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

//Form Component to read input from the user
//initial state is an empty field for userName//
//async is used so we handle the event after the wait asynchronously (in order)
//event.preventDefault() prevents page from refreshing//
//use axios.get(url) with a URL from an API endpoint to get a promise which returns a response object. Inside the response object, there is data that is then assigned the value for userName.
//After user clicks Add Card, a setState call will pass in a userName value of empty string to reset the input box to blank again//


class Form extends React.Component {
  state = { userName: "" };
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );
    this.props.onSubmit(resp.data);
    this.setState({ userName: "" });
    //console.log(this.state.userName); to test is profile data is fetched//
  };
  render() {
    return (
      <div class="col-6 col-s-9">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.userName}
            onChange={(event) =>
              this.setState({ userName: event.target.value })
            } //onChange will allow the DOM to tell React an event occurred in this input so React should reflect it on the UI as well//
            //setState() enqueues changes to the component state and tells React that this component and its children need to be re-rendered with the updated state. Here it takes the userName value as a argument//
            //Test in developer tools the "input element" and observe the value inputted in real time//
            //Refs provide a way to access DOM nodes or React elements created in the render method.
            placeholder="GitHub username"
            ref={this.useNameInput}
            required
          />
          <button>Add Card</button>
        </form>
      </div>
    );
  }
}
//App component to manage the relation between all the other components
//This is an alternate to using React Constructors
//Render the Form and Cardlist profiles components in the top level as siblings to App//
//Notice "state" is an object on the instance. The profiles is a property.
//We leverage profiles at the parent level to share data between mult.components.
class App extends React.Component {
  state = {
    profiles: []
  };
  //invoke setState and pass a function and apply spread operator to spread the existing profiles ("prevState") and append the new "profileData" to it. Basically a concat.
  addNewProfile = (profileData) => {
    this.setState((prevState) => ({
      profiles: [...prevState.profiles, profileData]
    }));
  };
  render() {
    return (
      <div>
        <div className="header">{this.props.title}
        <h1>The GitHub Cards App</h1>
        </div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}





export default App;
