import React from 'react'
import './Counter.css'
import axios from 'axios';


export default class Counter extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      currentCount: '',
      everyState: [],
      error: false, // Add a flag to indicate if an error has occurred
    }
  }

  componentDidMount = () => {
    this.getCurrentState();
  };
  
  getCurrentState = () => {
    axios.get('/update')  
      .then(response => {
        const data = response.data;
        this.setState({ everyState: data, error: false })
        this.setState({ currentCount: this.state.everyState[this.state.everyState.length - 1].state })
      })
      .catch(() => {
        this.setState({ error: true })
        console.log('Error retrieving data');
      });
  };  

  // Add a new lifecycle method to retry the data fetch if an error has occurred
componentDidUpdate(prevProps, prevState) {
  if (prevState.error !== this.state.error && this.state.error === true) {
    this.getCurrentState();
  }
}
  

submit = (plusOrMinus) => {
  var payload;

  if (plusOrMinus === "plus"){
    payload = {
      currentCount: this.state.currentCount+1
    };
  }
  else {
    payload = {
      currentCount: this.state.currentCount-1
    };
  }

  axios({
    url: '/update',  
    method: 'PUT',  // Use a PUT request to update the count
    data: payload
  })

  .then(() => {
    console.log('Count has been updated on the server')
  })
  .catch(() => {
    console.log('Error updating count on the server')
  })
};



  increment = () => {
    const plusOrMinus = "plus"
    this.setState({
      currentCount: this.state.currentCount + 1
    });
    this.submit(plusOrMinus);
  }

  decrement = () => {
    const plusOrMinus = "minus"
    this.setState({
      currentCount: this.state.currentCount - 1
    });
    this.submit(plusOrMinus);
  }


  render(){

    return (
    <div>
      <div className="grid-container">
          <div className="grid-item-title">
            <h1 className="title">A Stateful Counter</h1>
          </div>
          <div className="grid-item grid-item-1">
              <button className="button" onClick={ this.increment }>Increment</button>
          </div>
          <div className="grid-item grid-item-2">
              <span className="number">{this.state.currentCount}</span>
          </div>
          <div className="grid-item grid-item-3">
              <button className="button" onClick={this.decrement}>Decrement</button>
          </div>
      </div>
    </div> 
    )
    }
  }
