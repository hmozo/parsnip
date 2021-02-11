import React, { Component } from 'react';
import TasksPage from './components/TasksPage'
import { connect } from 'react-redux'

import './App.css';

import { createTask, editTask } from './actions';
import { fetchTasks } from './actions'
import FlashMessage from './components/FlashMessage';


class App extends Component{

  componentDidMount(){
    this.props.dispatch(fetchTasks());
    //this.props.subscribe(()=>console.log('hola'));
    this.forceUpdate();
  }

  onCreateTask= ({ title, description })=>{
    this.props.dispatch(createTask({ title, description }));
    this.forceUpdate()
  }

  onStatusChange= (id, status)=>{
    this.props.dispatch(editTask(id, { status }));
    this.forceUpdate();
  }

  render(){
    console.log('props from App: ', this.props);
    return(
      <div className='container'>
        {this.props.error &&
          <FlashMessage message= {this.props.error} />
        }
        <TasksPage 
          tasks={this.props.tasks} 
          onCreateTask={this.onCreateTask}  
          onStatusChange={this.onStatusChange}
          isLoading={this.props.isLoading}
        />
      </div>
    )
  }
}

function mapStateToProps(state){
  const { tasks, isLoading, error }= state.tasks;
  return { tasks, isLoading, error }
}

export default connect(mapStateToProps)(App);
