const helpers = (() => {
  const main = document.getElementById("main");

  function createHtmlElement(tag, className, src, content) {
    let element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    if (src) {
      element.style.backgroundImage = `url('${src}')`;
    }
    if (content) {
      element.textContent = content;
    }
    return element;
  }
  return {
    createHtmlElement,
    main,
  };
})();
const eventListeners = (() => {
  let tempForImageSources = [];
  let tempForNode = [];

  function handleClick(e) {
    e.currentTarget.classList.add("flipped");
    let srcOfImg =
      e.currentTarget.children[0].children[0].style.backgroundImage;

    tempForNode.push(e.currentTarget);
    tempForImageSources.push(srcOfImg);

    if (tempForNode.length === 2 && tempForImageSources[0] === srcOfImg) {
      tempForNode.forEach((element) => {
        element.classList.add("fixed");
        element.removeEventListener("click", eventListeners.handleClick);
      });
    }
    if (tempForNode.length === 3) {
      tempForNode[0].classList.remove("flipped");
      tempForNode[1].classList.remove("flipped");
      tempForNode.shift();
      tempForNode.shift();
      tempForImageSources.shift();
      tempForImageSources.shift();
    }
  }
  function handleSubmit(e) {
    console.log(e.target.previousElementSibling.value);
    let numberOfBoxes = e.target.previousElementSibling.value;
    renderDom.renderPage(numberOfBoxes);
  }

  return {
    handleClick,
    handleSubmit,
  };
})();

const sources = (() => {
  function imageSrcCreater(amount) {
    let imageSrcList = [];

    for (let index = 0; index < amount / 2; index++) {
      imageSrcList.push(`img${index}.jpg`);
    }
    imageSrcList = [...imageSrcList, ...imageSrcList];

    return imageSrcList;
  }

  function numbers(amount) {
    let randomNumArray = [];
    while (randomNumArray.length < amount) {
      let randomNum = Math.floor(Math.random() * amount);

      if (randomNumArray.indexOf(randomNum) === -1) {
        randomNumArray.push(randomNum);
      }
    }
    return randomNumArray;
  }

  return { imageSrcCreater, numbers };
})();

const cacheDom = (() => {
  const boxArray = [];

  function boxFactory(amount) {
    const randomNumArray = sources.numbers(amount);
    const imageSourceList = sources.imageSrcCreater(amount);

    for (let index = 0; index < amount; index++) {
      let randomNum = randomNumArray[index];
      let boxWrapper = helpers.createHtmlElement("div", "box", null);
      let box = helpers.createHtmlElement(
        "div",
        `b${randomNum}`,
        imageSourceList[randomNum]
      );

      box.classList.add("back");
      let content = helpers.createHtmlElement("div", "content", null);
      let Front = helpers.createHtmlElement("div", "front", null);

      content.appendChild(box);
      content.appendChild(Front);
      boxWrapper.appendChild(content);

      boxArray.push(boxWrapper);
    }

    return boxArray;
  }

  const pageElementFactory = () => {
    const container = helpers.createHtmlElement(
      "div",
      "input-container",
      null,
      null
    );
    const inputNumber = helpers.createHtmlElement(
      "input",
      "input-number",
      null,
      null
    );
    inputNumber.type = "number";
    const inputSubmit = helpers.createHtmlElement(
      "input",
      "input-submit",
      null,
      null
    );
    inputSubmit.type = "submit";
    const infoOfNumber = helpers.createHtmlElement(
      "div",
      "info",
      null,
      "Choose between <low> and <high>"
    );

    container.appendChild(infoOfNumber);
    container.appendChild(inputNumber);
    container.appendChild(inputSubmit);

    inputSubmit.addEventListener("click", eventListeners.handleSubmit);
    return container;
  };

  return {
    boxFactory,
    pageElementFactory,
  };
})();

const renderDom = (() => {
  function cleanDom(params) {}
  function initializePage(params) {}

  main.appendChild(cacheDom.pageElementFactory());

  function renderPage(amount) {
    const boxes = cacheDom.boxFactory(amount);

    boxes.forEach((box) => {
      helpers.main.appendChild(box);
      box.addEventListener("click", eventListeners.handleClick);
    });
  }
  return {
    renderPage,
    cleanDom,
  };
})();
