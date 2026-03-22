import React from 'react';
import { Link } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import NursingCareBookings from './NursingCareBookings/NursingCareBookings';

const AllBookings = () => {
    return (
        <div className='p-6'>
            <div className='mb-8'>
                <h1 className='text-3xl'>All Bookings Here</h1>
                <p>Explore all bookings </p>
            </div>
            <div>
                <Tabs>
                    <TabList>
                        <Tab>Nursing Care</Tab>
                        <Tab>Home Care</Tab>
                        <Tab>Physiotherapy</Tab>
                    </TabList>

                    <TabPanel>
                        <NursingCareBookings></NursingCareBookings>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Alll</h2>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default AllBookings;