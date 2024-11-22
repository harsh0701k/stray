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
  FeaturesDesigns,
  PricingDesigns,
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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
      name: 'Advanced Health Monitoring',
      description:
        'Track vital signs and health metrics of animals in real-time. This feature ensures timely interventions and better health management.',
      icon: 'mdiHeartPulse',
    },
    {
      name: 'Instant Emergency Notifications',
      description:
        'Receive immediate alerts for any health emergencies. This allows caregivers to respond quickly and effectively, ensuring animal safety.',
      icon: 'mdiBellAlert',
    },
    {
      name: 'Comprehensive Data Analytics',
      description:
        'Access detailed reports and analytics on animal health and behavior. Use this data to make informed decisions and improve care strategies.',
      icon: 'mdiChartBar',
    },
    {
      name: 'Seamless IoT Integration',
      description:
        'Integrate with IoT devices effortlessly to gather accurate data. This feature enhances monitoring capabilities and operational efficiency.',
      icon: 'mdiWifi',
    },
    {
      name: 'User-Friendly Interface',
      description:
        'Navigate through the application with ease. Our intuitive design ensures that all users can access and utilize features effectively.',
      icon: 'mdiTabletDashboard',
    },
    {
      name: 'Multi-NGO Support',
      description:
        'Support for multiple NGOs to use the platform independently. This feature allows each organization to manage their operations seamlessly.',
      icon: 'mdiAccountGroup',
    },
  ];

  const pricing_features = {
    standard: {
      features: ['Real-Time Health Monitoring', 'Emergency Notifications'],
      limited_features: [
        'Basic Data Analytics',
        'Limited IoT Device Integration',
      ],
    },
    premium: {
      features: [
        'Advanced Health Monitoring',
        'Instant Emergency Alerts',
        'Comprehensive Data Analytics',
      ],
      also_included: ['Enhanced IoT Integration', 'Priority Support'],
    },
    business: {
      features: [
        'Full Health Monitoring Suite',
        'Instant Alerts',
        'Advanced Data Analytics',
        'Seamless IoT Integration',
        'Dedicated Account Manager',
      ],
    },
  };

  const description = {
    standard:
      'Ideal for small NGOs or individual caregivers looking to monitor animal health with essential features.',
    premium:
      'Perfect for growing NGOs or small businesses needing advanced monitoring and analytics capabilities.',
    business:
      'Designed for large organizations or enterprises requiring comprehensive monitoring, analytics, and dedicated support.',
  };

  const faqs = [
    {
      question: 'What is included in the Standard plan?',
      answer:
        'The Standard plan includes real-time health monitoring and emergency notifications. It is ideal for small NGOs or individual caregivers who need essential features.',
    },
    {
      question: 'How does the Premium plan differ from the Standard plan?',
      answer:
        'The Premium plan offers advanced health monitoring, instant emergency alerts, and comprehensive data analytics. It also includes enhanced IoT integration and priority support, making it suitable for growing NGOs or small businesses.',
    },
    {
      question: 'What additional features are available in the Business plan?',
      answer:
        'The Business plan provides a full health monitoring suite, advanced data analytics, seamless IoT integration, and a dedicated account manager. It is designed for large organizations or enterprises requiring comprehensive solutions.',
    },
    {
      question: 'Can multiple NGOs use ${projectName} independently?',
      answer:
        "Yes, ${projectName} supports multi-NGO usage, allowing different organizations to manage their operations independently while using the platform's features.",
    },
    {
      question: 'Is there a trial period available for ${projectName}?',
      answer:
        'Yes, we offer a trial period for new users to explore the features and benefits of ${projectName}. Please contact our support team for more details on how to get started.',
    },
    {
      question: 'How does ${projectName} integrate with IoT devices?',
      answer:
        '${projectName} seamlessly integrates with IoT devices to gather accurate data on animal health and behavior. This integration enhances monitoring capabilities and operational efficiency.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Our Services - ${projectName}`}</title>
        <meta
          name='description'
          content={`Explore the innovative services offered by ${projectName}, designed to enhance animal care through IoT technology. Learn about our features, pricing, and how to get in touch.`}
        />
      </Head>
      <WebSiteHeader projectName={'stray'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'stray'}
          image={['Animal with IoT device']}
          mainText={`Transforming Animal Care with ${projectName}`}
          subTitle={`Discover the range of services offered by ${projectName} to revolutionize animal care using IoT technology. Enhance your NGO's capabilities with our innovative solutions.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Services`}
        />

        <FeaturesSection
          projectName={'stray'}
          image={['Team using technology']}
          withBg={0}
          features={features_points}
          mainText={`Comprehensive Services by ${projectName}`}
          subTitle={`Explore the innovative features of ${projectName} designed to enhance animal care and streamline operations for NGOs.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <PricingSection
          projectName={'stray'}
          withBg={0}
          features={pricing_features}
          description={description}
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
          image={['Person using a laptop']}
          mainText={`Get in Touch with ${projectName} `}
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
