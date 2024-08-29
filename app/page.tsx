import { getUserProfile } from '@/lib/octokit';

export default async function HomePage() {
  const profile = getUserProfile('floatrx');
  return (
    <main>
      Homepage
      <code>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </code>
    </main>
  );
}
