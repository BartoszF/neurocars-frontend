import React from 'react';
import { Select } from 'antd';

export const TrackSelect = (props) => {
    let tracks = props.tracks;

    const getOptions = () => {
        return tracks.map(track => {
            return <Select.Option key={track.id} value={""+track.id}>{track.name}</Select.Option>
        })
    }

    return <Select placeholder={'Track'} label={props.label} onSelect={props.onChange}>
        {getOptions()}
    </Select>
};