import React from 'react';
import { FormattedMessage } from 'react-intl.macro';


export const HomePage = (props) => {

    return (
        <h2><FormattedMessage id="app.title" defaultMessage="NeuroCars" /></h2>
    )
}