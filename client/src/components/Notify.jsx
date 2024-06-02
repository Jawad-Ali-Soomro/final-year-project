import React from 'react'
const notificationPanel = document.getElementById("notification-panel");

const Notify = () => {
  return ReactDOM.createPortal(
    <div>
      
    </div>,
    notificationPanel
  )
}

export default Notify
