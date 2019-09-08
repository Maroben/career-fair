import React, { useState } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import InputBase from "@material-ui/core/InputBase"
import Typography from "@material-ui/core/Typography"
import { IconButton } from "@material-ui/core"

import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import SearchIcon from "@material-ui/icons/Search"
import FilterIcon from "@material-ui/icons/FilterList"
import AccountIcon from "@material-ui/icons/Person"

import { fade } from "@material-ui/core/styles/colorManipulator"

const styles = (theme) => ({
	root: {
		width: "100%",
		marginBottom: theme.spacing(),
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
		marginRight: theme.spacing(2),
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
		width: theme.spacing(9),
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
		paddingTop: theme.spacing(),
		paddingRight: theme.spacing(),
		paddingBottom: theme.spacing(),
		paddingLeft: theme.spacing(10),
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

const SearchHeader = (props) => {
	const { classes, name, value, onSearch, onFilterSelect, user } = props

	const [search, setSearch] = useState(false)

	return (
		<AppBar position="sticky" className={classes.root}>
			<Toolbar>
				{!search && (
					<>
						<Typography className={classes.title} variant="h6" color="inherit" noWrap>
							{name}
						</Typography>
						<div className={classes.grow} />
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>

							<InputBase
								placeholder="Suche..."
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
							<IconButton
								aria-haspopup="true"
								edge="end"
								color="inherit"
								onClick={() => setSearch(!search)}
							>
								<SearchIcon />
							</IconButton>
							<IconButton
								aria-haspopup="true"
								edge="end"
								color="inherit"
								onClick={onFilterSelect}
							>
								<FilterIcon />
							</IconButton>
							{user && (
								<IconButton
									aria-haspopup="true"
									edge="end"
									color="inherit"
									component={Link}
									to={"/account"}
								>
									<AccountIcon />
								</IconButton>
							)}
						</div>
					</>
				)}
				{search && (
					<>
						<div className={`${classes.search} ${classes.searchActive}`}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<ClickAwayListener onClickAway={() => setSearch(false)}>
								<InputBase
									placeholder="Suche..."
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
						<IconButton
							aria-haspopup="true"
							edge="end"
							color="inherit"
							onClick={onFilterSelect}
						>
							<FilterIcon />
						</IconButton>
						{user && (
							<IconButton
								aria-haspopup="true"
								edge="end"
								color="inherit"
								component={Link}
								to={"/account"}
							>
								<AccountIcon />
							</IconButton>
						)}
					</>
				)}
			</Toolbar>
		</AppBar>
	)
}

SearchHeader.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchHeader)
