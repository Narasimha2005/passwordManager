import './index.css'

const StorageItem = props => {
  const {details, isPasswordsVisible, onDeletePassword} = props
  const {id, website, username, password, color} = details
  const ondeleteItem = () => {
    onDeletePassword(id)
  }

  return (
    <li className="main-box">
      <p className="small-logo" style={{backgroundColor: `${color}`}}>
        {website !== '' ? website[0].toUpperCase() : ''}
      </p>
      <div className="content-box">
        <p className="paragraph">{website}</p>
        <p className="paragraph">{username}</p>
        {isPasswordsVisible ? (
          <p className="paragraph">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars"
          />
        )}
      </div>
      <button type="button" onClick={ondeleteItem} data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete"
        />
      </button>
    </li>
  )
}
export default StorageItem
