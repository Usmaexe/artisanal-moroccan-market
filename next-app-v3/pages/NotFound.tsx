import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Button from '@/components/common/Button';

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full text-center px-4">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
            <p className="text-gray-600">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or doesn&apos;t exist.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link href="/">
              <Button variant="primary" className="w-full">
                Go Back Home
              </Button>
            </Link>
            
            <Link href="/products">
              <Button variant="outline" className="w-full">
                Browse Products
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>
              If you believe this is an error, please{' '}
              <Link href="/contact" className="text-blue-600 hover:underline">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
