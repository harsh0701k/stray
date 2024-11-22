import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../stores/hooks';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  AboutUsDesigns,
  FeaturesDesigns,
  ContactFormDesigns,
  FaqDesigns,
} from '../components/WebPageComponents/designs';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../components/WebPageComponents/FeaturesComponent';

import ContactFormSection from '../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../components/WebPageComponents/FaqComponent';

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
      name: 'Real-Time Monitoring',
      description:
        'Receive continuous updates on animal health and location. Stay informed and ready to act when needed.',
      icon: 'mdiMonitor',
    },
    {
      name: 'Instant Alerts',
      description:
        'Get notified immediately during medical emergencies. Ensure quick response to safeguard animal well-being.',
      icon: 'mdiAlertCircle',
    },
    {
      name: 'Comprehensive Reporting',
      description:
        'Access detailed historical data on each animal. Analyze trends to improve care strategies and outcomes.',
      icon: 'mdiChartLine',
    },
  ];

  const faqs = [
    {
      question: 'How does ${projectName} use IoT technology?',
      answer:
        '${projectName} utilizes IoT devices to monitor the health and location of stray animals in real-time, providing vital data to caregivers and veterinarians.',
    },
    {
      question: 'Who can use ${projectName}?',
      answer:
        'The application is designed for NGOs involved in animal care, including administrators, caregivers, and veterinarians, to streamline their operations and improve animal welfare.',
    },
    {
      question: 'What kind of alerts does ${projectName} provide?',
      answer:
        '${projectName} sends instant notifications for medical emergencies, allowing quick response to ensure the safety and health of the animals.',
    },
    {
      question: 'Is ${projectName} suitable for multiple NGOs?',
      answer:
        'Yes, ${projectName} is a multitenant system, allowing different NGOs to use the app independently while managing their specific operations.',
    },
    {
      question: 'How can I get involved with ${projectName}?',
      answer:
        'You can join our mission by contacting us through the form on our website. We welcome partnerships and collaborations with NGOs and animal welfare organizations.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Animal Care Team - Innovative IoT Solutions for Stray Animals`}</title>
        <meta
          name='description'
          content={`Join our NGO's Animal Care Team in using IoT technology to monitor and rescue stray animals. Discover our features, mission, and how you can help.`}
        />
      </Head>
      <WebSiteHeader projectName={'stray'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'stray'}
          image={['Stray animal with IoT band']}
          mainText={`Empowering NGOs with IoT for Animals`}
          subTitle={`Join the ${projectName} initiative to monitor and rescue stray animals using cutting-edge IoT technology. Be part of a compassionate solution.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Involved Now`}
        />

        <AboutUsSection
          projectName={'stray'}
          image={['Team working with IoT devices']}
          mainText={`Join the ${projectName} Mission Today`}
          subTitle={`At ${projectName}, we are dedicated to using innovative IoT solutions to improve the lives of stray animals. Our mission is to empower NGOs with the tools they need to monitor and rescue animals effectively.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More`}
        />

        <FeaturesSection
          projectName={'stray'}
          image={['IoT device on animal']}
          withBg={1}
          features={features_points}
          mainText={`Discover ${projectName} Key Features`}
          subTitle={`Explore how ${projectName} leverages IoT technology to enhance animal care and streamline NGO operations.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <FaqSection
          projectName={'stray'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'stray'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Hands typing on keyboard']}
          mainText={`Connect with ${projectName} Team `}
          subTitle={`Reach out to us anytime for inquiries or support. Our team at ${projectName} is here to assist you promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'stray'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
