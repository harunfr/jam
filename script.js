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
  return {
    handleClick,
  };
})();
const sources = (() => {
  let imageSrcList = [];
  let randomNumArray = [];

  for (let index = 0; index < 8; index++) {
    imageSrcList.push(`img${index}.jpg`);
  }
  imageSrcList = [...imageSrcList, ...imageSrcList];

  const randomNumbersArrayCreator = () => {
    while (randomNumArray.length < 16) {
      let randomNum = Math.floor(Math.random() * 16);

      if (randomNumArray.indexOf(randomNum) === -1) {
        randomNumArray.push(randomNum);
      }
    }
    return randomNumArray;
  };

  const numbers = randomNumbersArrayCreator();

  return { imageSrcList, numbers };
})();

const cacheDom = (() => {
  const boxArray = [];

  function boxFactory() {
    for (let index = 0; index < 16; index++) {
      let randomNum = sources.numbers[index];
      let boxWrapper = helpers.createHtmlElement("div", "box", null);
      let box = helpers.createHtmlElement(
        "div",
        `b${randomNum}`,
        sources.imageSrcList[randomNum]
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
  return {
    boxFactory,
  };
})();

const renderDom = (() => {
  let sixteenBox = cacheDom.boxFactory(16);
  sixteenBox.forEach((box) => {
    helpers.main.appendChild(box);
    box.addEventListener("click", eventListeners.handleClick);
  });
})();
