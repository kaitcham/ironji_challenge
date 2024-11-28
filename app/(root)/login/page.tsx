import '@/app/styles/_login.scss';
import { signIn } from '@/auth';

export default async function Login() {
  return (
    <div className="login__container">
      <h1>Login</h1>
      <form
        action={async () => {
          'use server';
          await signIn('google', { redirectTo: '/dashboard' });
        }}
      >
        <p>To continue, please sign in with your Google account.</p>
        <button type="submit">Sign in with Google</button>
      </form>
    </div>
  );
}
