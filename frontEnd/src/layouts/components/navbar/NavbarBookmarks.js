import React from "react"
import {
  NavItem,
  NavLink,
  DropdownItem
} from "reactstrap"
import * as Icon from "react-feather";
import { connect } from "react-redux";
import {
  loadSuggestions,
  updateStarred
} from "../../../redux/actions/navbar/Index";

// a little function to help us with reordering the bookmarks
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

class NavbarBookmarks extends React.PureComponent {
  state = {
    showBookmarks: false,
    value: "",
    noSuggestions: false,
    isStarred: false,
    suggestions: [],
    starredItems: []
  }

  updateBookmarks = false

  handleBookmarksVisibility = () => {
    this.setState({
      showBookmarks: !this.state.showBookmarks,
      value: "",
      suggestions: [],
      noSuggestions: false,
      starred: null
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bookmarks.starred.length !== this.state.starredItems.length && this.updateBookmarks === true) {
      this.setState({ starredItems: this.props.bookmarks.starred })
      this.updateBookmarks = false
    }
  }

  componentDidMount() {
    let {
      bookmarks: { suggestions, starred },
      loadSuggestions
    } = this.props
    this.setState(
      {
        suggestions: suggestions,
        starredItems: starred
      },
      loadSuggestions()
    )
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const starredItems = reorder(
      this.state.starredItems,
      result.source.index,
      result.destination.index
    )

    this.setState({
      starredItems
    })
  }




  render() {
    let {
      bookmarks: { extraStarred, suggestions },
      sidebarVisibility,
      updateStarred,
      handleAppOverlay
    } = this.props

    const renderExtraStarred =
      extraStarred.length > 0
        ? extraStarred.map(i => {
          const IconTag = Icon[i.icon ? i.icon : null]
          return (
            <DropdownItem key={i.id} href={i.link}>
              <IconTag size={15} />
              <span className="align-middle ml-1">{i.title}</span>
            </DropdownItem>
          )
        })
        : null

    return (
      <div className="mr-auto float-left bookmark-wrapper d-flex align-items-center">
        <ul className="navbar-nav d-xl-none">
          <NavItem className="mobile-menu mr-auto">
            <NavLink
              className="nav-menu-main menu-toggle hidden-xs is-active"
              onClick={sidebarVisibility}
            >
              <Icon.Menu className="ficon" />
            </NavLink>
          </NavItem>
        </ul>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    bookmarks: state.navbar
  }
}

export default connect(mapStateToProps, { loadSuggestions, updateStarred })(
  NavbarBookmarks
)
