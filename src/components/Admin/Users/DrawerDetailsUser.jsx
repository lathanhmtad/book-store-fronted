import React, { useState } from 'react';
import { Button, Descriptions, Drawer, Radio, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawerDetails } from '../../../redux/slices/users/userSlice';
const DrawerDetailsUser = () => {
    const dispatch = useDispatch()
    const { showDrawerDetails: open, userDetailsWithId: userDetails } = useSelector(state => state.user)

    const items = [
        {
            key: '1',
            label : 'Id',
            children: userDetails.id
        },
        {
            key: '2',
            label : 'Email',
            children: userDetails.id
        },
        {
            key: '1',
            label : 'Id',
            children: userDetails.id
        },
        {
            key: '1',
            label : 'Id',
            children: userDetails.id
        },
        {
            key: '1',
            label : 'Id',
            children: userDetails.id
        },
        {
            key: '1',
            label : 'Id',
            children: userDetails.id
        },
        {
            key: '1',
            label : 'Id',
            children: userDetails.id
        },
        {
            key: '1',
            label : 'Id',
            children: userDetails.id
        },
        {
            key: '1',
            label : 'Id',
            children: userDetails.id
        },
    ]

    const onClose = () => {
        dispatch(closeDrawerDetails())
    };
    return (
        <Drawer
            title="User details"
            placement="left"
            closable={false}
            onClose={onClose}
            open={open}
        >
            {/* <Descriptions title="User Info" items={items} />; */}
        </Drawer>
    );
};
export default DrawerDetailsUser;