const Notification = ({ type, message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type === 'error' ? 'error' : 'success'}>
      {message}
    </div>
  )
}

export default Notification