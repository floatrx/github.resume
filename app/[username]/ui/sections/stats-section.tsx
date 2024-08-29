import { getLanguageStats } from '@/lib/octokit';
import { Section } from '@/components/ui/section';
import { Code } from 'lucide-react';

/**
 * Stats section component.
 * @param username
 * @constructor
 */
export const StatsSection: FC<Username> = async ({ username }) => {
  const stats = await getLanguageStats(username);
  return (
    <Section title="Popular Languages" icon={<Code />}>
      <ul className="flex flex-wrap gap-5 gap-y-1">
        {Object.entries(stats).map(([language, count]) => (
          <li key={language} className="stack">
            {language} <span className="flex-1">-</span> <span className="font-semibold">{count}%</span>
          </li>
        ))}
      </ul>
    </Section>
  );
};
