import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import CheckboxList from "../lists/checkboxList"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const styles = (theme) => ({
	button: {
		margin: theme.spacing.unit
	},
	header: {
		margin: theme.spacing.unit * 2
	}
})

const FilterDrawer = (props) => {
	const { classes, filterData, onCheckboxSelect, onCheckboxReset, onClose } = props
	const { all, active, labels } = filterData.filters
	return (
		<div>
			<Typography className={classes.header} variant="body1">{`${
				filterData.filterCount
			} Unternehmen gefunden`}</Typography>

			{labels.map((label) => (
				<CheckboxList
					key={label[0]}
					items={all[label[0]]}
					activeItems={active[label[0]]}
					labels={label}
					onSelect={onCheckboxSelect}
				/>
			))}

			<Button className={classes.button} onClick={onCheckboxReset}>
				Reset
			</Button>
			<Button color="primary" className={classes.button} onClick={onClose}>
				Apply
			</Button>
		</div>
	)
}

FilterDrawer.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FilterDrawer)
