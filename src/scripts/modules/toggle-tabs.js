export default function toggleTabs() {

  const tabs = document.querySelectorAll('[data-tab]');
  const tabsContent = document.querySelectorAll('[data-tab-content]');
  const activeState = '_active';

  tabs.forEach((tab) => {
    tab.addEventListener('click', (event) => {
      tabs.forEach((el) => el.classList.remove(activeState));
      tabsContent.forEach((el) => el.classList.remove(activeState));
      tab.classList.add(activeState);
      document.getElementById(tab.dataset.tab).classList.add(activeState);
    });
  });
}
