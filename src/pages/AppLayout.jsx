import AppHeader from '../layout-components/AppHeader';
import Footer from '../layout-components/Footer';
import Main from '../layout-components/Main';

function AppLayout() {
  return (
    <div className="h-dvh w-dvw">
      <AppHeader />
      <main className="relative">
        <Main />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
