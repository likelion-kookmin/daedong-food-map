import { MediaContextProvider } from 'utils/style.util';
import DesktopLayout from './desktop.layout';
import MobileLayout from './mobile.layout';
import PropTypes from 'prop-types';

const ResponsiveLayout = ({ children }) => (
  <MediaContextProvider>
    <DesktopLayout>{children}</DesktopLayout>
    <MobileLayout>{children}</MobileLayout>
  </MediaContextProvider>
);

ResponsiveLayout.propTypes = {
  children: PropTypes.node,
};

export default ResponsiveLayout;
