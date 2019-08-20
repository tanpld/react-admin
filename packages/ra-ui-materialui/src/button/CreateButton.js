import React from 'react';
import PropTypes from 'prop-types';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import {
    Fab,
    createStyles,
    makeStyles,
    useMediaQuery,
} from '@material-ui/core';
import ContentAdd from '@material-ui/icons/Add';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { useTranslate } from 'ra-core';

import Button from './Button';

const useStyles = makeStyles(theme =>
    createStyles({
        floating: {
            color: theme.palette.getContrastText(theme.palette.primary.main),
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 60,
            left: 'auto',
            position: 'fixed',
            zIndex: 1000,
        },
        floatingLink: {
            color: 'inherit',
        },
    })
);

const CreateButton = ({
    basePath = '',
    className,
    label = 'ra.action.create',
    icon = <ContentAdd />,
    ...rest
}) => {
    const classes = useStyles();
    const translate = useTranslate();
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return isSmall ? (
        <Fab
            component={Link}
            color="primary"
            className={classnames(classes.floating, className)}
            to={`${basePath}/create`}
            aria-label={label && translate(label)}
            {...rest}
        >
            {icon}
        </Fab>
    ) : (
        <Button
            component={Link}
            to={`${basePath}/create`}
            className={className}
            label={label}
            {...rest}
        >
            {icon}
        </Button>
    );
};

CreateButton.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.element,
};

const enhance = onlyUpdateForKeys(['basePath', 'label', 'translate']);
export default enhance(CreateButton);
