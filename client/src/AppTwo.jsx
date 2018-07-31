import React from 'react';

class AppTwo extends React.Component {
  constructor(props) {
    super(props)
      this.state={
         menus: [],
         submenu: [],
         selectedMenu: {}
      }
      this. handleSelectedMenu = this.handleSelectedMenu.bind(this)
      this. handleSelectedSubmenu = this.handleSelectedSubmenu.bind(this)
  }

  componentDidMount() {
    this.setState(({ menus, submenu, selectedMenu }, { MENUS }) => {
      return {
        menus: [...menus, ...MENUS],
        submenu: [...submenu, ...MENUS[0].items[0].submenu],
        selectedMenu: Object.assign(selectedMenu, MENUS[0]),
      }
    })
  }

  handleSelectedMenu(e, menu) {
    this.setState(state => state.selectedMenu = menu)
  }

  handleSelectedSubmenu(e, submenuUpdate) {
    this.setState(state => state.submenu = submenuUpdate)
  }

  render() {
    return (
      <div className="main-container">
        <NavBar menus={this.state.menus} handleSelectedMenu={this.handleSelectedMenu}/>
        <MenuView >
          <MenuDropDown selectedMenu={this.state.selectedMenu} handleSelectedSubmenu={this.handleSelectedSubmenu}/>
          <MenuDropDown selectedMenu={this.state.submenu} handleSelectedSubmenu={this.handleSelectedSubmenu}/>
        </MenuView>
      </div>
    )
  }
}

const MenuDropDown = ({ selectedMenu, handleSelectedSubmenu }) => (
  <div>
    <h2>MenuDropDown</h2>
    <h5>{selectedMenu.id && selectedMenu.id}</h5>
  {
    selectedMenu.items ? (
    <select name="menu-drop-down" className={"dropDownSelect"} onClick={e => handleSelectedSubmenu(e, selectedMenu.items[0].submenu)}>
      {selectedMenu.items.map(({ id }) => {
          return <option key={id} value={`${id}`}>{id}</option>
        }
      )}
    </select>
    ) : Array.isArray(selectedMenu) ? (
      <div>
        <h3>MenuDropDownSubmenu</h3>
        <h5>{
          selectedMenu.reduce((acc, submenu) => {
            acc += `${submenu.id} - ${submenu.other} `
            return acc
          }, '')
        }</h5>
      <select name="menu-drop-down-submenu" className={"dropDownSelect submenu"} onClick={e => handleSelectedSubmenu(e, selectedMenu.submenu)}>
        {selectedMenu.map(({ id }) => {
            return <option key={id} value={`${id}`}>{id}</option>
          }
        )}
     </select>
    </div>
    ) : (
      <span>Loading...</span>
    )
  }
  </div>
)

const NavBar = ({menus, handleSelectedMenu}) => (
  <div className="nav-bar">
    { menus.map(menu => <input key={menu.order} type="button" className="menu-button" value={`${menu.id}`} onClick={e => handleSelectedMenu(e, menu) }/>)}
  </div>
)

class MenuView extends React.PureComponent {
  render(){
    return(
      <div className="user-modal-content">
        <h1>Menu</h1>
        {this.props.children}
      </div>
    )
  }
}

export default AppTwo;