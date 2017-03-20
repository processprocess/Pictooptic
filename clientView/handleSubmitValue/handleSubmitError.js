export default function handleSubmitError(err) {
  const searchInstructions = document.querySelector('.searchInstructions');
  searchInstructions.textContent = err;
  searchInstructions.classList.add('searchFlash');
  searchInstructions.addEventListener('animationend', function(e) { searchInstructions.classList.remove('searchFlash') });
}