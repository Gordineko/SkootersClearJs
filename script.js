let skootersBlock = document.querySelector(".scooters__list");
let productBlock = document.querySelector(".presentation");
let advantagesBlocks = document.querySelectorAll(".advantages__list__item");
let descriptionBlocks = document.querySelectorAll(".advantages__description");
let overviewBlocks = document.querySelectorAll(".overview__txt");
let scrollContent = document.querySelector(".specifications__list");
let btnLeft = document.querySelector(".btn-arrow-left");

let isActiveCardId = "";
let arrScooters = {};
let isActiveCard = null;
let isActiveAdvantageBlock = null;

const urlScooters = "http://localhost:3000/scooters";
const urlAccessories = "http://localhost:3000/accessories";

const getScooters = (url) => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      createScooterList(data);
      activeScooterCard(
        data,
        skootersBlock.querySelector(".scooters__list__card")
      );
      specificationsRender(data);
    });
};

const getAccessories = (url) => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      createAccessoriesList(data);
    });
};

const renderDataAndListener = () => {
  getScooters(urlScooters);
  getAccessories(urlAccessories);
  addAdvantagesListener();
  addOverviewListener();
  checkActiveAdventage();
  videoTimer();
  addOverflowArrowClick();
};
const createScooterList = (scooterList) => {
  scooterList.map((el) => {
    creatSkooterCard(el, scooterList);
  });
};
const creatSkooterCard = (el, scooterList) => {
  let block = document.createElement("div");
  block.classList = "scooters__list__card";
  block.id = el.id;

  let blockImg = document.createElement("div");
  blockImg.classList = "scooters__list__card__img";

  let img = document.createElement("img");
  img.src = el.src;

  let txt = document.createElement("span");
  txt.textContent = el.model;

  block.appendChild(blockImg);
  blockImg.appendChild(img);
  block.appendChild(txt);

  skootersBlock.appendChild(block);

  block.onclick = (e) => {
    scooterCardClick(e);
    activeScooterCard(scooterList, block);
  };
};

const scooterCardClick = (e) => {
  const parentBlock = e.currentTarget.closest(".scooters__list__card");
  isActiveCardId = parentBlock.id;
};

const activeScooterCard = (skooterList, block) => {
  if (!isActiveCard) {
    // Активируем первый блок по умолчанию
    const firstBlock = skootersBlock.querySelector(".scooters__list__card");
    if (firstBlock) {
      firstBlock.classList.add("active");
      isActiveCard = firstBlock;
      isActiveCardId = firstBlock.id;
    }
  } else {
    isActiveCard.classList.remove("active");
  }

  skooterList.forEach((el) => {
    if (parseInt(el.id) === parseInt(isActiveCardId)) {
      block.classList.add("active");
      isActiveCard = block;
      createProductPresentation(skooterList, isActiveCard);
    }
  });
};
const createProductPresentation = (arr, activeCard) => {
  productBlock.innerHTML = "";
  arr.map((el) => {
    if (parseInt(el.id) === parseInt(activeCard.id)) {
      let block = document.createElement("div");
      block.classList.add("presentation__card");
      let blockContent = document.createElement("div");
      blockContent.classList.add("presentation__card__content");

      let blockTxt = document.createElement("div");
      blockTxt.classList = "presentation__card__content__model";
      let txt = document.createElement("txt");
      txt.textContent = el.name;

      let img = document.createElement("img");
      img.src = el.src;

      blockTxt.appendChild(txt);

      blockContent.appendChild(blockTxt);
      creatProductBuyBlock(el, blockContent);

      block.appendChild(blockContent);

      block.appendChild(img);
      productBlock.appendChild(block);
    }
  });
};

