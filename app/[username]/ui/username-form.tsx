import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getUserProfile } from '@/lib/octokit';
import { CircleAlert } from 'lucide-react';

interface IProps {
  error?: string;
}

/**
 * Main form for entering the GitHub username
 * and redirecting to the resume page.
 * @constructor
 */
export const UsernameForm: FC<IProps> = ({ error }) => {
  const redirectToResumePage = async (formData: FormData) => {
    'use server';
    const username = formData.get('username') as string;

    if (!username) return;

    try {
      await getUserProfile(username); // check if user exists and warm up the cache
    } catch (e) {
      redirect(`/?error=User "${username}" not found`);
    }

    redirect(`/${username}`);
  };

  return (
    <form className="w-full max-w-[400px] gap-2 rounded p-2 text-center" action={redirectToResumePage}>
      <div className="stack">
        <Input autoFocus name="username" placeholder="Provide username e.g. Vercel" />
        <Button type="submit">Generate</Button>
      </div>
      {error && (
        <p className="stack mt-2 justify-center p-2 text-sm text-red-600">
          <CircleAlert /> {error}
        </p>
      )}
    </form>
  );
};
