import { GraphQLClient } from 'graphql-request';
import { type IUserProfile, type IResponse } from '../interfaces';
import { getUserQuery, createUserMutation } from './graphQueries';

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL
  : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY : 'freaemoliefas';
export const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : 'http://localhost:3000';

export const client = new GraphQLClient(apiUrl ?? '');

export async function makeGraphQLRequest(query: string, variables = {}): Promise<any> {
  return await client.request(query, variables);
}

export async function createUser(
  name: string,
  email: string,
  avatarUrl: string
): Promise<IResponse<any>> {
  client.setHeader('x-api-key', apiKey ?? '');
  try {
    const variable = {
      input: { name, email, avatarUrl }
    };
    const res = await makeGraphQLRequest(createUserMutation, variable);
    return {
      data: res,
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: 'Internal server error'
    };
  }
}

export async function getUser(email: string): Promise<IResponse<{ user: IUserProfile } | null>> {
  try {
    client.setHeader('x-api-key', apiKey ?? '');
    const res = await makeGraphQLRequest(getUserQuery, { email });
    return {
      data: res,
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: 'Internal server error'
    };
  }
}
