export default function dropdownToggle() {

  const dropdownsCtrl = document.querySelectorAll('[data-dropdown-ctrl]');
  const dropdowns = document.querySelectorAll('[data-dropdown]');

  dropdownsCtrl.forEach(function(el) {
    el.addEventListener('click', function(ctrl) {
      ctrl.target.closest('[data-dropdown]').classList.toggle('_active');
    });
  });

  document.addEventListener('click', function(el) {
    if (!el.target.closest('[data-dropdown]')) {
      dropdowns.forEach(function(el) {
        el.classList.remove('_active');
      });
    }
  });
}
