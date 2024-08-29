import { Octokit } from '@octokit/rest';
import { cache } from 'react';
import { GITHUB_TOKEN, FETCH_REVALIDATE_IN_SECONDS } from '@/config/const';
import { redirect } from 'next/navigation';

const fetchCached = async (input: RequestInfo, init?: RequestInit): Promise<Response> =>
  fetch(input, {
    ...init,
    next: {
      revalidate: FETCH_REVALIDATE_IN_SECONDS, // 1 hour
      ...init?.next,
    },
  });

/**
 * Init Octokit instance with GitHub token.
 * Note: This token is required for extend the rate limits.
 */
export const octokit = new Octokit({ auth: GITHUB_TOKEN, request: fetchCached });

export const getUserProfile = cache(async (username: string) => {
  try {
    const { data } = await octokit.rest.users.getByUsername({ username });
    return data;
  } catch (e) {
    redirect(`/?error=${e.message}`);
  }
});

export const getRepositories = cache(async (username: string) => {
  const { data } = await octokit.rest.repos.listForUser({ username, direction: 'desc' });
  return data;
});

export const getLanguageStats = cache(async (username: string) => {
  const repos = await getRepositories(username);
  const languageStats: Record<string, number> = {};

  for (const repo of repos) {
    const { data: languages } = await octokit.rest.repos.listLanguages({
      owner: username,
      repo: repo.name,
    });
    for (const [language, count] of Object.entries(languages)) {
      languageStats[language] = (languageStats[language] || 0) + count;
    }
  }

  const totalLines = Object.values(languageStats).reduce((sum, count) => sum + count, 0);

  for (const language in languageStats) {
    const usagePercentage = (languageStats[language] / totalLines) * 100;
    if (usagePercentage < 0.1) {
      delete languageStats[language];
      continue;
    }
    languageStats[language] = +usagePercentage.toFixed(1);
  }

  return Object.fromEntries(Object.entries(languageStats).sort(([, a], [, b]) => b - a));
});

export const getContributions = async (username: string) => {
  const { data } = await octokit.rest.activity.listPublicEventsForUser({ username });
  return data;
};

export const getOrganizations = async (username: string) => {
  const { data } = await octokit.rest.orgs.listForUser({ username });
  return data;
};
