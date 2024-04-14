import dropdownToggle from '@js/modules/dropdown-toggle';
import toggleTabs from '@js/modules/toggle-tabs';
import setNavActiveState from '@js/modules/nav-active-state';

onload = () => {
  document.documentElement.style.scrollBehavior = "smooth";
};

dropdownToggle();
toggleTabs();
setNavActiveState();