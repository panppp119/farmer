import React from "react";
import { withTheme } from '@material-ui/core/styles';

class Sidebar extends React.Component {
  render() {
    return this.props.sidebar && (
      <div className='side-bar'>
        {/* <Box
          gridArea="sidebar"
          background="dark-3"
          width="small"
          animation={[
            { type: "fadeIn", duration: 300 },
            { type: "slideRight", size: "xlarge", duration: 150 }
          ]}
        >
          {["First", "Second", "Third"].map(name => (
            <Button key={name} href="#" hoverIndicator>
              <Box pad={{ horizontal: "medium", vertical: "small" }}>
                <Text>{name}</Text>
              </Box>
            </Button>
          ))}
        </Box> */}
      </div>
    )
  }
}

export default withTheme()(Sidebar)
