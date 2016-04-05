React            = require 'react'
MaterialModal    = require 'material-ui/lib/dialog'
Icon             = require '../icon/icon'
intl             = require 'react-intl'
FormattedMessage = intl.FormattedMessage
SearchInput      = require './search-input'
SearchActions    = require '../../action/search-actions'
EndpointActions  = require '../../action/endpoint-actions'
Tabs             = require 'material-ui/lib/tabs/tabs'
Tab              = require 'material-ui/lib/tabs/tab'

class SearchModal extends React.Component

  @contextTypes:
    getStore: React.PropTypes.func.isRequired
    executeAction: React.PropTypes.func.isRequired

  render: =>
    style = {}
    if @props.modalIsOpen == false
      style.left = "-400%"
    else
      style.right = "0px"

    <div style={style}
      className="search-modal">
      <div className="row">
        <div className="small-12 medium-6 medium-offset-3 columns cursor-pointer search-header">
          <span className="search-header__back-arrow" onClick={@props.closeModal}>
            <Icon img={'icon-icon_arrow-left'}/>
            <span className="search-header-separator"/>
          </span>
          <Tabs
            inkBarStyle={{display: "none"}}
            tabItemContainerStyle={{backgroundColor: "#eef1f3", lineHeight: "18px", marginLeft: "28px", width: "calc(100% - 28px)"}}
            value={@props.selectedTab}
          >
          {@props.children}
          </Tabs>
        </div>
      </div>
    </div>

module.exports = SearchModal
