export function b64toBlob(b64Data: any, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

export function convertToBase64(selectedFile: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        let base64result = reader.result.split(",").pop()
        resolve(base64result)
      }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      reject(error)
    };
  });
}

export function downloadAsPDF(base64String: string, fileName: string) {
  if (base64String.startsWith("JVB")) {
    base64String = "data:application/pdf;base64," + base64String;
    downloadFileObject(base64String, fileName);
  } else if (base64String.startsWith("data:application/pdf;base64")) {
    downloadFileObject(base64String, fileName);
  } else {
    alert("Not a valid Base64 PDF string. Please check");
  }
}

export function downloadAs(base64String: string, fileName: string) {
  downloadFileObject(base64String, fileName);
}

export function extractMimeTypeFromBase64(base64String: string) {
  const match = base64String.match(/^data:([^/]+)\/([^;]+);base64/);
  if (match) {
    return match[1] + "/" + match[2];
  }
  return null; // If no match is found, return null
}

function downloadFileObject(base64String: string, fileName: string) {
  const contentType = extractMimeTypeFromBase64(base64String); // Get MIME type (optional)
  const byteString = atob(base64String.replace(/^data:\w+\/\w+;base64,/, ''));
  const mimeString = contentType || 'application/octet-stream'; // Default MIME type
  const bytes = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(bytes);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: mimeString });

  const downloadLink = document.createElement('a');
  downloadLink.href = window.URL.createObjectURL(blob);
  downloadLink.download = fileName;
  downloadLink.click();
}

