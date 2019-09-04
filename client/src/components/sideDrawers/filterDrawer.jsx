import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import CheckboxList from "../lists/checkboxList"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const styles = (theme) => ({
	root: {
		width: 300
	},
	desktop: {
		[theme.breakpoints.up("md")]: {
			display: "none"
		}
	},
	button: {
		margin: theme.spacing()
	},
	header: {
		margin: theme.spacing(2)
	}
})

const FilterDrawer = (props) => {
	const { classes, filterData, onCheckboxSelect, onCheckboxReset, onClose } = props
	const { displayed, active, labels } = filterData.filters

	return (
		<div className={classes.root}>
			<Typography
				className={classes.header}
				variant="body1"
			>{`${filterData.filterCount} Unternehmen gefunden`}</Typography>

			{labels.map((label) => (
				<CheckboxList
					key={label[0]}
					items={displayed[label[0]]}
					activeItems={active[label[0]]}
					labels={label}
					onSelect={onCheckboxSelect}
				/>
			))}

			<Button className={classes.button} onClick={onCheckboxReset}>
				Reset
			</Button>
			<Button
				color="primary"
				className={`${classes.button} ${classes.desktop}`}
				onClick={onClose}
			>
				Apply
			</Button>
		</div>
	)
}

FilterDrawer.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FilterDrawer)
