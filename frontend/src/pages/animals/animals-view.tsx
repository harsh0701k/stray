import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/animals/animalsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

import { hasPermission } from '../../helpers/userPermissions';

const AnimalsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { animals } = useAppSelector((state) => state.animals);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View animals')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View animals')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>AnimalName</p>
            <p>{animals?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Species</p>
            <p>{animals?.species}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>HeartRate</p>
            <p>{animals?.heart_rate || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Temperature</p>
            <p>{animals?.temperature || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Location</p>
            <p>{animals?.location}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>AssignedCaregiver</p>

            <p>{animals?.assigned_caregiver?.firstName ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>ngo</p>

            <p>{animals?.ngo?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Alerts Animal</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>AlertType</th>

                      <th>TriggeredAt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {animals.alerts_animal &&
                      Array.isArray(animals.alerts_animal) &&
                      animals.alerts_animal.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/alerts/alerts-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='type'>{item.type}</td>

                          <td data-label='triggered_at'>
                            {dataFormatter.dateTimeFormatter(item.triggered_at)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!animals?.alerts_animal?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Health_reports Animal</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>ReportDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {animals.health_reports_animal &&
                      Array.isArray(animals.health_reports_animal) &&
                      animals.health_reports_animal.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/health_reports/health_reports-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='report_date'>
                            {dataFormatter.dateTimeFormatter(item.report_date)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!animals?.health_reports_animal?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/animals/animals-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

AnimalsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ANIMALS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default AnimalsView;
