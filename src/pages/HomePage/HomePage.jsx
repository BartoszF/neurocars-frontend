import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl.macro';
import { observer } from 'mobx-react';
import useStores from '../../useStores';
import { Dashboard } from '../Dashboard/Dashboard';


export const HomePage = observer((props) => {
    const {userStore} = useStores();

    return (
        userStore.authenticated ? <Dashboard /> :
        <h2><FormattedMessage id="app.title" defaultMessage="NeuroCars" /></h2>
    )
});