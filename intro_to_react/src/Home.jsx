import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <div>
        <div>
                <h1>
                    Count: {this.props.count}
                </h1>
                <button onClick={this.props.addToCount}>+</button>
        </div>
        <h1>
          HI! Welcom to my page, please log in:)
        </h1>
      </div>
    )
  }
}
