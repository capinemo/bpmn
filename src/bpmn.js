const Modeler = require('bpmn-js/lib/Modeler');
const customEmailModule = require('../resourses/custom/email');

const emailRegExp = /^([a-zA-Z\d-_]+\.)*[a-zA-Z\d][a-zA-Z\d-_]+\.[a-zA-Z]{2,11}?$/gim;
const blocks = new Map();

const modeler = new Modeler.default({
  container: '#canvas',
  additionalModules: [customEmailModule]
});
modeler.createDiagram().catch(e => console.log(e));

modeler.on('element.changed', async event => {
  const element = event.element;
  const className = 'EmailHandler';
  if (element.type !== 'bpmn:ServiceTask') return;
  if (!emailRegExp.test(element.businessObject.name)) return;
  if (!blocks.has(element.id)) {
    const elem = document.createElement('div');
    elem.dataset.id = element.id;
    elem.className = className;
    elem.innerHTML = element.businessObject.name;
    Object.assign(elem.style, {
      border: '1px solid #444',
      height: '30px',
      padding: '5px',
      display: 'inline'
    });
    document.getElementById('blocks').appendChild(elem);
    blocks.set(element.id, elem);
  } else {
    const { xml } = await modeler.saveXML();
    if (!new RegExp(`${element.id}`).test(xml)) {
      document.getElementById('blocks').removeChild(blocks.get(element.id));
      blocks.delete(element.id);
    }
  }
});

window.onload = () => {
  const start = document.getElementById('run');
  start.addEventListener('click', async () => {
    const name = document.getElementById('input').value;
    if (!name) return;

    const elemsWithUrl = [];
    blocks.forEach(i => {
      i.style.background = '#ffffff';
      elemsWithUrl.push(i);
    });

    for await (const elem of elemsWithUrl) {
      elem.style.background = '#ffd675';
      let response = await fetch(`http://localhost:9000/api/${elem.innerText}`);
      if (response.ok) {
        elem.style.background = '#91ff8b';
        break;
      } else elem.style.background = '#ff6c6c';
    }
  });
};
