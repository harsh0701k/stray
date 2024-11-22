import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/alerts/alertsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditAlertsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    type: '',

    triggered_at: new Date(),

    animal: '',

    notified_user: '',

    ngo: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { alerts } = useAppSelector((state) => state.alerts);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof alerts === 'object') {
      setInitialValues(alerts);
    }
  }, [alerts]);

  useEffect(() => {
    if (typeof alerts === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = alerts[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [alerts]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/alerts/alerts-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit alerts')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit alerts'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='AlertType'>
                <Field name='type' placeholder='AlertType' />
              </FormField>

              <FormField label='TriggeredAt'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.triggered_at
                      ? new Date(
                          dayjs(initialValues.triggered_at).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, triggered_at: date })
                  }
                />
              </FormField>

              <FormField label='Animal' labelFor='animal'>
                <Field
                  name='animal'
                  id='animal'
                  component={SelectField}
                  options={initialValues.animal}
                  itemRef={'animals'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='NotifiedUser' labelFor='notified_user'>
                <Field
                  name='notified_user'
                  id='notified_user'
                  component={SelectField}
                  options={initialValues.notified_user}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='ngo' labelFor='ngo'>
                <Field
                  name='ngo'
                  id='ngo'
                  component={SelectField}
                  options={initialValues.ngo}
                  itemRef={'ngo'}
                  showField={'name'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/alerts/alerts-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditAlertsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_ALERTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditAlertsPage;
