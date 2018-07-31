import React from 'react';
import ReactDOM from 'react-dom';
// import App from './index.jsx';
import AppTwo from './AppTwo.jsx';
const MENUS = [
  {
    id: 'find',
    order: 0,
    items: [
      {
        id: '__A__',
        submenu: [
          {
            id: 'find_in',
            other: 'stuff',
            submenu: []
          },
          {
            id: 'find_out',
            other: 'stuff',
            submenu: []
          }
        ]
      }
    ]
  },
  {
    id: 'create',
    order: 1,
    items: [
      {
        id: '__B__',
        submenu: [
          {
            id: 'find_first',
            other: 'stuff',
            submenu: []
          },
          {
            id: 'find_last',
            other: 'stuff',
            submenu: []
          }
        ]
      }
    ]
  },
  {
    id: 'bulk',
    order: 2,
    items: [
      {
        id: '__C__',
        submenu: []
      }
    ]
  },
  {
    id: 'links',
    order: 3,
    items: [
      {
        id: '__D__',
        submenu: []
      }
    ]
  }
]
ReactDOM.render(<AppTwo MENUS={MENUS}/>, document.getElementById('app'));
// ReactDOM.render(<App/>, document.getElementById('app'));