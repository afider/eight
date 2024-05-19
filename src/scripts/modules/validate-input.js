export default function validateInput() {
  const inputWallet = document.getElementById('wallet');

  if(!inputWallet) return;

  const button = document.getElementById('wallet-button');
  const disabledState = '_disabled';

  inputWallet.addEventListener('input', function() {

    const value = this.value.trim();
    this.classList.remove('_error');

    // Проверяем, что введено минимум 5 символов (буквы, цифры или знаки препинания)
    if (value.length >= 5) {
      button.classList.remove(disabledState);
      button.removeAttribute('disabled');
    } else {
      button.classList.add(disabledState);
      button.setAttribute('disabled', true);
    }

    // Ваш код обработки события input здесь
    console.log('Значение поля ввода:', this.value);

  });

  inputWallet.addEventListener('keypress', function(event) {
  
      if (event.key === 'Enter') {
        button.click();
      }
  });
}
