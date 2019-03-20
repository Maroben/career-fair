import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Checkbox from "@material-ui/core/Checkbox"
import Collapse from "@material-ui/core/Collapse"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"

const styles = (theme) => ({
	root: {
		width: "100%",
		minWidth: 220,
		maxWidth: 360
	},
	pos: {
		paddingTop: 0,
		paddingBottom: 0
	}
})

class CheckboxList extends Component {
	state = {
		isOpen: false
	}

	handleToggle = () => {
		const isOpen = !this.state.isOpen
		this.setState({ isOpen })
	}

	render() {
		const { classes, noMax, items, activeItems, labels, onSelect } = this.props
		const { isOpen } = this.state
		if (noMax) {
			classes.root = ""
		}

		return (
			<React.Fragment>
				<ListItem button onClick={this.handleToggle} className={classes.root}>
					<ListItemText primary={labels[1]} />
					{isOpen ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={isOpen} timeout="auto" unmountOnExit>
					{items.map((item) => (
						<ListItem
							key={item}
							className={classes.pos}
							onClick={() => onSelect(labels[0], item)}
							role={undefined}
							button
						>
							<Checkbox
								checked={activeItems.indexOf(item) > -1}
								tabIndex={-1}
								disableRipple
							/>
							<ListItemText primary={item} />
						</ListItem>
					))}
				</Collapse>
			</React.Fragment>
		)
	}
}

CheckboxList.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CheckboxList)
