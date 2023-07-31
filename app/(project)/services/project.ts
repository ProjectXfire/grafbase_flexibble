import { client, createProjectMutation, makeGraphQLRequest, serverUrl } from '@/shared/database';
import { fetchToken } from '@/shared/services';
import { type ICloudinary } from '../interfaces';
import { type ICreateProjectDto } from '../dtos';
import { type IResponse } from '@/shared/interfaces';

export async function createProject(
  payload: ICreateProjectDto,
  creatorId: string
): Promise<IResponse<any>> {
  try {
    const token = await fetchToken();
    const { data } = await uploadImage(payload.imageUrl);
    if (!data)
      return {
        data: null,
        error: 'Error on upload image'
      };
    payload.imageUrl = data.secure_url;
    payload.imageCode = data.public_id;

    client.setHeader('Authorization', `Bearer ${token}`);
    const variables = {
      input: { ...payload, createdBy: { link: creatorId } }
    };
    await makeGraphQLRequest(createProjectMutation, variables);
    return {
      data: null,
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: 'Something went wrong'
    };
  }
}

export async function uploadImage(image: string): Promise<IResponse<ICloudinary | null>> {
  try {
    const res = await fetch(`${serverUrl}/api/upload`, {
      method: 'POST',
      body: JSON.stringify({ path: image })
    });
    const { data, error } = (await res.json()) as IResponse<ICloudinary | null>;
    if (!data)
      return {
        data: null,
        error
      };
    return {
      data,
      error: null
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
