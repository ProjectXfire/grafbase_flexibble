import { redirect } from 'next/navigation';
import { Modal } from '@/shared/components';
import { ProjectForm } from '../../components';
import { getCurrentUser } from '@/shared/lib';

async function CreateProjectPage(): Promise<JSX.Element> {
  const { data } = await getCurrentUser();

  if (!data) redirect('/');

  return (
    <Modal headingTitle='Create a new project'>
      <ProjectForm type='create' session={data} />
    </Modal>
  );
}
export default CreateProjectPage;
