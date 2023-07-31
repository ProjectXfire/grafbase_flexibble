export interface ICreateProjectDto {
  id?: string;
  imageUrl: string;
  imageCode: string;
  title: string;
  description: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  createdBy?: any;
}
