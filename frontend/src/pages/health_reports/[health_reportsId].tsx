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

import { update, fetch } from '../../stores/health_reports/health_reportsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditHealth_reports = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    report_date: new Date(),

    details: '',

    animal: '',

    ngo: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { health_reports } = useAppSelector((state) => state.health_reports);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { health_reportsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: health_reportsId }));
  }, [health_reportsId]);

  useEffect(() => {
    if (typeof health_reports === 'object') {
      setInitialValues(health_reports);
    }
  }, [health_reports]);

  useEffect(() => {
    if (typeof health_reports === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = health_reports[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [health_reports]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: health_reportsId, data }));
    await router.push('/health_reports/health_reports-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit health_reports')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit health_reports'}
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
              <FormField label='ReportDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.report_date
                      ? new Date(
                          dayjs(initialValues.report_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, report_date: date })
                  }
                />
              </FormField>

              <FormField label='Details' hasTextareaHeight>
                <Field
                  name='details'
                  id='details'
                  component={RichTextField}
                ></Field>
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
                  onClick={() =>
                    router.push('/health_reports/health_reports-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditHealth_reports.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_HEALTH_REPORTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditHealth_reports;
