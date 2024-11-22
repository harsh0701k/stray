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

import { update, fetch } from '../../stores/animals/animalsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditAnimalsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    species: '',

    heart_rate: '',

    temperature: '',

    location: '',

    assigned_caregiver: '',

    ngo: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { animals } = useAppSelector((state) => state.animals);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof animals === 'object') {
      setInitialValues(animals);
    }
  }, [animals]);

  useEffect(() => {
    if (typeof animals === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = animals[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [animals]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/animals/animals-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit animals')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit animals'}
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
              <FormField label='AnimalName'>
                <Field name='name' placeholder='AnimalName' />
              </FormField>

              <FormField label='Species'>
                <Field name='species' placeholder='Species' />
              </FormField>

              <FormField label='HeartRate'>
                <Field
                  type='number'
                  name='heart_rate'
                  placeholder='HeartRate'
                />
              </FormField>

              <FormField label='Temperature'>
                <Field
                  type='number'
                  name='temperature'
                  placeholder='Temperature'
                />
              </FormField>

              <FormField label='Location'>
                <Field name='location' placeholder='Location' />
              </FormField>

              <FormField
                label='AssignedCaregiver'
                labelFor='assigned_caregiver'
              >
                <Field
                  name='assigned_caregiver'
                  id='assigned_caregiver'
                  component={SelectField}
                  options={initialValues.assigned_caregiver}
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
                  onClick={() => router.push('/animals/animals-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditAnimalsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_ANIMALS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditAnimalsPage;
