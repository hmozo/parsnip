
const initialState={
  tasks: [],
  isLoading: false,
  error: null,
}


export default function tasks(state= initialState, action){
    switch(action.type){
      case 'CREATE_TASK':{
        return { 
          tasks: state.tasks.concat(action.payload) 
        };
      }
      case 'EDIT_TASK':{
        const { payload }= action;
        return{
          tasks: state.tasks.map(task=>{
            if(task.id === payload.id){
              return Object.assign({}, task, payload.params);
            }
            return task;
          })
        }
      }
      case 'FETCH_TASKS_SUCCEEDED':{
        return{ 
          tasks: action.payload.tasks, 
          isLoading:false
        };
      }
      case 'CREATE_TASK_SUCCEEDED':{
        return { 
          tasks: state.tasks.concat(action.payload) 
        };
      }
      case 'FETCH_TASKS_STARTED':{
        return{
          ...state, 
          isLoading: true,
        }
      }
      case 'FETCH_TASKS_FAILED': {
        return{
          ...state,
          isLoading: false,
          error: action.payload.error,
        }
      }

      default:
        return state;
  }

}
