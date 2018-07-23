import React, { Component } from 'react';



class DoneList extends Component {
  render() {
    return (
      <div className="DoneList">
       <li key={this.props.id} className="list">
        <span>Task Name: {this.props.val.task} </span>
        <button className="" onClick={this.props.delMe}>Delete</button>
      </li>
      </div>
    );
  }
}

export default DoneList;