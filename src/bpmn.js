const Modeler = require('bpmn-js/lib/Modeler').default;
const customEmailModule = require('../resourses/custom/email');

const emailRegExp = /^([a-zA-Z\d-_]+\.)*?[a-zA-Z\d][a-zA-Z\d-_]+\.[a-zA-Z]{2,11}?$/gim;
const blocks = new Map();

const modeler = new Modeler({
  container: '#canvas',
  additionalModules: [customEmailModule],
});
modeler.createDiagram().catch((_e) => {});

modeler.on('element.changed', async (event) => {
  const { element } = event;
  const className = 'EmailHandler';
  if (element.type !== 'bpmn:ServiceTask') return;
  if (!emailRegExp.test(element.businessObject.name)) return;
  if (!blocks.has(element.id)) {
    const elem = global.document.createElement('div');
    elem.dataset.id = element.id;
    elem.className = className;
    elem.innerHTML = element.businessObject.name;
    Object.assign(elem.style, {
      border: '1px solid #444',
      height: '30px',
      padding: '5px',
      display: 'inline',
    });
    global.document.getElementById('blocks').appendChild(elem);
    blocks.set(element.id, elem);
  } else {
    const { xml } = await modeler.saveXML();
    if (!new RegExp(`${element.id}`).test(xml)) {
      global.document.getElementById('blocks').removeChild(blocks.get(element.id));
      blocks.delete(element.id);
    }
  }
});

/**
 * Changes state of url blocks and changes it background
 *
 * @param elem {HTMLElement}                        Target HTML element
 * @param state {'wait'|'success'|'error'|''}       Actual state
 * @returns {void}
 */
function markUrlBlock(elem, state = '') {
  switch (state) {
    case 'wait':
      elem.style.background = '#ffd675';
      break;
    case 'success':
      elem.style.background = '#91ff8b';
      break;
    case 'error':
      elem.style.background = '#ff6c6c';
      break;
    default:
      elem.style.background = '#ffffff';
  }
}

/**
 * Sends urls to server and change element state depending in response status code
 * @param elemsWithUrl {HTMLElement[]}        List of url blocks
 * @returns {Promise<void>}
 */
async function sendUrlsToServer(elemsWithUrl) {
  for await (const elem of elemsWithUrl) {
    markUrlBlock(elem, 'wait');
    const response = await global.fetch(`http://localhost:9000/api/${elem.dataset.email}`);
    if (response.ok) {
      markUrlBlock(elem, 'success');
      break;
    } else markUrlBlock(elem, 'error');
  }
}

global.window.onload = () => {
  const start = global.document.getElementById('run');
  start.addEventListener('click', async () => {
    const name = global.document.getElementById('input').value;
    if (!name) return;

    const elemsWithUrl = [];
    blocks.forEach((i) => {
      markUrlBlock(i);
      i.dataset.email = `${name}@${i.innerText}`;
      elemsWithUrl.push(i);
    });

    await sendUrlsToServer(elemsWithUrl);
  });
};
