import DashboardLayout from '@/app/(dashboard)/layout';
import ErrorNotFound from '@/app/_components/ErrorNotFound';

const NotFound = () => {
  return (
    <DashboardLayout>
      <ErrorNotFound />
    </DashboardLayout>
  );
};

export default NotFound;
