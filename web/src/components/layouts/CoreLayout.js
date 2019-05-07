import React from 'react'
import Helmet from 'react-helmet'

import MainBar from 'components/bars/MainBar'
import MainView from 'components/views/MainView'

class CoreLayout extends React.Component {

  render () {
    return (
      <div className='corelayout'>
        <MainBar />

        <Helmet title="The Farming" />

        <MainView>
          {this.props.children}
        </MainView>
      </div>
    )
  }
}

export default CoreLayout
