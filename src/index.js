import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';

// // idを持たなくて良い
// const initialState = {
//     tasks: []
// };

// function tasksReducer(state = initialState, action) {
//     switch(action.type) {
//         case 'ADD_TASK':
//             return {
//                 ...state,
//                 tasks: state.tasks.concat([action.payload.task]) // state自体に上書きすると、変な動作するかも
//             };
//         default:
//             return state;
//     }
// }

// // 第二引数 : Storeの初期値、セッションで事前にデータを保持している時などに利用
// // 第三引数 : Storeの機能を拡張するためのサードツール指定、applyMiddleware()も指定できる
// const store = createStore(tasksReducer);

// function handleChange() {
//     console.log(store.getState());
// }

// // unsubscribe()を実行すると解除される
// // subscribe()の戻り値はunsubscribe()
// const unsubscribe = store.subscribe(handleChange);
// console.log(unsubscribe);

// // ActionCreator
// const addTask = task => ({
//     type: 'ADD_TASK',
//     payload: {
//         task
//     }
// });

// console.log(store.getState());

// // Actionの発行
// store.dispatch(addTask('aaaa'));
// store.dispatch(addTask('bbbb'));

const initialState = {
    task: '',
    tasks: []
};

// Reducer
function tasksReducer(state = initialState, action) {
    switch (action.type) {
        case 'INPUT_TASK':
            return {
                ...state,
                task: action.payload.task
            };
        case 'ADD_TASK':
            return {
                ...state,
                tasks: state.tasks.concat([action.payload.task])
            };
        default:
            return state;
    }
}

// Store
const store = createStore(tasksReducer);

// ActionCreator---------
const inputTask = task => ({
    type: 'INPUT_TASK',
    payload: {
        task
    }
});

const addTask = task => ({
    type: 'ADD_TASK',
    payload: {
        task
    }
});
// ----------------------

// Component
function TodoApp({store}) {
    const {task, tasks} = store.getState();
    return (
        <div>
            <input type="text" onChange={e => store.dispatch(inputTask(e.target.value))} />
            <input type="button" value="add" onClick={() => store.dispatch(addTask(task))} />
            <ul>
                {
                    tasks.map(function(item, i){
                        return (
                            <li key={i}>{item}</li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

function renderApp(store) {
    render(
        <TodoApp store={store} />,
        document.getElementById('root')
    );
}

store.subscribe(() => renderApp(store));
renderApp(store);