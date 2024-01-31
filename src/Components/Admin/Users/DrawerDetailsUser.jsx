import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Badge, Descriptions, Drawer, Image, Space, Tag } from 'antd';

import { closeDrawerDetails } from '../../../redux/slices/users/userSlice';

const DrawerDetailsUser = () => {
    const { showDrawerDetails: open, userDetailsWithId: userDetails } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const items = [
        {
            key: 'id',
            label: 'Id',
            children: userDetails.id
        },
        {
            key: 'email',
            label: 'Email',
            children: userDetails.email
        },
        {
            key: 'fullName',
            label: 'Full name',
            children: userDetails.fullName
        },
        {
            key: 'enabled',
            label: 'Status',
            children: <Badge status={userDetails.enabled ? 'success' : 'error'} text={userDetails.enabled ? 'Enabled' : 'Disabled'} />
        },
        {
            key: 'roles',
            label: 'Roles',
            children: <Space size={[0, 8]} wrap>
                {userDetails.roles?.map(item => <Tag key={item.id}>{item.name}</Tag>)}
            </Space>
        },
        {
            key: 'createdDate',
            label: 'Created date',
            children: userDetails.createdDate
        },
        {
            key: 'createdBy',
            label: 'Created by',
            children: userDetails.createdBy
        },
        {
            key: 'lastModifiedDate',
            label: 'Last modified date',
            children: userDetails.lastModifiedDate
        },
        {
            key: 'lastModifiedBy',
            label: 'Last modified by',
            children: userDetails.lastModifiedBy
        },
        {
            key: 'photo',
            label: 'Photo',
            children: <Image
                width={100}
                src={userDetails.photo}
            />
        },
    ]

    const onClose = () => {
        dispatch(closeDrawerDetails())
    };
    return (
        <Drawer
            title="User details"
            placement="left"
            closable={true}
            onClose={onClose}
            size='large'
            open={open}
        >
            <Descriptions
                bordered
                layout='vertical'
                title="" items={items} />;
        </Drawer>
    );
};
export default DrawerDetailsUser;