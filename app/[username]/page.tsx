import { Suspense } from 'react';

import { RepositoriesSection } from './ui/sections/repositories-section';
import { StatsSection } from './ui/sections/stats-section';
import { ProfileSection } from './ui/sections/profile-section';
import { BackLink } from '@/components/back-link';
import { PrintButton } from '@/components/print-button';

export const revalidate = 3600; // 1 hour

interface IProps {
  params: { username: string };
}

export const generateMetadata = async ({ params }: IProps) => ({
  title: params.username,
});

/**
 * Resume page.
 *
 * Note:
 * - "username" is always present in the props.params.
 * - If `username` is not present, it will render the homepage.
 *
 * @param params - The parameters containing the GitHub "username".
 * @constructor
 */
const ResumePage = async ({ params }: IProps) => (
  <main className="container space-y-4">
    <div className="stack mt-5 justify-between">
      <BackLink />
      <PrintButton />
    </div>
    {[ProfileSection, StatsSection, RepositoriesSection].map((Component, index) => (
      <Suspense key={index} fallback={<>Loading {Component.name}...</>}>
        <Component {...params} />
      </Suspense>
    ))}
  </main>
);

export default ResumePage;
