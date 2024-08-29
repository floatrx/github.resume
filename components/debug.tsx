interface IProps {
  title: string;
  data: unknown | undefined;
}

/**
 * Temporary debug component for development purposes.
 * @param data - Any object
 * @param title - Title
 * @constructor
 */
export const Debug: FC<IProps> = ({ data, title }) => (
  <section className="mb-2 rounded-md border px-2">
    <h2 className="font-semibold">{title}</h2>
    <code className="text-xs">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </code>
  </section>
);
