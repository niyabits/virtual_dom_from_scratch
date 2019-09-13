const CREATE = 'CREATE';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
const UPDATE = 'UPDATE';
const SET_PROP = 'SET_PROP';
const REMOVE_PROP = 'REMOVE PROP';

//// DIFF

function changed(node1, node2) {}

function diffProps(newNode, oldNode) {}

function diffChildren(newNode, oldNode) {}

function diff(newNode, oldNode) {}
//@


//// PATCH

function createElement(node) {
  //@
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  console.log(node);
  const el = document.createElement(node.type);
  setProps(el, node.props);
  node.children.map(createElement).forEach(el.appendChild.bind(el));
  return el;
}

function setProp(target, name, value) {
  //@
  if (name === 'className') {
    return target.setAttribute('class', value);
  }
  target.setAttribute(name, value);
}

function setProps(target, props) {
  Object.keys(props).forEach(name => {
    setProp(target, name, props[name]);
  });
}

function removeProp(target, name, value) {
  //@
}

function patchProps(parent, patches) {}

function patch(parent, patches, index = 0) {}
//@


//// My Application

function flatten(arr) {
  return [].concat.apply([], arr);
}

function h(type, props, ...children) {
  props = props || {};
  return { type, props, children: flatten(children) };
}

function view(count) {
  const r = [...Array(count).keys()];
  return h(
    'ul',
    { id: 'cool', className: `my-class-${count % 3}` },
    r.map(n => h(
      'li',
      null,
      'item ',
      (count * n).toString()
    ))
  );
}

function tick(el, count) {
  const patches = diff(view(count + 1), view(count));
  patch(el, patches);
  console.log(count, patches);
  if (count > 20) {
    return;
  }
  setTimeout(() => tick(el, count + 1), 500);
}

function render(el) {
  el.appendChild(createElement(view(0)));
  setTimeout(() => tick(el, 0), 500);
}
