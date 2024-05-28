export default function getBoxData() {
 
  const checkNode = document.querySelector('[data-box-check]');

  if(!checkNode) return;

  const inputWallet = document.getElementById('wallet');
  const button = document.getElementById('wallet-button');
  const shareButton = document.querySelector('[data-share-button]');
  const closeButton = document.querySelector('[data-box-wallet-close]');
  const closeModalButton = document.querySelector('[data-close-modal-btn]');
  const loadingState = '_loading';
  const loadingSharedState = '_loading-shared';
  const showSaredButtonState = '_share-button';
  const openingState = '_box-opening';
  const hasOpenedState = '_box-has-opened';
  const disabledState = '_disabled';
  const activeState = '_active';
  const errorState = '_error';
  const sharedState = '_shared';
  const body = document.getElementsByTagName('body')[0];
  const openingVideo = document.querySelectorAll('[data-opening-video]');
  const walletNameNode = document.querySelector('[data-box-wallet-name]');
  const resultsNode = document.querySelector('[data-box-results]');

//   const data = {data: {
//     found: true,
//     wallet: "UQBgHYhgeluxz6lMeLFtIUo6pqRfdGBCbJB6sEByPHpGfXz9",
//     wallet_short: "UQBgH*****GfXz9",
//     total_boxes: 2,
//     boxes: [
//     {
//         box_address: "eluxzlMeUQBgHYLFtIUo6pqRfdGB6lMe",
//         box_level: "bronze",
//         rewards: [
//           {
//             type: "nft",
//             name: "Egg Wisdom",
//             amount: 8,
//             luck_percent: 56,
//           },
//           {
//             type: "jetton",
//             name: "ANON",
//             amount: 8888,
//             luck_percent: 99,
//           },
//           {
//             type: "sbt",
//             name: "ANON XP",
//             amount: 2,
//             luck_percent: 16,
//           },
//           {
//             type: "nft",
//             name: "ANON TV",
//             amount: 1,
//             luck_percent: 6,
//           },
//           {
//             type: "nft",
//             name: "The Pixels",
//             amount: 9,
//             luck_percent: 10,
//           },
//           {
//             type: "nft",
//             name: "Anonymous numbers",
//             amount: 1,
//             luck_percent: 2,
//           },
//           {
//             type: "nft",
//             name: "Storm",
//             amount: 20,
//             luck_percent: 50,
//           },
//           {
//             type: "nft",
//             name: "Zifretta",
//             amount: 7,
//             luck_percent: 23,
//           },
//           {
//             type: "jetton",
//             name: "Jetton",
//             amount: 2500,
//             luck_percent: 13,
//           },
//           {
//             type: "nft",
//             name: "ANON Agent ID",
//             amount: 3,
//             luck_percent: 7,
//           },
//         ],
//       },
//       {
//         box_address: "dGRfyzBCbJB6BgHYh",
//         box_level: "ruby",
//         rewards: [
//           {
//             type: "nft",
//             name: "Egg Wisdom",
//             amount: 14,
//             luck_percent: 87,
//           },
//           {
//             type: "jetton",
//             name: "ANON",
//             amount: 35000,
//             luck_percent: 24,
//           },
//           {
//             type: "sbt",
//             name: "ANON XP",
//             amount: 0,
//             luck_percent: 1,
//           },
//           {
//             type: "nft",
//             name: "ANON TV",
//             amount: 0,
//             luck_percent: 0,
//           },
//           {
//             type: "nft",
//             name: "The Pixels",
//             amount: 3,
//             luck_percent: 2,
//           },
//           {
//             type: "nft",
//             name: "Anonymous numbers",
//             amount: 0,
//             luck_percent: 0,
//           },
//           {
//             type: "nft",
//             name: "Storm",
//             amount: 14,
//             luck_percent: 33,
//           },
//           {
//             type: "nft",
//             name: "Zifretta",
//             amount: 0,
//             luck_percent: 0,
//           },
//           {
//             type: "jetton",
//             name: "Jetton",
//             amount: 415,
//             luck_percent: 48,
//           },
//           {
//             type: "nft",
//             name: "ANON Agent ID",
//             amount: 1,
//             luck_percent: 6,
//           },
//         ],
//       },
//     ],
//   }
// }


  console.log('button ', button);

  button.addEventListener('click', () => {

    console.log('button');

    doMagic();

  });

  shareButton.addEventListener('click', (el) => {

    if (!navigator.clipboard) {
      return;
    }

    const url = 'https://anon.tg/box/?id=' + body.getAttribute('data-wallet');

    console.log('url', url);

    navigator.clipboard.writeText(url).then(function() {

      el.target.closest('button').classList.add(activeState);

      setTimeout(() => {
        el.target.closest('button').classList.remove(activeState);
      }, 1300);

    }, function(err) {
      console.error('Could not copy text: ', err);
    });
    

  });

  function doMagic(sharedId) {
    let url;

    if(sharedId) {
      url = `https://checker.anon.tg/reveal/${sharedId}`;
      console.log('sharedId !!!!!!!!!!!!');
    } else {
      const walletId = inputWallet.value.replace(/\s/g, '');
      body.setAttribute('data-wallet', walletId);
      url = `https://checker.anon.tg/reveal/${walletId}`;
    }

    body.classList.add(loadingState);
    button.setAttribute('disabled', true);
    button.classList.add(disabledState);
    button.classList.add(loadingState);

    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`error receiving data: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('received data:', data);
      body.classList.remove(loadingState);
      button.classList.remove(disabledState);
      button.classList.remove(loadingState);
      button.removeAttribute('disabled');

      addBoxesHtml(data);
      addBoxItemsListHtml(data);
      checkNode.classList.remove(activeState);
      resultsNode.classList.add(activeState);

      if(sharedId) {
        body.classList.remove(loadingSharedState);
        body.classList.add(sharedState);
      }
      
    })
    .catch(error => {
      body.classList.remove(loadingState);
      button.classList.remove(disabledState);
      button.classList.remove(loadingState);
      button.removeAttribute('disabled');
      inputWallet.classList.add(errorState);

      if(sharedId) {
        body.classList.remove(loadingSharedState);
      }

      if (error.message.includes('404')) {
        console.error('No data found');

      } else {
        console.error('error:', error);
      }
    });
  }

  closeButton.addEventListener('click', () => {
    const boxItems = document.querySelectorAll('.js-box-item');
    boxItems.forEach(function(item) {
      item.classList.remove('_active');
    });

    console.log('closeButton');

    inputWallet.value = '';
    setTimeout(function(){
      inputWallet.focus();
    }, 600);
    button.setAttribute('disabled', true);
    checkNode.classList.add(activeState);
    resultsNode.classList.remove(activeState);
    body.classList.remove(sharedState);
    body.classList.remove(loadingSharedState);
    body.classList.remove(showSaredButtonState);
    body.removeAttribute('data-wallet');
  });

  closeModalButton.addEventListener('click', () => {
    let boxAddress = body.dataset.boxAddress;
    document.documentElement.setAttribute('data-modal-active', false);
    body.setAttribute('data-box-address', false);
    body.classList.remove(openingState);
    body.classList.remove(hasOpenedState);
    const items = document.querySelectorAll('.box-items-logo-list__item[data-box-address]');
    const boxItems = document.querySelectorAll('.js-box-item');

    items.forEach(function(item) {
      item.classList.remove('_active');
    });

    boxItems.forEach(function(item) {
      if (boxAddress === item.getAttribute('data-box-address')) {
          item.classList.add('_active');
      }
    });

    console.log('close boxAddress', boxAddress);

    setTimeout(function(){
      showSaredButton();
    }, 2000);

  });

  function addBoxesHtml(data) {

    console.log('addBoxesHtml');

    walletNameNode.textContent = data.data.wallet_short;

    const boxesList = document.getElementById('boxes-list');

    data.data.boxes.forEach(box => {
      const boxItem = document.createElement('li');
      boxItem.className = 'boxes__item js-box-item';
      boxItem.setAttribute('data-box-address', box.box_address);
      boxItem.dataset.boxLevel = box.box_level;

      let rewardsHTML = '';
      box.rewards.forEach(reward => {
        rewardsHTML += `
          <div class="score__item">
            <div class="score__value">${reward.name}</div>
            <div class="score__value">${reward.luck_percent}%</div>
          </div>
        `;
      });

      let rewardsHTML2 = '';
      box.rewards.forEach(reward => {
        rewardsHTML2 += `
          <div class="score__item" data-box-item-amount="${reward.amount}">
            <div class="score__value">
              <div class="box-item">
                <div class="box-item__pic" data-box-item-name="${reward.name}"></div>
                <div class="box-item__body">
                  <div class="box-item__type">${reward.type}</div>
                  <div class="box-item__name">${reward.name} <span class="box-item__rarity">${(reward.rarity !== null ? reward.rarity : '')}</span></div>
                </div>
              </div>
            </div>
            <div class="score__value">${reward.amount}</div>
          </div>
        `;
      });

      boxItem.innerHTML = `
        <div class="boxes__header">
          <div class="boxes__title">BOX REVEAL</div>
          <div class="boxes__sub-title">List of things you can win</div>
        </div>
        <div class="boxes__probability score">
          <div class="score__table">
            <div class="score__item">
              <div class="score__label">Item</div>
              <div class="score__label">Probability</div>
            </div>
            ${rewardsHTML}
          </div>
        </div>
        <div class="boxes__pre-note">Click the open button to&nbsp;see what prizes you&rsquo;ve won.</div>
        <div class="boxes__box-checker box-checker">
          <button class="box-checker__btn btn" data-check-btn>Open</button>
        </div>
        <div class="boxes__congrat">
          Congratulations, <br/> here are the prizes you&rsquo;ve won
        </div>
        <div class="boxes__result score score--box-items">
          <div class="score__table">
            <div class="score__item">
              <div class="score__label">Item</div>
              <div class="score__label">Quantity</div>
            </div>
            ${rewardsHTML2}
          </div>
        </div>
        <div class="boxes__note">These items will be&nbsp;delivered to&nbsp;your wallet within 24&nbsp;hours.</div>
      `;

      boxesList.appendChild(boxItem);

      boxItem.querySelector('[data-check-btn]').addEventListener('click', (el) => {
        //boxItem.classList.add('_active');
        let boxAddress = el.target.closest('[data-box-address]').dataset.boxAddress;

        showOpening(boxAddress);
      });
    });
  }

function addBoxItemsListHtml(data) {
    const listElement = document.getElementById('box-items-logo-list');
    const ulElement = document.createElement('ul');
    ulElement.className = 'box-items-logo-list__list';
  
    data.data.boxes.forEach((box) => {
      const liElement = document.createElement('li');
      liElement.className = 'box-items-logo-list__item';
      liElement.dataset.boxAddress = box.box_address;
  
      box.rewards.forEach((reward) => {
        if (reward.amount === 0) {
          return;
        }

        const divElement = document.createElement('div');
        divElement.className = 'box-item box-item--dark box-items-logo-list__box';
        divElement.innerHTML = `
          <div class="box-item__pic" data-box-item-name="${reward.name}"></div>
        `;

        // <div class="box-item__body">
        //     <div class="box-item__type">${reward.type}</div>
        //     <div class="box-item__name">${reward.name}</div>
        //   </div>
  
        liElement.appendChild(divElement);
      });
  
      ulElement.appendChild(liElement);
    });
  
    listElement.appendChild(ulElement);
}

  function showOpening(boxAddress) {
    document.documentElement.setAttribute('data-modal-active', true);
    body.classList.add(openingState);
    body.setAttribute('data-box-address', boxAddress);

    const items = document.querySelectorAll('.box-items-logo-list__item[data-box-address]');

    resetAndPlayVideo();

    setTimeout(function() {
      body.classList.add(hasOpenedState);

    items.forEach(function(item) {
        if (boxAddress === item.getAttribute('data-box-address')) {
            item.classList.add('_active');
        }
    });
    }, 5600);
  }

  function resetAndPlayVideo() {
    openingVideo.forEach(function(video) {
      video.currentTime = 0;
      video.play();
  });

  }

  function showSaredButton() {
      const boxItems = document.querySelectorAll('.js-box-item');
      let allActive = true;
      boxItems.forEach(element => {
        if (!element.classList.contains('_active')) {
            allActive = false;
        }
      });

      if (allActive && navigator.clipboard) {
          document.body.classList.add(showSaredButtonState);
      }
  }

  shareResults();

  function shareResults() {
    console.log('shareResults');
    let url = new URL(window.location.href);
    let paramValue = url.searchParams.get('id');
    if (paramValue !== null) {
      console.log('Значение параметра:', paramValue);
      body.classList.add(loadingSharedState);
      doMagic(paramValue);
    }
  }
}