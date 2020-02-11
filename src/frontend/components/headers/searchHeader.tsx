import React, { useState } from "react"
import { Link } from "react-router-dom"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import {
    AppBar,
    Toolbar,
    Typography,
    InputBase,
    IconButton,
    ClickAwayListener
} from "@material-ui/core"

import SearchIcon from "@material-ui/icons/Search"
import FilterIcon from "@material-ui/icons/FilterList"
import AccountIcon from "@material-ui/icons/Person"

import { fade } from "@material-ui/core/styles/colorManipulator"

const styles = (theme: Theme) =>
    createStyles({
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

interface Props extends WithStyles<typeof styles> {
    title: string
    query: string
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
    onFilterSelect: () => void
}

const SearchHeader = (props: Props) => {
    const { classes, title, query, onSearch, onFilterSelect } = props

    const [search, setSearch] = useState(false)

    return (
        <AppBar position="sticky" className={classes.root}>
            <Toolbar>
                {!search && (
                    <>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            {title}
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>

                            <InputBase
                                placeholder="Suche..."
                                value={query}
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
                                    value={query}
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
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(SearchHeader)
