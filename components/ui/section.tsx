import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface IProps extends Omit<ComponentProps<'section'>, 'title'> {
  title?: ReactNode;
  icon?: ReactNode;
  borderless?: boolean;
}

export const Section: FC<IProps> = ({ icon, title, children, className, borderless, ...props }) => (
  <section className={cn(!borderless && 'border-b', 'pb-4', className)}>
    <h2 className="my-3 flex items-center text-xl font-semibold sm:text-2xl">
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </h2>
    <div>{children}</div>
  </section>
);
