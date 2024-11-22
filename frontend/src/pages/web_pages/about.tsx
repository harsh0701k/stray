import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  AboutUsDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'stray';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },
  ];

  const features_points = [
    {
      name: 'Real-Time Health Tracking',
      description:
        'Monitor the vital signs of stray animals continuously. This feature ensures timely interventions and better health management.',
      icon: 'mdiHeartPulse',
    },
    {
      name: 'Emergency Alerts',
      description:
        'Receive instant notifications for any health emergencies. This allows caregivers to respond quickly and effectively.',
      icon: 'mdiBellAlert',
    },
    {
      name: 'Data-Driven Insights',
      description:
        'Access comprehensive reports and analytics on animal health and behavior. Use this data to make informed decisions and improve care strategies.',
      icon: 'mdiChartBar',
    },
  ];

  const testimonials = [
    {
      text: 'Thanks to ${projectName}, our NGO has significantly improved the way we monitor and care for stray animals. The real-time data is invaluable.',
      company: 'Animal Guardians Inc.',
      user_name: 'Emily Johnson, Operations Manager',
    },
    {
      text: 'The emergency alerts feature has been a game-changer for us. We can now respond to medical emergencies much faster and more efficiently.',
      company: 'Wildlife Rescue Network',
      user_name: 'Michael Smith, Field Coordinator',
    },
    {
      text: 'The insights provided by ${projectName} have helped us optimize our resources and improve the overall health of the animals in our care.',
      company: 'Stray Haven Foundation',
      user_name: 'Sarah Lee, Data Analyst',
    },
    {
      text: 'We love the user-friendly interface and the comprehensive reporting features. ${projectName} has become an essential tool for our team.',
      company: 'Paws and Claws NGO',
      user_name: 'David Brown, Program Director',
    },
    {
      text: 'The integration with IoT devices is seamless and has allowed us to track animal health metrics with unprecedented accuracy.',
      company: 'Furry Friends Alliance',
      user_name: 'Jessica Taylor, Tech Lead',
    },
    {
      text: "Our team is impressed with the level of support and innovation that ${projectName} offers. It's truly a revolutionary platform for animal care.",
      company: 'Compassionate Care Coalition',
      user_name: 'Robert Wilson, Executive Director',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About ${projectName} - Our Mission and Vision`}</title>
        <meta
          name='description'
          content={`Learn more about ${projectName}, our mission to help stray animals using IoT technology, and the dedicated team behind this initiative.`}
        />
      </Head>
      <WebSiteHeader projectName={'stray'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'stray'}
          image={['Team with rescued animals']}
          mainText={`Discover the Heart of ${projectName}`}
          subTitle={`Explore the mission and vision of ${projectName}, where technology meets compassion to transform the lives of stray animals. Join us in making a difference.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Our Story`}
        />

        <AboutUsSection
          projectName={'stray'}
          image={['Team brainstorming session']}
          mainText={`Our Journey with ${projectName}`}
          subTitle={`At ${projectName}, we are driven by a passion for animal welfare and innovation. Our team is committed to using IoT technology to create a safer world for stray animals.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Meet the Team`}
        />

        <FeaturesSection
          projectName={'stray'}
          image={['IoT devices in action']}
          withBg={0}
          features={features_points}
          mainText={`Innovative Features of ${projectName}`}
          subTitle={`Discover how ${projectName} leverages technology to enhance animal care and streamline NGO operations.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS_DIVERSITY || ''}
        />

        <TestimonialsSection
          projectName={'stray'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`What Our Partners Say About ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'stray'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
