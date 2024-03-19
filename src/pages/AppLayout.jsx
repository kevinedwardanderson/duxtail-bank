import AppHeader from '../layout-components/AppHeader';
import Footer from '../layout-components/Footer';
import Main from '../layout-components/Main';

function AppLayout() {
  return (
    <div className=" grid h-dvh w-dvw grid-rows-12">
      <AppHeader />
      <Main />
      <Footer />
    </div>
  );
}

export default AppLayout;
