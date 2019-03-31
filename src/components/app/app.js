import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';

import './app.css';

export default class  App extends Component  {

  id = 100;

  state = {
    todoData:  [
    this.createElement('Drink Coffee'),
    this.createElement('Make Awesome App'),
    this.createElement('Have a lunch'),
    this.createElement('Watch any film'),
    this.createElement('Go for a walk ouside'),
    ],
    term: '',
    filter: 'all' // all active done

  }

  createElement(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.id++
    }
  }

  deleteItem = (id) => {

    this.setState(({ todoData }) => {

      let arr = todoData.filter((item) => {
        return item.id !== id;
      });

      return {
        todoData: arr
      }
    })

  }

  addItem = (text) => {


    let addedItem = this.createElement(text);

    this.setState(({todoData}) => {

      let newArray = [...todoData, addedItem];
      return {
        todoData: newArray
      }
    })
  }

  toggleProparty(arr, id, propatry) {

    let idx = arr.findIndex((el) => el.id === id);

    let oldItem = arr[idx];

    let newItem = {...oldItem, [propatry]: !oldItem[propatry]};

    return [
    ...arr.slice(0, idx),
    newItem,
    ...arr.slice(idx + 1),
    ]  
  }

  onToggleDone = (id) => {

    this.setState(({todoData}) => {

      return {
        todoData: this.toggleProparty(todoData, id, 'done')
      }
    })

  }
  onToggleImportant = (id) => {
    this.setState(({todoData}) => {

      return {
        todoData: this.toggleProparty(todoData, id, 'important')
      }
    })
  }

  search(items, term) {

    if(term.length === 0) {
      return items; //if search empty
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })

  }

  onSearch = (term) => {

    this.setState({term})
  }

  filter(items, filter) {

    switch (filter) {
      case "all":
        return items;
       case 'active':
       return items.filter((item) => !item.done);
       case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
        break;
    }
  }
  onChangeFilter = (filter) => {
    this.setState({filter});
  }
  render() {

    let {todoData, term, filter} = this.state;
    let visibleItems = this.filter(this.search(todoData, term), filter);
    let doneItems = todoData.filter((el) => el.done).length;
    let leftItems = todoData.length - doneItems;
    let importants =todoData.filter((el) => el.important).length;

    return (
      <div className="todo-app">
      <AppHeader toDo={leftItems} done={doneItems} important={importants}/>
      <div className="top-panel d-flex">
      <SearchPanel
      onSearch={this.onSearch} 
      />
      <ItemStatusFilter
      filter={filter}
      onChangeFilter={this.onChangeFilter} 
      />
      </div>

      <TodoList 
      todos={visibleItems} 
      onDeleted={this.deleteItem}
      onToggleImportant={this.onToggleImportant}
      onToggleDone={this.onToggleDone}
      />
      <AddItem 
      onAddItem={ this.addItem }
      />
      </div>
      );
  }
};

