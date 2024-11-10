import ButtonHome from "./components/ButtonHome";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-page">
      <div className="w-full max-w-md container-bg p-10 rounded-lg shadow-lg text-center space-y-8">
        <h1 className="text-4xl font-bold text-color">Welcome to My App</h1>
        <p className="text-md text-secondary">
          Navegue pelas páginas para explorar.
        </p>
        
        <div className="flex flex-col gap-4 items-center">
          <ButtonHome href="/login">Login</ButtonHome>
          <ButtonHome href="/register">Register</ButtonHome>
          <ButtonHome href="/user-management">User Management</ButtonHome>
        </div>

        <footer className="mt-10 text-xs text-secondary space-y-1">
          <p>Desenvolvido com Next.js</p>
        </footer>
      </div>
    </div>
  );
}
