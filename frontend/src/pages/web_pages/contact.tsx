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
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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
      question: 'How can I start using ${projectName}?',
      answer:
        'To start using ${projectName}, simply contact us through the form on this page. Our team will guide you through the setup process and provide any necessary support.',
    },
    {
      question: 'What support options are available?',
      answer:
        '${projectName} offers comprehensive support through email and phone. Our team is dedicated to helping you resolve any issues and make the most of our platform.',
    },
    {
      question: 'Can I customize the features for my NGO?',
      answer:
        'Yes, ${projectName} is designed to be flexible and customizable. We can work with you to tailor the features to meet your specific needs and requirements.',
    },
    {
      question: 'Is there a demo available for ${projectName}?',
      answer:
        'Yes, we offer a demo to showcase the features and capabilities of ${projectName}. Contact us to schedule a demonstration and see how it can benefit your organization.',
    },
    {
      question: 'How secure is the data on ${projectName}?',
      answer:
        'Data security is a top priority for ${projectName}. We use advanced encryption and security protocols to ensure that all data is protected and confidential.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - ${projectName}`}</title>
        <meta
          name='description'
          content={`Get in touch with the ${projectName} team for inquiries, support, or collaboration opportunities. We're here to help you with any questions you may have.`}
        />
      </Head>
      <WebSiteHeader projectName={'stray'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'stray'}
          image={['Team discussing at a table']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`We're here to assist you with any inquiries or support needs. Reach out to the ${projectName} team and let's make a difference together.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Contact Us`}
        />

        <FaqSection
          projectName={'stray'}
          design={FaqDesigns.SPLIT_LIST || ''}
          faqs={faqs}
          mainText={`Common Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'stray'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person writing an email']}
          mainText={`Reach Out to ${projectName} `}
          subTitle={`Feel free to contact us anytime. Our team at ${projectName} is ready to respond to your inquiries and provide the support you need.`}
        />
      </main>
      <WebSiteFooter projectName={'stray'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
