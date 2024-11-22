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
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

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

  const faqs = [
    {
      question: 'What is ${projectName} and how does it work?',
      answer:
        '${projectName} is an innovative platform that uses IoT technology to monitor and care for stray animals. It provides real-time health data and alerts to caregivers and veterinarians.',
    },
    {
      question: 'How can I sign up for ${projectName}?',
      answer:
        'To sign up, contact us through the form on our website. Our team will assist you with the registration process and provide any necessary support.',
    },
    {
      question: 'What are the pricing options for ${projectName}?',
      answer:
        '${projectName} offers three pricing plans: Standard, Premium, and Business. Each plan is designed to meet the needs of different organizations, from small NGOs to large enterprises.',
    },
    {
      question: 'Is there a trial period available?',
      answer:
        'Yes, we offer a trial period for new users to explore the features and benefits of ${projectName}. Contact us to learn more about starting your trial.',
    },
    {
      question: 'How secure is the data on ${projectName}?',
      answer:
        'Data security is a top priority for us. ${projectName} uses advanced encryption and security protocols to ensure that all data is protected and confidential.',
    },
    {
      question: 'Can ${projectName} be customized for my organization?',
      answer:
        'Yes, ${projectName} is designed to be flexible and customizable. We can work with you to tailor the features to meet your specific needs and requirements.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. Learn more about our features, pricing, and how to get started. Contact us for further assistance.`}
        />
      </Head>
      <WebSiteHeader projectName={'stray'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'stray'}
          image={['Person reading a FAQ document']}
          mainText={`Your Questions Answered at ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to common questions about ${projectName}. Learn more about our features, pricing, and support options.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Learn More`}
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
          image={['Person typing on a laptop']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`Have more questions? Contact us anytime. Our team at ${projectName} is ready to assist you with any inquiries or support needs.`}
        />
      </main>
      <WebSiteFooter projectName={'stray'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
