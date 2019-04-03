import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import InputBase from "@material-ui/core/InputBase"
import Button from "@material-ui/core/Button"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import SearchIcon from "@material-ui/icons/Search"
import { fade } from "@material-ui/core/styles/colorManipulator"

const styles = (theme) => ({
	root: {
		width: "100%",
		marginBottom: theme.spacing.unit,
		[theme.breakpoints.up("md")]: {
			marginLeft: 300,
			width: `calc(100% - ${300}px)`
		}
	},
	grow: {
		flexGrow: 1
	},
	title: {
		display: "block",
		width: "100%"
	},
	search: {
		display: "none",
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginRight: theme.spacing.unit * 2,
		marginLeft: 0,
		[theme.breakpoints.up("md")]: {
			display: "block"
		}
	},
	searchActive: {
		display: "block",
		width: "100%"
	},
	searchIcon: {
		width: theme.spacing.unit * 9,
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	inputRoot: {
		color: "inherit",
		width: "100%"
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: 200
		}
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex"
		}
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none"
		}
	}
})

class SearchHeader extends Component {
	state = {
		isSearching: false
	}

	handleClickAway = () => {
		this.setState({ isSearching: false })
	}

	handleSearchSelect = () => {
		this.setState({ isSearching: !this.state.isSearching })
	}

	render() {
		const { isSearching } = this.state
		const { classes, name, value, onSearch, onFilterSelect } = this.props

		return (
			<AppBar position="sticky" className={classes.root}>
				<Toolbar>
					{!isSearching && (
						<React.Fragment>
							<Typography
								className={classes.title}
								variant="h6"
								color="inherit"
								noWrap
							>
								{name}
							</Typography>
							<div className={classes.grow} />
							<div className={classes.search}>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>

								<InputBase
									placeholder="Search…"
									value={value}
									autoFocus={true}
									onChange={onSearch}
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput
									}}
								/>
							</div>

							<div className={classes.sectionMobile}>
								<Button
									aria-haspopup="true"
									onClick={this.handleSearchSelect}
									color="inherit"
								>
									Search
								</Button>
								<Button
									aria-haspopup="true"
									onClick={onFilterSelect}
									color="inherit"
								>
									Filter
								</Button>
							</div>
						</React.Fragment>
					)}
					{isSearching && (
						<React.Fragment>
							<div className={`${classes.search} ${classes.searchActive}`}>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<ClickAwayListener onClickAway={this.handleClickAway}>
									<InputBase
										placeholder="Search…"
										value={value}
										autoFocus={true}
										onChange={onSearch}
										classes={{
											root: classes.inputRoot,
											input: classes.inputInput
										}}
									/>
								</ClickAwayListener>
							</div>
							<Button aria-haspopup="true" onClick={onFilterSelect} color="inherit">
								Filter
							</Button>
						</React.Fragment>
					)}
				</Toolbar>
			</AppBar>
		)
	}
}

SearchHeader.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchHeader)
