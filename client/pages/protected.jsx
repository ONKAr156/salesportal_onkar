// pages/protected-page.js

import { useRouter } from 'next/router';

const ProtectedPage = ({ user }) => {
  const router = useRouter();

  // Check if user is authenticated
  if (!user) {
    // Redirect to login page
    router.push('/login');
    return null;
  }

  // Render the protected content
  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      {/* Your protected content goes here */}
    </div>
  );
};

export async function getServerSideProps(context) {
  // Check user authentication using context.req or your authentication mechanism
  const user = context.req.user; // Example: Assuming user is stored in the request object

  // Pass the user data to the component
  return {
    props: {
      user,
    },
  };
}

export default ProtectedPage;
