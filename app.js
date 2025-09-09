
//Register Service Worker ke Relative Path untuk di deploy ke Github Pages
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('Service Worker berhasil didaftarkan dengan scope:', registration.scope);
      })
      .catch(error => {
        console.log('Pendaftaran Service Worker gagal:', error);
      });
  });
}