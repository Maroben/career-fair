import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"

import Chip from "@material-ui/core/Chip"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Collapse from "@material-ui/core/Collapse"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"

const styles = (theme) => ({
	chips: {
		marginRight: theme.spacing.unit,
		marginBottom: theme.spacing.unit
	},
	container: {
		margin: theme.spacing.unit * 2,
		marginTop: 0,
		marginBottom: 0
	},
	header: {
		paddingLeft: 0,
		paddingRight: 0
	}
})

class ChipsSearchList extends Component {
	state = {
		isOpen: false
	}

	handleToggle = () => {
		const isOpen = !this.state.isOpen
		this.setState({ isOpen })
	}

	render() {
		const { isOpen } = this.state
		const { classes, items, labels, onDelete } = this.props

		return (
			<div className={classes.container}>
				{items.length > 0 && (
					<React.Fragment>
						<ListItem button onClick={this.handleToggle} className={classes.header}>
							<ListItemText secondary={`Ausgewählte ${labels[1]}: ${items.length}`} />
							{isOpen ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={isOpen} timeout="auto" unmountOnExit>
							{items.map((item) => (
								<Chip
									key={item}
									label={item}
									variant={"default"}
									className={classes.chips}
									onDelete={() => onDelete(labels[0], item)}
								/>
							))}
						</Collapse>
					</React.Fragment>
				)}
			</div>
		)
	}
}

ChipsSearchList.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChipsSearchList)
