import React from 'react';
import { fetchEateries } from '../../services/api-calls';
import { Link } from 'react-router-dom';

export default class RandomEatery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eatery: ''
    }
  }

  shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  componentDidMount = async () => {
    const resp = await fetchEateries();
    const eatery = this.shuffle(resp.restaurants)[0];
    this.setState({
      eatery: eatery
    })

  };

  render() {
    return (
      <>
        <div className="random-pick eatery">
          <h2>Random Pick for You</h2>
          <h3>{this.state.eatery.name}</h3>
          <p> <span>Address:</span> {this.state.eatery.address}</p>
          <p> <span>Category:</span> {this.state.eatery.category}</p>
          <p> <span>Price Range:</span> {this.state.eatery.price_range}</p>
          <Link id="detail-button"
            to={`/single-eatery/${this.state.eatery.id}`}> Details </Link>
        </div>
      </>
    )
  }
}