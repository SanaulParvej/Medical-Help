import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MyNursingCareBookings from './MyNursingCareBookings';
import MyHomeCareBookings from './MyHomeCareBookings';

const MyBookings = () => {
    return (
        <div className='p-6'>
            <div className='mb-8'>
                <h1 className='text-3xl'>Your Bookings Here</h1>
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
                        <MyNursingCareBookings></MyNursingCareBookings>
                    </TabPanel>
                    <TabPanel>
                        <MyHomeCareBookings/>
                    </TabPanel>
                    <TabPanel>
                        <h2>Alll</h2>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default MyBookings;
