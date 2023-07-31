import * as Yup from 'yup';

export const ProjectSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
  liveSiteUrl: Yup.string().url().required(),
  githubUrl: Yup.string().url().required(),
  category: Yup.string().required()
});
