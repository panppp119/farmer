import React from 'react'

class Image extends React.Component {
  static defaultProps = {
    url: 'https://placehold.it/100x100',
    name: 'image',
    width: 'auto',
    height: '48px',
    padding: 0,
    margin: 0
  }

  render () {
    const { url, name, width, height, padding, margin } = this.props

    const style = {
      display: 'flex',
      width,
      padding,
      ...margin
    }

    return (
      <div className="image" style={style}>
        <img src={url} alt={name} style={{ height, margin: 'auto' }} />
      </div>
    )
  }
}

export default Image
