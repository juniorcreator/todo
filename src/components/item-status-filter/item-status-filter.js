import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  buttons = [
  {name: 'all', label: 'All'},
  {name: 'active', label: 'Active'},
  {name: 'done', label: 'Done'},
  ];

  render() {

    let {filter, onChangeFilter} = this.props;
    let buttons = this.buttons.map(({name, label}) => {
    let isActive = name === filter;
    let clazz = isActive ? 'btn-info' : 'btn-info-secondary'

      return (
        <button type="button"
        className={`btn ${clazz}`}
        key={name}
        onClick={() => onChangeFilter(name)}
        >{label}</button>
        )
    })
    return (
      <div className="btn-group">
      {buttons}
      </div>
      );
  }
} 


