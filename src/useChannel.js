import {useContext, useEffect, useReducer, useState} from "react"
import Context from "./Context"

const useChannel = (topic, reducer, base) => {
  const socket = useContext(Context)
  const [state, dispatch] = useReducer(reducer, base)
  const [broadcast, setBroadcast] = useState(warning)

  useEffect(
    () => (
      join(socket, topic, dispatch, setBroadcast)
    ),
    [topic]
  )

  return [state, broadcast]
}

const join = (socket, topic, dispatch, setBroadcast) => {
  const channel = socket.channel(topic)

  channel.onMessage = (event, payload) => {
    dispatch({event, payload})
    return payload
  }
  channel.join()

  setBroadcast(
    () => (
      channel.push.bind(channel)
    )
  )

  return (() => channel.leave())
}

const warning = () => (
  () => console.error("useChannel: broadcast cannot be invoked before joining")
)

export default useChannel
