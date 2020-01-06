"use strict";

let deferredInstallPrompt = null;
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);

//Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

/**
*Event handler for beforeinstallprompt event.
* Saves the event and shows install butoon
* 
*@param{event} evt
*/
function saveBeforeInstallPromptEvent(evt){
  deferredInstallPrompt = evt;
  installButton.removeAttribute('hidden');
}

/**
*Event handler for butInstall - Does the PWA installation.
*
*@param {Event} evt
*/
function installPWA(evt){
  //show install prompt
  deferredInstallPrompt.prompt();
  
  //Hide the install button, it can't be called twice.
  evt.srcElement.setAttribute("hidden", true);
  
  //Log user response to prompt.
  deferredInstallPrompt.userChoice.then(choice =>{
    if(choice.outcone === "accepted"){
      console.log("User accepted the A2H5 prompt", choice);
    } else {
      console.log("User dismissed the A2H5 prompt", choice);
    }
    deferredInstallPrompt = null;
  });
} // installPWA

window.addEventListener('appinstalled', logAppInstalled);

/**
*Event handler for appinstalled event.
* Log the installation to analytics or save the event somehow.
*
*@param {event} evt
*/
function logAppInstalled(evt){
  //Log he event, in a real app, you would save this information
  // in a file, database, or analytics software
  console.log('Weather App was installed.', evt);
}
