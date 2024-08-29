import { getRepositories } from '@/lib/octokit';
import dayjs from 'dayjs';
import { Section } from '@/components/ui/section';
import { Box, Star, Folder } from 'lucide-react';
import Link from 'next/link';

/**
 * Repositories section component.
 * @param username
 * @constructor
 */
export const RepositoriesSection: FC<Username> = async ({ username }) => {
  const repos = await getRepositories(username);
  return (
    <Section borderless title="Public Repositories" icon={<Box />}>
      <ol className="space-y-4">
        {repos.map((repo) => {
          const { id, url, stargazers_count, forks_count, name, created_at, language, description } = repo;
          return (
            <li key={id} className="">
              <p className="flex items-center text-lg font-semibold">
                <span className="font-semibold capitalize">
                  <Link className="stack items-center" href={url} target="_blank" rel="noopener">
                    {stargazers_count || forks_count ? <Star size={16} /> : <Folder size={16} />}{' '}
                    <span className="link">{name}</span>
                  </Link>
                </span>{' '}
                <span className="mx-4 flex-1 border-b border-dashed"></span>{' '}
                <time className="text-sm opacity-50">{dayjs(created_at).format('MMMM YYYY')}</time>
              </p>
              <div className="max-w-screen-md space-y-4">
                {language && <p className="italic">{language}</p>}
                {description && <p>{description}</p>}
                {!!(forks_count || stargazers_count) && (
                  <p>
                    This repository has {stargazers_count} stars and {forks_count} forks. If you would like more
                    information about this repository and my contributed code, please visit{' '}
                    <Link href={url} target="_blank" rel="noopener">
                      the repo
                    </Link>{' '}
                    on GitHub.
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
};
