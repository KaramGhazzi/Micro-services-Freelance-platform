import BaseEmptyState from '@/app/_components/BaseEmptyState';

const ErrorNotFound = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <BaseEmptyState
        imageUrl="/illustration/empty-illustration.svg"
        title="404"
        description="Deze pagina is niet gevonden" // Hardcoded text because hooks(next-intl) are not available in Server components...
      />
    </div>
  );
};

export default ErrorNotFound;
