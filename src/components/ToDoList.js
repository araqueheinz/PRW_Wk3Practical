import React, { Component } from 'react';



class DisplayList extends Component {
  render() {
    return (
      <div className="DisplayList">
       <li key={this.props.id} className="list">
        <span>Task Name: {this.props.val.task} </span>
        <button className="" onClick={this.props.delMe}>Delete</button>
        <button className="" onClick={this.props.done}>Done</button>
      </li>
      </div>
    );
  }
}

export default DisplayList;