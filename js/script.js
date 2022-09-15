const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');
// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById('url').value;
  const size = document.getElementById('size').value;

  // Validate url
  if (url === '') {
    alert('Please enter a URL');
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);

      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save url
        const saveUrl = qr.querySelector('img').src;
        // Create save button
        createSaveBtn(saveUrl);
        createShareBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

// Generate QR code
const generateQRCode = (url, size) => {
  const qrcode = new QRCode('qrcode', {
    text: url,
    width: size,
    height: size,
  });
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = '';
  const saveBtn = document.getElementById('save-link');
  const shareBtn = document.getElementById('share');
  if (saveBtn) {
    saveBtn.remove();
    shareBtn.remove();
  }
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList =
    'bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 text-center rounded inline-block w-1/2 m-auto my-2 md:w-1/4';
  link.href = saveUrl;
  link.download = 'qrcode';
  link.innerHTML = 'Save Image';
  document.getElementById('saveshare').appendChild(link);
};

const createShareBtn = () => {
  const link = document.createElement('a');
  link.id = 'share';
  link.classList =
    'bg-red-500 hover:bg-red-700 text-white text-sm text-center font-bold py-2 inline-block rounded w-1/2 m-auto my-2md:w-1/4';
  link.innerHTML = 'Share Image';
  document.getElementById('saveshare').appendChild(link);
  link.addEventListener('click', shareQrCode);
};

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);
const shareCode = document.getElementById('share');
shareCode.addEventListener('click', shareQrCode);

function shareQrCode(ev){
  ev.preventDefault();
  const src = document.getElementById('qrcode').getElementsByTagName('img').src
  alert(src);
}