const creatProductBuyBlock = (el, block) => {
  let newPrice = Math.ceil(parseInt(el.cost.replace("$", ""), 10) * 1.13);

  let mainBlock = document.createElement("div");
  mainBlock.classList.add("presentation__card__payment");

  let costEndGiftBlock = document.createElement("div");
  costEndGiftBlock.classList.add("presentation__card__payment__cost");

  let mainTxt = document.createElement("span");
  mainTxt.textContent = "Add an extended warranty from Extend";

  let costTxt = document.createElement("span");
  costTxt.textContent = newPrice;
  costTxt.classList.add("presentation__card__payment__cost__sell");

  let costSellTxt = document.createElement("span");
  costSellTxt.textContent = el.cost;

  let giftTxt = document.createElement("a");
  giftTxt.textContent = "Segway Protective Gear Set as a gift";

  let giftImg = document.createElement("img");
  giftImg.src = "./img/skooters/atributs.png";

  let BtnBlock = document.createElement("div");
  BtnBlock.classList.add("presentation__card__payment__btn");

  let buyBtn = document.createElement("button");
  buyBtn.textContent = "BUY IT NOW";
  let addBtn = document.createElement("button");
  addBtn.textContent = "ADD TO CART";

  mainBlock.appendChild(mainTxt);

  costEndGiftBlock.appendChild(costTxt);
  costEndGiftBlock.appendChild(costSellTxt);
  costEndGiftBlock.appendChild(giftTxt);
  costEndGiftBlock.appendChild(giftImg);

  mainBlock.appendChild(costEndGiftBlock);

  BtnBlock.appendChild(buyBtn);
  BtnBlock.appendChild(addBtn);

  mainBlock.appendChild(BtnBlock);
  block.appendChild(mainBlock);
};

const advantagesClick = (e) => {
  const parentBlock = e.currentTarget.closest(".advantages__list__item");

  advantagesBlocks.forEach((el) => {
    el.classList.remove("active");
    if (el === parentBlock) {
      el.classList.add("active");
      isActiveAdvantageBlock = el;
    }
  });
  descriptionBlocks.forEach((el) => {
    el.classList.remove("visibility");
    if (el.id === isActiveAdvantageBlock.id) {
      el.classList.add("visibility");
    }
  });
};

const addAdvantagesListener = () => {
  advantagesBlocks.forEach((el) => {
    el.addEventListener("click", advantagesClick);
  });
};

const checkActiveAdventage = () => {
  if (isActiveAdvantageBlock === null) {
    advantagesBlocks.forEach((el) => {
      if (el.id === "4") {
        el.classList.add("active");
        isActiveAdvantageBlock = el;
      }
    });
    descriptionBlocks.forEach((el) => {
      if (el.id === isActiveAdvantageBlock.id) {
        el.classList.add("visibility");
      }
    });
  }
};
const createAccessoriesList = (scooterList) => {
  scooterList.map((el) => {
    createAccessoriesCardBlock(el);
  });
};

const createAccessoriesCardBlock = (el) => {
  const accessoriesBlock = document.querySelector(".accessories__list");

  let block = document.createElement("div");
  block.classList.add("accessories__list__item");

  let blockImg = document.createElement("div");

  blockImg.classList.add("accessories__list__item__img-block");

  let blockShadow = document.createElement("div");
  blockShadow.classList.add("accessories__list__item__shadow");

  let img = document.createElement("img");
  img.src = el.src;
  img.style.width = el.width + "px";
  img.style.height = el.height + "px";
  img.style.left = el.left;
  img.style.top = el.top;

  img.classList.add("accessories__list__item__img");

  let name = document.createElement("h3");
  name.textContent = el.name;
  name.classList.add("accessories__list__item__name");

  let txt = document.createElement("p");
  txt.textContent = el.description;
  txt.classList.add("accessories__list__item__description");

  let cost = document.createElement("p");
  cost.textContent = el.cost;
  cost.classList.add("accessories__list__item__cost");

  let btn = document.createElement("button");
  btn.textContent = "ADD TO CART";
  btn.classList.add("accessories__list__item__btn");

  blockImg.appendChild(img);
  block.appendChild(blockImg);
  block.appendChild(blockShadow);
  block.appendChild(name);
  block.appendChild(txt);
  block.appendChild(cost);
  block.appendChild(btn);

  accessoriesBlock.appendChild(block);
};

const videoTimer = () => {
  let myVideo = document.querySelector(".myVideo");

  myVideo.addEventListener("loadedmetadata", function () {
    myVideo.currentTime = 30;
  });
};

const addOverviewListener = () => {
  overviewBlocks.forEach((el) => {
    el.addEventListener("click", overviewClick);
  });
};

