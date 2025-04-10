import React, { useState } from 'react';
import { Card } from 'antd';

const SpacecraftDetails = () => {
  const instruments = [
    {
      name: 'Multispectral Imager',
      content: 'Psyche’s multispectral imager consists of a pair of identical cameras equipped with filters and telescopic lenses to photograph the surface of the asteroid in different wavelengths of light. The cameras can take pictures in the part of the spectrum visible to the human eye, as well as in near-infrared wavelengths of light beyond what humans can see. The images will help the science team learn about the mineral composition of Psyche; map the distribution of craters, valleys, cliffs, and other geologic features; and enable the creation of 3D topographic maps.'
    },
    {
      name: 'Gamma-Ray and Neutron Spectrometer',
      content: 'The orbiter’s gamma-ray and neutron spectrometer (GRNS) will help scientists determine the chemical elements that make up the asteroid’s surface material. As cosmic rays and high energy particles bombard the asteroid Psyche’s surface, the elements there absorb the energy. In response, they emit neutrons and gamma rays of varying energy levels. The spectrometer can detect these emissions, enabling scientists to match them to properties of known elements to determine what Psyche is made of.'
    },
    {
      name: 'Magnetometer',
      content: 'The orbiter’s magnetometer will look for evidence of an ancient magnetic field at the asteroid Psyche. Unlike Earth and other rocky planets that generate a magnetic field in their liquid metallic cores, small bodies like asteroids do not generate one because they are frozen. If the magnetometer detects an intrinsic field around the asteroid, it would be from remanent, or residual, magnetization – electrons that were aligned in Psyche’s materials when they cooled in an ancient field generated in the body’s molten core billions of years ago before that core cooled. Confirmation of a remanent magnetic field would be strong evidence that the asteroid formed from the core of a planetary body.'
    },
    {
      name: 'Gravity Science',
      content: 'The Psyche science team will rely on the telecommunications system, used to send commands to and receive data from the spacecraft, to conduct gravity science also. By analyzing the X-band radio waves the spacecraft communicates with, scientists can measure how Psyche affects the spacecraft’s orbit. From that information, scientists can determine the body’s rotation, mass, and gravity field, providing additional clues about the composition and structure of Psyche’s interior'
    },
    {
      name: 'Deep Space Optical Communications (DSOC)',
      content: 'NASA’s Deep Space Optical Communications (DSOC) experiment is the agency’s first demonstration of laser, or optical, communications from deep space, covering Earth-Mars distances. DSOC is a technology demonstration, which means it will test key technologies that may be used in future missions. While the Psyche spacecraft will provide power to the DSOC flight laser transceiver and help it point at Earth, the experiment is not intended to relay Psyche mission data. DSOC operations are planned for about two years, beginning roughly 20 days after launch. During operations, the spacecraft will assist the initial coarse pointing of the DSOC flight transceiver by rotating to point the flight transceiver in the general direction of the ground-transmitted beacon at Table Mountain. DSOC’s flight laser transceiver is mounted on an assembly of struts and actuators that stabilize the optics despite spacecraft vibrations.'
    }
  ];

  const [activeTab, setActiveTab] = useState(instruments[0].name);
  const currentInstrument = instruments.find(instrument => instrument.name === activeTab);

  return (
    <Card
      style={{ width: '100%' }}
      title={
        <span style={{ fontSize: '24px', fontWeight: '650' }}>
          Sensors & Instruments
        </span>
      }
      tabList={instruments.map(instrument => ({
        key: instrument.name,
        tab: <span style={{ fontSize: '20px' }}>{instrument.name}</span>,
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
        <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>
          {currentInstrument.name}
        </h3>
        <p>{currentInstrument.content}</p>
      </div>
    </Card>
  );
};

export default SpacecraftDetails;