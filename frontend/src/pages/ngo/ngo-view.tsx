import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/ngo/ngoSlice';
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

const NgoView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { ngo } = useAppSelector((state) => state.ngo);

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
        <title>{getPageTitle('View ngo')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View ngo')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{ngo?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Users Ngo</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ngo.users_ngo &&
                      Array.isArray(ngo.users_ngo) &&
                      ngo.users_ngo.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!ngo?.users_ngo?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Alerts ngo</p>
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
                    {ngo.alerts_ngo &&
                      Array.isArray(ngo.alerts_ngo) &&
                      ngo.alerts_ngo.map((item: any) => (
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
              {!ngo?.alerts_ngo?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Animals ngo</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>AnimalName</th>

                      <th>Species</th>

                      <th>HeartRate</th>

                      <th>Temperature</th>

                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ngo.animals_ngo &&
                      Array.isArray(ngo.animals_ngo) &&
                      ngo.animals_ngo.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/animals/animals-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='species'>{item.species}</td>

                          <td data-label='heart_rate'>{item.heart_rate}</td>

                          <td data-label='temperature'>{item.temperature}</td>

                          <td data-label='location'>{item.location}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!ngo?.animals_ngo?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Health_reports ngo</p>
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
                    {ngo.health_reports_ngo &&
                      Array.isArray(ngo.health_reports_ngo) &&
                      ngo.health_reports_ngo.map((item: any) => (
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
              {!ngo?.health_reports_ngo?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Ngos ngo</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>NGOName</th>

                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ngo.ngos_ngo &&
                      Array.isArray(ngo.ngos_ngo) &&
                      ngo.ngos_ngo.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/ngos/ngos-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='address'>{item.address}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!ngo?.ngos_ngo?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/ngo/ngo-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

NgoView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_NGO'}>{page}</LayoutAuthenticated>
  );
};

export default NgoView;