const overviewClick = (e) => {
  const svgList = document.querySelectorAll(".svg-line");
  const pointList = document.querySelectorAll(".point");
  const parentBlock = e.currentTarget.closest(".overview__txt");

  overviewBlocks.forEach((el) => {
    el.classList.remove("active");
    if (el === parentBlock) {
      el.classList.add("active");
      isActiveOverviewBlock = el;
    }
  });
  pointList.forEach((el) => {
    el.classList.remove("active");
    if (el.id === isActiveOverviewBlock.id) {
      el.classList.add("active");
    }
  });
  svgList.forEach((el) => {
    const paths = el.querySelectorAll("path");
    el.setAttribute("stroke", "#323941");
    el.setAttribute("opacity", "0.1");
    if (el.id === isActiveOverviewBlock.id) {
      console.log(paths);
      el.setAttribute("stroke", "#009eff");
      el.setAttribute("opacity", "0.5");
    }
  });
};

const checkActiveOverview = () => {
  if (isActiveAdvantageBlock === null) {
    advantagesBlocks.forEach((el) => {
      if (el.id === "4") {
        el.classList.add("active");
        isActiveAdvantageBlock = el;
      }
    });
    descriptionBlocks.forEach((el) => {
      if (el.id === isActiveAdvantageBlock.id) {
        el.classList.add("visibility");
      }
    });
  }
};
const specificationsRender = (array) => {
  array.map((element) => {
    specificationsCreate(element);
  });
};
const specificationsCreate = (element) => {
  const listSpecifications = document.querySelector(".specifications__list");
  if (element.id == 1) {
    addSpecificationsTitle(element, listSpecifications);
    return;
  }

  const block = document.createElement("div");
  block.classList = "specifications__list__item";

  const img = document.createElement("img");
  img.src = element.src;
  block.appendChild(img);

  const h3 = document.createElement("h3");
  h3.textContent = element.name;
  block.appendChild(h3);

  const speed = document.createElement("p");
  speed.textContent = element.maxSpead;
  block.appendChild(speed);

  const reng = document.createElement("p");
  reng.textContent = element.maxDistance;
  block.appendChild(reng);

  const battery = document.createElement("p");
  battery.textContent = element.battery;
  block.appendChild(battery);

  const weight = document.createElement("p");
  weight.textContent = element.weight;
  block.appendChild(weight);

  const payload = document.createElement("p");
  payload.textContent = element.lifting;
  block.appendChild(payload);

  const chargin = document.createElement("p");
  chargin.textContent = element.timeCharged;
  block.appendChild(chargin);

  const numbersOfButtery = document.createElement("p");
  numbersOfButtery.textContent = element.numOfButteries;
  block.appendChild(numbersOfButtery);

  const power = document.createElement("p");
  power.textContent = element.powerEngine;
  block.appendChild(power);

  const outputPower = document.createElement("p");
  outputPower.textContent = element.power;
  block.appendChild(outputPower);

  const incline = document.createElement("p");
  incline.textContent = element.incline;
  block.appendChild(incline);

  const cost = document.createElement("p");
  cost.textContent = element.cost;
  cost.style.textAlign = "center";
  cost.style.fontSize = "25px";
  cost.style.paddingTop = "38px";
  cost.style.border = "none";
  block.appendChild(cost);

  const btn = document.createElement("button");
  btn.textContent = "BUY IT NOW";
  block.appendChild(btn);
  listSpecifications.appendChild(block);
};

