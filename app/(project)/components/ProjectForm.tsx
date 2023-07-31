'use client';

import { type ChangeEvent, useRef, useState } from 'react';
import NextImage from 'next/image';
import { Formik } from 'formik';
import styles from '../styles/ProjectForm.module.css';
import { type ISessionInterface } from '@/shared/interfaces';
import { ProjectSchema } from '../schemas';
import { type ICreateProjectDto } from '../dtos';
import { categoryFilters } from '@/shared/constants';
import { Button, InputForm } from '@/shared/components';
import toast from 'react-hot-toast';
import { createProject } from '../services';

interface Props {
  type: 'create' | 'edit';
  session: ISessionInterface;
}

function ProjectForm({ type, session }: Props): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState('');

  const onBrowserImage = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreviewImage(reader.result);
        }
      };
    }
  };

  const onSubmit = async (values: ICreateProjectDto): Promise<void> => {
    const { error } = await createProject(values, session.user.id);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Successfully created');
    }
  };

  return (
    <Formik
      initialValues={{
        id: '',
        imageUrl: '',
        imageCode: '',
        title: '',
        description: '',
        liveSiteUrl: '',
        githubUrl: '',
        category: ''
      }}
      validationSchema={ProjectSchema}
      onSubmit={function (values: ICreateProjectDto) {
        if (!previewImage && !values.imageUrl) {
          toast.error('Select an image');
        } else {
          if (previewImage) values.imageUrl = previewImage;
          onSubmit(values);
        }
      }}
    >
      {({ handleSubmit, values, handleChange, setFieldValue, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <div className={styles['project-form']}>
            <div className={styles['project-form__image']} onClick={onBrowserImage}>
              <label htmlFor='poster'>
                {!previewImage && !values.imageUrl && 'Choose a poster for your project'}
              </label>
              <input
                ref={fileInputRef}
                style={{ display: 'none' }}
                type='file'
                id='image'
                accept='image/*'
                onChange={handleChangeImage}
              />
              {(previewImage || values.imageUrl) && (
                <NextImage
                  style={{ objectFit: 'cover' }}
                  fill
                  src={values.imageUrl ? values.imageUrl : previewImage}
                  alt='image'
                />
              )}
            </div>
            <InputForm
              name='title'
              type='text'
              placeholder='Title'
              errorText={errors.title && touched.title ? errors.title : ''}
              value={values.title}
              onChange={handleChange}
            />
            <InputForm
              name='description'
              type='text'
              placeholder='Showcase and discover remakable developer projects.'
              textarea
              errorText={errors.description && touched.description ? errors.description : ''}
              value={values.description}
              onChange={handleChange}
            />
            <InputForm
              name='liveSiteUrl'
              type='url'
              placeholder='Website URL'
              errorText={errors.liveSiteUrl && touched.liveSiteUrl ? errors.liveSiteUrl : ''}
              value={values.liveSiteUrl}
              onChange={handleChange}
            />
            <InputForm
              name='githubUrl'
              type='url'
              placeholder='Github URL'
              errorText={errors.githubUrl && touched.githubUrl ? errors.githubUrl : ''}
              value={values.githubUrl}
              onChange={handleChange}
            />
            <InputForm
              name='category'
              placeholder='Select a category'
              select
              errorText={errors.category && touched.category ? errors.category : ''}
              selectValues={categoryFilters}
              value={values.category}
              onSelectValue={(value) => {
                setFieldValue('category', value);
              }}
            />
            <Button
              text={type[0].toUpperCase() + type.slice(1)}
              textColor='#dbeafe'
              bgColor='#3b82f6'
              type='submit'
            />
          </div>
        </form>
      )}
    </Formik>
  );
}
export default ProjectForm;
