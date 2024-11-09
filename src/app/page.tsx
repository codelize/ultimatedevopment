import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-page">
      <div className="w-full max-w-md container-bg p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-color">Welcome to My App</h1>
        <p className="text-sm text-secondary mb-8">
          Navegue pelas páginas principais do aplicativo para começar.
        </p>
        
        <div className="flex flex-col gap-4 items-center">
          <Link href="/login">
            <span className="button-primary text-center py-2 w-48">Login</span>
          </Link>
          <Link href="/register">
            <span className="button-primary text-center py-2 w-48">Register</span>
          </Link>
          <Link href="/user-management">
            <span className="button-primary text-center py-2 w-48">User Management</span>
          </Link>
        </div>

        <footer className="mt-8 text-xs text-secondary">
          <p className="mb-2">Desenvolvido com Next.js</p>
          <div className="flex gap-4 justify-center">
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Read our docs
            </a>
            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Deploy now
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
