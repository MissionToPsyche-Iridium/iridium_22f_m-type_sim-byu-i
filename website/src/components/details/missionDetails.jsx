import React, { useState } from 'react';
import { Card } from 'antd';

const MissionDetails = () => {
  const missionStages = [
    {
      name: 'Launch Psyche',
      date: 'Oct 5, 2023',
      content: 'This would contain information about the initial launch of the Psyche spacecraft from Earth.'
    },
    {
      name: 'Separation from Rocket',
      date: 'Oct 5, 2023',
      content: 'This would contain information about when the Psyche spacecraft separates from its launch vehicle.'
    },
    {
      name: 'Initial Checkout',
      date: 'Oct 5, 2023',
      content: 'This would contain information about the initial systems checkout and commissioning phase.'
    },
    {
      name: 'Propulsion Checkout',
      date: 'Oct 8, 2023',
      content: 'This would contain information about testing the Hall-effect thrusters and propulsion system.'
    },
    {
      name: 'Active Science Instrument Checkout',
      date: 'Dec 12, 2023',
      content: 'This would contain information about verifying all scientific instruments are functioning properly.'
    },
    {
      name: 'Cruise 1 to Mars',
      date: 'Jan 13, 2024',
      content: 'This would contain information about the first cruise phase toward Mars for gravity assist.'
    },
    {
      name: 'Mars Gravity Assist',
      date: 'May, 2026',
      content: 'This would contain information about the spacecraft using Mars gravity to boost its trajectory.'
    },
    {
      name: 'Cruise 2 to 16-Psyche',
      date: 'May, 2026',
      content: 'This would contain information about the second cruise phase heading toward asteroid Psyche.'
    },
    {
      name: 'Approach to 16-Psyche',
      date: 'May, 2029',
      content: 'This would contain information about the final approach and initial observations of the asteroid.'
    },
    {
      name: 'Orbital Capture',
      date: 'May, 2029',
      content: 'This would contain information about the spacecraft entering orbit around Psyche.'
    }
  ];

  const [activeTab, setActiveTab] = useState(missionStages[0].name);
  const currentStage = missionStages.find(stage => stage.name === activeTab);

  return (
    <Card
      style={{ width: '100%' }}
      title={
        <span style={{ fontSize: '24px', fontWeight: '650' }}>
          Psyche Mission Stages
        </span>
      }
      tabList={missionStages.map(stage => ({
        key: stage.name,
        tab: <span style={{ fontSize: '16px' }}>{stage.name}</span>,
      }))}
      activeTabKey={activeTab}
      onTabChange={(key) => setActiveTab(key)}
      tabProps={{
        size: 'middle',
        style: { fontWeight: '500' },
      }}
      headStyle={{
        borderBottom: '2px solid #f0f0f0',
      }}
    >
      <div style={{ padding: '16px', fontSize: '16px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>
          {currentStage.name} - <span style={{ fontWeight: 'normal', color: '#666' }}>{currentStage.date}</span>
        </h3>
        <p>{currentStage.content}</p>
      </div>
    </Card>
  );
};

export default MissionDetails;