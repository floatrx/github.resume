import { getUserProfile } from '@/lib/octokit';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { Mail, House } from 'lucide-react';

/**
 * Profile section component.
 * @param props
 * @constructor
 */
export const ProfileSection: FC<Username> = async (props) => {
  const { username } = props;

  // Fetch user profile
  const profile = await getUserProfile(username);

  const { html_url, bio, email, blog, type, avatar_url, created_at, location, public_repos, followers } = profile;
  const name = profile.name ?? username;
  const createdAt = dayjs(created_at).format('YYYY');

  // NOTE: contributors & organizations > Always empty {}
  // const contributors = getContributions(username);
  // const organizations = getOrganizations(username);

  return (
    <Section>
      {/*<Debug title="ccc" data={contributors} />*/}
      {/*<Debug title="ooo" data={organizations} />*/}
      <div className="stack m-0 flex-1 flex-col-reverse gap-x-10 sm:flex-row">
        <div className="flex w-full flex-col text-lg leading-relaxed">
          <Link
            className="link my-4 w-fit text-center text-3xl font-black sm:text-left sm:text-5xl"
            href={html_url}
            target="_blank"
            rel="noopener"
          >
            {name}
          </Link>
          <p>Passionate GitHub {type}</p>
          <p className="stack">{bio}</p>
          <div className="stack mt-4 flex-wrap border-t pt-2 text-[17px] font-normal sm:mt-2">
            {email && (
              <p className="stack max-w-full">
                <Mail size={18} /> Email: <strong>{email}</strong>
              </p>
            )}
            {blog && (
              <p className="stack">
                <House size={18} />
                <Link href={blog} target="_blank" rel="noopener">
                  <strong>{blog}</strong>
                </Link>
              </p>
            )}
          </div>
        </div>
        <span className="flex-1"></span>
        <Image
          src={avatar_url}
          alt={name}
          width={100}
          height={100}
          quality={95}
          className="m-0 rounded-full border-2 transition-all sm:size-40 sm:duration-100"
        />
      </div>
      <p className="mt-10 max-w-screen-md sm:mt-2 sm:text-xl">
        On GitHub since <strong>{createdAt}</strong>, {name} is a developer based in {location}, with{' '}
        <strong>{public_repos}</strong> public repositories and <strong>{followers}</strong> followers.
      </p>
    </Section>
  );
};
