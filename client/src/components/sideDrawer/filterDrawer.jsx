import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import CheckboxList from "../lists/checkboxList"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
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
	const {
		classes,
		count,
		categories,
		activeCategories,
		tags,
		activeTags,
		onCheckboxSelect,
		onCheckboxReset,
		onClose
	} = props

	return (
		<div>
			<Typography
				className={classes.header}
				variant="body1"
			>{`${count} Unternehmen gefunden`}</Typography>
			<CheckboxList
				items={categories}
				activeItems={activeCategories}
				labels={["activeCategories", "Studiengänge"]}
				onSelect={onCheckboxSelect}
			/>
			<Divider variant="middle" />
			<CheckboxList
				items={tags}
				activeItems={activeTags}
				labels={["activeTags", "Kategorien"]}
				onSelect={onCheckboxSelect}
			/>
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
