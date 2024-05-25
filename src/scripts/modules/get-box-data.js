export default function getBoxData() {
 
  const checkNode = document.querySelector('[data-box-check]');

  if(!checkNode) return;

  const inputWallet = document.getElementById('wallet');
  const button = document.getElementById('wallet-button');
  const closeButton = document.querySelector('[data-box-wallet-close]');
  const loadingState = '_loading';
  const openingState = '_box-opening';
  const disabledState = '_disabled';
  const activeState = '_active';
  const errorState = '_error';
  const body = document.getElementsByTagName('body')[0];
  const openingVideo = document.querySelectorAll('[data-opening-video]');
  const walletNameNode = document.querySelector('[data-box-wallet-name]');
  const resultsNode = document.querySelector('[data-box-results]');

  const dataObj = {data: {
    found: true,
    wallet: "UQBgHYhgeluxz6lMeLFtIUo6pqRfdGBCbJB6sEByPHpGfXz9",
    wallet_short: "UQBgH*****GfXz9",
    total_boxes: 2,
    boxes: [
      {
        box_address: "qwe",
        box_level: "bronze",
        rewards: [
          {
            type: "nft",
            name: "Durev NFT",
            amount: 1,
            luck_percent: 56,
          },
          {
            type: "jetton",
            name: "Durev",
            amount: 8888,
            luck_percent: 100,
          },
          {
            type: "nft",
            name: "Pixel NFT",
            amount: 0,
            luck_percent: 5,
          },
        ],
      },
      {
        box_address: "DDD",
        box_level: "ruby",
        rewards: [
          {
            type: "XP",
            name: "ANON XP",
            amount: 200,
            luck_percent: 44,
          },
          {
            type: "jetton",
            name: "Durev",
            amount: 30,
            luck_percent: 99,
          },
          {
            type: "nft",
            name: "Stories NFT",
            amount: 0,
            luck_percent: 7,
          },
        ],
      },
    ],
  }}

  console.log('button ', button);

  button.addEventListener('click', () => {

    console.log('button');

    const walletId = inputWallet.value.replace(/\s/g, '');
    const url = `https://checker.anon.tg/wallet/${walletId}`;
    

    console.log('Data ', dataObj);

    body.classList.add(loadingState);
    button.setAttribute('disabled', true);
    button.classList.add(disabledState);
    button.classList.add(loadingState);

    //   fetch(url)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(`error receiving data: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log('received data:', data);
    //     body.classList.remove(loadingState);
    //     button.classList.remove(disabledState);
    //     button.classList.remove(loadingState);
    //     button.removeAttribute('disabled');

    //     setStatusClassnames(data);
    //     checkNode.classList.remove(activeState);
    //     resultsNode.classList.add(activeState);
        
    //   })
    //   .catch(error => {
    //     body.classList.remove(loadingState);
    //     button.classList.remove(disabledState);
    //     button.classList.remove(loadingState);
    //     button.removeAttribute('disabled');
    //     inputWallet.classList.add(errorState);

    //     if (error.message.includes('404')) {
    //       console.error('No data found');

    //     } else {
    //       console.error('error:', error);
    //     }
    //   });
    // });

    setStatusClassnames(dataObj);
    
  });

  // temp
  setStatusClassnames(dataObj);

  closeButton.addEventListener('click', () => {

    console.log('closeButton');

    inputWallet.value = '';
    setTimeout(function(){
      inputWallet.focus();
    }, 600);
    checkNode.classList.add(activeState);
    resultsNode.classList.remove(activeState);

    // body.classList.remove('_raffle-countdown');
    // body.classList.remove('_raffle-result');
    // body.classList.add('_raffle-start');

  });

  function setStatusClassnames(dataObj) {

    console.log('setStatusClassnames');

    walletNameNode.textContent = dataObj.data.wallet_short;

    const boxesList = document.getElementById('boxes-list');

dataObj.data.boxes.forEach(box => {
  const boxItem = document.createElement('li');
  boxItem.className = 'boxes__item';
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
      <div class="score__item">
        <div class="score__value">
          <div class="box-item">
            <div class="box-item__pic" data-box-item-name="${reward.name}"></div>
            <div class="box-item__body">
              <div class="box-item__type">${reward.type}</div>
              <div class="box-item__name">${reward.name}</div>
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
    <div class="score">
      <div class="score__table">
        <div class="score__item">
          <div class="score__label">Item</div>
          <div class="score__label">Probability</div>
        </div>
        ${rewardsHTML}
      </div>
    </div>
    <div class="boxes__pre-note">Click the open button to see what prizes you've won.</div>
    <div class="box-checker">
      <button class="box-checker__btn btn" data-check-btn>Open</button>
    </div>
    <div class="boxes__congrat">
      Congratulations, here are the prizes you've won
    </div>
    <div class="score">
      <div class="score__table">
        <div class="score__item">
          <div class="score__label">Item</div>
          <div class="score__label">Quantity</div>
        </div>
        ${rewardsHTML2}
      </div>
    </div>
    <div class="boses__note">These items will be delivered to your wallet within 24 hours.</div>
  `;

  boxesList.appendChild(boxItem);

  // Добавляем обработчик событий для кнопки
  boxItem.querySelector('[data-check-btn]').addEventListener('click', () => {
    boxItem.classList.add('_active');

    showOpening();
  });
});

    // if (data.data.eligible) {
    //   body.classList.add(`_retro-level-${data.data.reward.level}`);
    //   body.classList.add(`_retro-${data.data.reward.type}`);
    //   body.classList.add(`_retro-hold-${data.data.reward.points.hold}`);
    //   body.classList.add(`_retro-donate-${data.data.reward.points.donate}`);
  
    //   if (data.data.raffle) {
    //     body.classList.add('_retro-hold-raffle');
    //   }
  
    //   donatedNode.textContent = data.data.reward.donated;
    //   walletNameNode.textContent = data.data.wallet_short;

    // } else {

    //   body.classList.add('_retro-not-eligible');
    //   walletNameNode.textContent = data.data.wallet_short;
    // }


    // if (data.data.raffle_winner) {
    //   body.classList.add('_retro-raffle-winner');
    //   body.classList.add(`_retro-raffle-level-${data.data.raffle_reward_level}`);
    // } else {
    //   body.classList.add('_retro-raffle-loser');
    // }

  }

  function showOpening() {
    document.documentElement.setAttribute('data-modal-active', true);
    body.classList.add(openingState);
    resetAndPlayVideo();

    setTimeout(function() {
      document.documentElement.setAttribute('data-modal-active', false);
      body.classList.remove(openingState);
    }, 8000);
  }

  function resetAndPlayVideo() {
    openingVideo.forEach(function(video) {
      video.currentTime = 0;
      video.play();
  });


}
}
