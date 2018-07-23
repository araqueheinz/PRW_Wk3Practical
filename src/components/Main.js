import React, { Component } from 'react';
import ToDoList from './ToDoList'
import DoneList from './DoneList'


class Main extends Component {

////////////////////
//1. Create State //
////////////////////

  state ={
    toDoList: [
        {
            task:'Study',
        },

        {
            task:'Clean Car',
        }
    ],

    doneList:[
        {
            task: 'Exercise'
        },

        {
            task: 'Take the dog out'
        }
    ]

  };

/////////////////
// References  //
/////////////////

 taskRef = React.createRef();

//////////////////////////////////////////////////////////////////                                                 
//2.  Use componentDidMount to store the array to localStorage. //
//////////////////////////////////////////////////////////////////

componentDidMount() {
    //check if there are values in local storage
    if(localStorage.getItem('toDoList') && localStorage.getItem('doneList')) {
      //declare a var to read the data as string and then convert to JSON
      let toDoList = JSON.parse(localStorage.getItem('toDoList'))
      //declare a var to read the data as string and then convert to JSON
      let doneList = JSON.parse(localStorage.getItem('doneList'))
      //Updates the state with new var
      this.setState({toDoList: toDoList})
      //Updates the state with new var
      this.setState({doneList: doneList})
    }
   
  }

/*
/////////////////////////////////////////////////////
3.  Create a function to add the new task.         //
    Add validation,                                //
    use localStorage and reset the form.           //                         
/////////////////////////////////////////////////////   
*/

  addTask = event =>{
        event.preventDefault()
        //save the value of the task input
        const newTask = this.taskRef.current.value
        //Verify the input is not left blank
        if(newTask === ''){
            alert('Please enter a task')
            return false;
        }
        //Save the state and new task value in a new array 
        const toDoList = [...this.state.toDoList, {task: newTask}]
        //set the state with the new todoList
        this.setState({toDoList})
        //reset form
        localStorage.setItem('toDoList', JSON.stringify(toDoList))
        event.target.reset();
    }  
    
///////////////////////////////////////////////
//4. Create a function to delete the         //
//   list item and update localStorage.      //
///////////////////////////////////////////////

    removeToDo = key =>{
        console.log(key)
        let toDoList = this.state.toDoList
        let newToDoList = [...toDoList.slice(0,key), ...toDoList.slice(key+1)]
        this.setState({toDoList: newToDoList})
        localStorage.setItem('toDoList', JSON.stringify(newToDoList))
    }

    removeDone = key =>{
        console.log(key)
        let doneList = this.state.doneList
        let newDoneList = [...doneList.slice(0,key), ...doneList.slice(key+1)]
        this.setState({doneList: newDoneList})
        localStorage.setItem('doneList', JSON.stringify(newDoneList))
    }

    ///////////////////////////////////////////////
    //5. Create a function to move the           //
    //   to do item to done                      //
    ///////////////////////////////////////////////

    addToDone = key =>{
        console.log(key)
        const toDoList = this.state.toDoList
        const item = toDoList[key]
        console.log(item)
        const doneList = [...this.state.doneList, item]
        this.setState({doneList})
        localStorage.setItem('doneList', JSON.stringify(doneList))
        this.removeToDo(key)
    }


  render() {

    let myToDo = this.state.toDoList.map((element, i) =>{
        return <ToDoList val={element} key={i} delMe={() =>this.removeToDo(i)} done={() => this.addToDone(i)} />
      })

      let myDone = this.state.doneList.map((element, i) =>{
        return <DoneList val={element} key={i} delMe={() =>this.removeDone(i)} />
      })


    return (
      <div className="Main" style={style.container}>
         <form  onSubmit={this.addTask}>
            <p>
                <label>Task</label>
                <input ref={this.taskRef} type="text" name="taskName"/>
                <button type="submit">Add Task +</button>
            </p>
        </form> 

            <section> 
                <h2> To do list </h2>
                <ul>{myToDo}</ul>
            </section>

            <section> 
            <h2> Done </h2>
            <ul>{myDone}</ul>
            </section>
      </div>
    );
  }
}

export default Main;

const style ={

    container: {
      padding: 0,
      boxSizing: 'border-box',
      backgroundImage: ' url(' + require('../images/task.jpg') + ')',
      backgroundSize: 'cover',
      width: '800px',
      height: '800px',
      margin: '0 auto',
  
    },
    myHeader: {
      padding: '10px',
    },
    myH2:{
      marginLeft: '10px',
      color:'white',
    },
    formStyle:{
      marginLeft: '40px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgb(17, 149, 173, 0.7)',
      borderRadius: '10px',
      width:'200px'
    },
    labelStyle:{
      color: 'black',
      marginLeft: 15
    },
    inputStyle: {
      marginLeft: 5,
      width: 100,
    },
    buttonStyle: {
      width: 50,
      marginLeft: 5,
      marginTop: 10,
    },
    ulStyle:{
      marginLeft:'35px;',
  
    }
  
  }