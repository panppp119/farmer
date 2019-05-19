import React from 'react'
import { Message, Transition } from 'semantic-ui-react'

class FlashMessage extends React.Component {
  render () {
    const { content, type, mount } = this.props

    return (
      <div className="flash-message">
        <Transition.Group animation='fade down' duration={500}>
          {mount &&
            <Message
              success={type === 'success'}
              error={type === 'error'}
              content={content}
            />
          }
        </Transition.Group>
      </div>
    )
  }
}

export default FlashMessage
