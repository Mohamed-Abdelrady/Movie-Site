const sideBar = document.querySelector('.left .bars'),
  left = document.querySelector('.left .sideBar');

sideBar.addEventListener('click', () => {
  sideBar.classList.toggle('active');
  left.classList.toggle('active');
  document.body.classList.toggle('active');
});
