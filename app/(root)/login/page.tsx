import '@/app/styles/_login.scss';

export default async function Login() {
  return (
    <div className="login__container">
      <h1>Login</h1>
      <form>
        <p>To continue, please sign in with your Google account.</p>
        <button type="submit">Sign in with Google</button>
      </form>
    </div>
  );
}
