// moosend-loader.ts

export function loadMoosendScript(formId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if the Moosend script has already loaded
    if (window.mootrack) {
      resolve();
    } else {
      // Create the Moosend script element
      const moosendScript = document.createElement('script');
      moosendScript.src = 'https://cdn.stat-track.com/statics/moosend-tracking.min.js';
      moosendScript.async = true;
      moosendScript.id = 'moosend-script';

      moosendScript.onload = () => {
        // Define the mootrack function to avoid runtime errors
        //window.mootrack = window.mootrack || function () {};

        // Call your tracking function after the Moosend script is loaded
        window.mootrack('loadForm', formId);
        resolve();
      };

      moosendScript.onerror = (error) => {
        reject(error);
      };

      // Append the Moosend script to the document head
      document.head.appendChild(moosendScript);
    }
  });
}
