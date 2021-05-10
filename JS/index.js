const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const toArray = (obj) => {
	return Object.keys(obj).map((key) => obj[key]);
};

const renderOption = (x, nestLevel) => {
		const container = document.createElement("div");
    const singlebox = document.createElement("span");
    container.className = 'singlebox-container';
    singlebox.innerText = x.name;
    singlebox.className = 'singlebox ' + ([ 
        "nestLevel_0_color", 
        "nestLevel_1_color", 
        "nestLevel_2_color", 
        "nestLevel_3_color" 
    ][nestLevel] && 'nestLevel_default_color');
    container.appendChild(singlebox);
    return container;
};

const renderList = () => document.createElement("ul");
const renderListItem = () => document.createElement("div");
const removeChildren = (element) => {
	while (element.firstChild) {
    				element.removeChild(element.firstChild);
  }
};
const isThereChildren = (element) => !!element.children.length;

const renderUser = (arr, node, nestLevel = 0) => {
  return arr.map((x) => {
    const newListItem = renderListItem();
    const option = renderOption(x, nestLevel);
    newListItem.appendChild(option);
    
    if (x.subOptions.length > 0) {
       const newSubList = renderList();
       newListItem.appendChild(newSubList);
       option.onclick = () => {
       	if (isThereChildren(newSubList)) removeChildren(newSubList);
        else renderUser(x.subOptions, newSubList, nestLevel + 1);
       };
    }
    if (node) node.appendChild(newListItem);
    return newListItem;
  });
};
const getSpan = (text, html = false) => {
	const t = document.createElement('span');
  if (html)
  	t.innerHTML = text;
  else
	  t.innerText = text;
  return t;
};

document.addEventListener('DOMContentLoaded', () => {
	document.getElementsByTagName('body')[0].prepend(getSpan('Рекурсивний рендеринг на JS'));
  const container = document.getElementById('main');
  const items = renderUser(data, null);
  [...items].forEach((node, idx) => container.appendChild(node));
});

