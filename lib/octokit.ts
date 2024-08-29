/**
 * Test octokit
 */
import { Octokit } from '@octokit/rest';
import { cache } from 'react';
import { GITHUB_TOKEN } from '@/config/const';

/**
 * Init Octokit instance with GitHub token.
 * Note: This token is required for extend the rate limits.
 */
export const octokit = new Octokit({ auth: GITHUB_TOKEN });

export const getUserProfile = cache(async (username: string) => {
  const { data } = await octokit.rest.users.getByUsername({ username });
  return data;
});
