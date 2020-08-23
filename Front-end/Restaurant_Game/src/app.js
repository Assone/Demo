import './assets/styles/index.scss';

function getComponent(hash) {
  const temp = {};

  Object.entries(hash).forEach(([key, selector]) => {
    temp[key] = document.querySelector(selector);
  })

  return temp;
}

let component = getComponent({
  containerInfo: '#container__info',
  containerKitchenette: '#container__kitchenette',
  containerDiningArea: '#container__dining-area',
  containerWaitingArea: '#container__waiting-area',
});

component.containerKitchenette.addEventListener('click', evt => {
  
})