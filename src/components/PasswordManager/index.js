import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import StorageItem from '../StorageItem'
import './index.css'

const colors = [
  '#7683cb',
  '#f59e0b',
  '#10b981',
  '#f97316',
  '#14b8a6',
  '#b91c1c',
]
class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    isPasswordsVisible: false,
    passwordsList: [],
    searchInput: '',
  }

  onWebsiteChange = event => {
    this.setState({website: event.target.value})
  }

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onsearchInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, username, password, passwordsList} = this.state
    const newObject = {
      id: uuidv4(),
      website,
      username,
      password,
      color: colors[Math.floor(Math.random() * 6)],
    }
    const newPasswordsList = [...passwordsList, newObject]
    this.setState({passwordsList: newPasswordsList})
  }

  onChangeShowPasswords = () => {
    this.setState(prevState => ({
      isPasswordsVisible: !prevState.isPasswordsVisible,
    }))
  }

  onDeletePassword = givenId => {
    const {passwordsList} = this.state
    const newPasswordsList = passwordsList.filter(eachItem => {
      if (eachItem.id !== givenId) {
        return true
      }
      return false
    })
    this.setState({passwordsList: newPasswordsList})
  }

  render() {
    const {
      website,
      username,
      password,
      isPasswordsVisible,
      passwordsList,
      searchInput,
    } = this.state
    const filteredList = passwordsList.filter(eachItem => {
      if (eachItem.website.toLowerCase().includes(searchInput.toLowerCase())) {
        return true
      }
      return false
    })
    return (
      <div className="container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="upper-container">
          <img className="upper-container-image" alt="password manager" />
          <form className="form-container" onSubmit={this.onAddPassword}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="form-input-container">
              <img
                className="label-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                className="input-field"
                type="text"
                placeholder="Enter Website"
                value={website}
                onChange={this.onWebsiteChange}
              />
            </div>
            <div className="form-input-container">
              <img
                className="label-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                className="input-field"
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={this.onUsernameChange}
              />
            </div>
            <div className="form-input-container">
              <img
                className="label-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                className="input-field"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.onPasswordChange}
              />
            </div>
            <button type="submit" className="button">
              Add
            </button>
          </form>
        </div>
        <div className="lower-container">
          <div className="search-container">
            <div style={{display: 'flex', alignItems: 'center'}}>
              <h1 className="passwords-heading">Your Passwords</h1>
              <p className="count">{passwordsList.length}</p>
            </div>
            <div className="search-box">
              <img
                className="search-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                className="search-field"
                value={searchInput}
                onChange={this.onsearchInputChange}
              />
            </div>
          </div>
          <hr style={{border: 'solid #b6c3ca 1px', width: '100%'}} />
          <div className="show-passwords">
            <input
              type="checkbox"
              id="showcheckbox"
              className="checkbox"
              onChange={this.onChangeShowPasswords}
            />
            <label htmlFor="showcheckbox" className="show-passwords-heading">
              Show Passwords
            </label>
          </div>
          {filteredList.length === 0 ? (
            <>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords-image"
              />
              <p className="no-passwords-heading">No Passwords</p>
            </>
          ) : (
            <ul className="list-container">
              {filteredList.map(eachItem => (
                <StorageItem
                  key={eachItem.id}
                  details={eachItem}
                  isPasswordsVisible={isPasswordsVisible}
                  onDeletePassword={this.onDeletePassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default PasswordManager