const addSpecificationsTitle = (element, parentBlock) => {
  const block = document.createElement("div");
  const txtBlock = document.createElement("div");
  txtBlock.style.transform = "translateY(-3px)";
  block.classList = "specifications__list__item__main";

  const img = document.createElement("img");
  img.src = element.src;
  block.appendChild(img);

  const h3 = document.createElement("h3");
  h3.textContent = element.name;
  block.appendChild(h3);

  const speedTitle = document.createElement("p");
  speedTitle.textContent = "Max. speed";
  speedTitle.classList = "title";
  txtBlock.appendChild(speedTitle);

  const speed = document.createElement("p");
  speed.textContent = element.maxSpead;
  txtBlock.appendChild(speed);

  const rengTitle = document.createElement("p");
  rengTitle.textContent = "Range (miles)";
  rengTitle.classList = "title";
  txtBlock.appendChild(rengTitle);

  const reng = document.createElement("p");
  reng.textContent = element.maxDistance;
  txtBlock.appendChild(reng);

  const batteryTitle = document.createElement("p");
  batteryTitle.textContent = "Battery Capacity";
  batteryTitle.classList = "title";
  txtBlock.appendChild(batteryTitle);

  const battery = document.createElement("p");
  battery.textContent = element.battery;
  txtBlock.appendChild(battery);

  const weightTitle = document.createElement("p");
  weightTitle.textContent = "Net Weight";
  weightTitle.classList = "title";
  txtBlock.appendChild(weightTitle);

  const weight = document.createElement("p");
  weight.textContent = element.weight;
  txtBlock.appendChild(weight);

  const payloadTitle = document.createElement("p");
  payloadTitle.textContent = "Payload";
  payloadTitle.classList = "title";
  txtBlock.appendChild(payloadTitle);

  const payload = document.createElement("p");
  payload.textContent = element.lifting;
  txtBlock.appendChild(payload);

  const charginTitle = document.createElement("p");
  charginTitle.textContent = "Chargin Time";
  charginTitle.classList = "title";
  txtBlock.appendChild(charginTitle);

  const chargin = document.createElement("p");
  chargin.textContent = element.timeCharged;
  txtBlock.appendChild(chargin);

  const numbersOfButteryTitle = document.createElement("p");
  numbersOfButteryTitle.textContent = "Number of Batteries";
  numbersOfButteryTitle.classList = "title";
  txtBlock.appendChild(numbersOfButteryTitle);

  const numbersOfButtery = document.createElement("p");
  numbersOfButtery.textContent = element.numOfButteries;
  txtBlock.appendChild(numbersOfButtery);

  const powerTitle = document.createElement("p");
  powerTitle.textContent = "Motor power";
  powerTitle.classList = "title";
  txtBlock.appendChild(powerTitle);

  const power = document.createElement("p");
  power.textContent = element.powerEngine;
  txtBlock.appendChild(power);

  const outputPowerTitle = document.createElement("p");
  outputPowerTitle.textContent = "Power Output";
  outputPowerTitle.classList = "title";
  txtBlock.appendChild(outputPowerTitle);

  const outputPower = document.createElement("p");
  outputPower.textContent = element.power;
  txtBlock.appendChild(outputPower);

  const inclineTitle = document.createElement("p");
  inclineTitle.textContent = "Max. Incline";
  inclineTitle.classList = "title";
  txtBlock.appendChild(inclineTitle);

  const incline = document.createElement("p");
  incline.textContent = element.incline;
  incline.style.marginBottom = "50px";
  txtBlock.appendChild(incline);

  const cost = document.createElement("p");
  cost.textContent = element.cost;
  cost.style.textAlign = "center";
  cost.style.fontSize = "25px";
  cost.style.marginBottom = "50px";
  cost.style.paddingTop = "38px";
  cost.style.border = "none";

  txtBlock.appendChild(cost);

  const btn = document.createElement("button");
  btn.textContent = "BUY IT NOW";
  txtBlock.appendChild(btn);

  block.appendChild(txtBlock);
  parentBlock.appendChild(block);
};

const addOverflowArrowClick = () => {
  btnRight = document.querySelector(".btn-arrow-right");
  btnLeft = document.querySelector(".btn-arrow-left");
  btnRight.addEventListener("click", scrollContentRight);
  btnLeft.addEventListener("click", scrollContentLeft);
};

function scrollContentRight() {
  btnLeft.classList.add("active");

  let scrollStep = 100;

  let start = scrollContent.scrollLeft;

  let end = start + scrollStep;

  animateScroll(start, end, 500);
}
function scrollContentLeft() {
  btnLeft.classList.add("active");

  let scrollStep = 100;

  let start = scrollContent.scrollLeft;

  let end = start - scrollStep;

  animateScroll(start, end, 500);
}
function animateScroll(start, end, duration) {
  let startTime = null;

  function step(time) {
    if (!startTime) {
      startTime = time;
    }

    const progress = (time - startTime) / duration;
    const easeInOutCubic =
      progress < 0.5
        ? 4 * progress ** 3
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    scrollContent.scrollLeft = start + easeInOutCubic * (end - start);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
renderDataAndListener();
