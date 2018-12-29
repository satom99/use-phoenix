import React, {useEffect} from "react"
import PropTypes from "prop-types"
import {Socket} from "phoenix"
import Context from "./Context"

const Provider = ({path, params, children}) => {
  const socket = new Socket(path, {params})

  useEffect(() => socket.connect(), [params, path])

  return (
    <Context.Provider value={socket}>
      {children}
    </Context.Provider>
  )
}

Provider.defaultProps = {
  path: "",
  params: {}
}
Provider.propTypes = {
  path: PropTypes.string,
  options: PropTypes.object
}

export default Provider
