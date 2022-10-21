const form = document.getElementById("generate-form");
const qr = document.getElementById("qrCode");

// Button Submit
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;
  const cDark = document.getElementById('color-dark').value;
  const cLight = document.getElementById('color-light').value;
  const fileName = document.getElementById('filename').value;

  // Validate URL
  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size, cDark, cLight);

      //Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save Url
        const saveUrl = qr.querySelector('img').src;
        // Create save Button
        createSaveBtn(saveUrl, fileName);
      },50);  
    }, 1000); // 1000ms = 1sec
  }
};

// Generate QR Code and save Button
const generateQRCode = (url, size, colorDark, colorLight) => {
  return ( qrCode = new QRCode("qrCode", {
    text: url,
    width: size,
    height: size,
    colorDark: colorDark,
    colorLight: colorLight,
  }));
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
};

// Clear previous QR and SaveBtn Image.
const clearUI = () => {
  qr.innerHTML = "";
  const saveLink = document.getElementById('save-link');  
  if (saveLink) saveLink.remove();      // remove saveImage btn every Time.
};

const createSaveBtn = (saveUrl, fileName) => {
    //fileName Validation
    if (fileName === ''){
        fileName = 'qrCode';
    }

  const link = document.createElement("a");
  link.id = 'save-link';
  link.classList =
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
    link.href = saveUrl;
    link.download = fileName;
    link.innerHTML = 'Save Image';
    document.getElementById('generated').appendChild(link);

};

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
