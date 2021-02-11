import * as api from '../api';

let _id= 1;

export function uniqueId(){
    let lastIdTask= api.fetchTasks()
        .then(resp=>{
            return resp.data.length;
        })
    _id= lastIdTask+1;
    return _id;
}

/*
export function createTask({ title, description }){
    return {
        type: 'CREATE_TASK',
        payload: {
            id: uniqueId(),
            title,
            description,
            status: 'Unstarted',
        }
    }
}
*/

function createTaskSucceeded(task){
    return {
        type: 'CREATE_TASK_SUCCEEDED',
        payload: {
            task,
        },
    }
}

export function createTask({title, description, status='Unstarted'}){
    return dispatch=>{
        api.createTask({ title, description, status })
            .then(resp=>{
                dispatch(createTaskSucceeded(resp.data));
            })
    }
}

export function editTask(id, params= {}){
    return{
        type: 'EDIT_TASK',
        payload: {
            id,
            params
        }
    }
}

function fetchTasksSucceeded(tasks){
    return{
        type: 'FETCH_TASKS_SUCCEEDED',
        payload:{
            tasks
        }
    }
}

function fetchTasksStarted(){
    return{
        type: 'FETCH_TASKS_STARTED',
    }
}

function fetchTasksFailed(error){
    return{
        type: 'FETCH_TASKS_FAILED',
        payload:{
            error,
        },
    };
}

export function fetchTasks(){
    return dispatch=>{

        dispatch(fetchTasksStarted());

        api.fetchTasks()
            .then(resp=>{
            //    setTimeout(() => {
            //        dispatch(fetchTasksSucceeded(resp.data));
            //    }, 2000);
            throw new Error('FakeError: Unable to fetch tasks');
            })
            .catch(err=>{
                dispatch(fetchTasksFailed(err.message));
            })
    }
}





