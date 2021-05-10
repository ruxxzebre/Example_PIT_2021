function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const DynamicSelects = ({ data, label }) => {
		const [state, setState] = React.useState({selectedOptions:{}});
    const [ready, setReady] = React.useState(false);
    
    React.useEffect(() => {
    	if (Object.keys(state).length && data) {
      	setReady(true);
      }
    }, [state, data]);
    
	
    return (
    	<div>
        {label && <p>{label}</p>}
        {ready && <OptionsList
          options={data}
          onChange={(selectedOptions) => setState({ selectedOptions })}
          selectedOptions={state.selectedOptions}
        />}
      </div>
    );
 }

// Recursive component
const OptionsList = ({ options, selectedOptions, onChange, nestLevel = 0 }) => {

  const handleCheckboxClicked = (selectedOptionId) => {
    // is currently selected
    if (selectedOptions[selectedOptionId]) {
      // remove selected key from options list
      delete selectedOptions[selectedOptionId];
    } else {
      // is not currently selected
      // Add selected key to optionsList
      selectedOptions[selectedOptionId] = {};
    }
    // call onChange function given by parent
    onChange(selectedOptions);
  };

  const handleSubOptionsListChange = (optionId, subSelections) => {
    // add sub selections to current optionId
    selectedOptions[optionId] = subSelections;
    // call onChange function given by parent
    onChange(selectedOptions);
  };

  return (
    <div>
      {options.map((option, idx) => {
	if (!option.id) option.id = uuid();
return (
        <ul>
          <Checkbox
            key={option.id + option.name + idx}
            selected={selectedOptions[option.id]}
            label={option.name}
            id={option.id}
            hasNest={option.subOptions.length > 0}
            onChange={() => handleCheckboxClicked(option.id)}
            nestLevel={nestLevel}
          />
          {/* Base Case */}
          {option.subOptions.length > 0 && selectedOptions[option.id] && (
            <OptionsList
              options={option.subOptions}
              key={() => uuid()}
              selectedOptions={selectedOptions[option.id]}
              onChange={(subSelections) =>
                handleSubOptionsListChange(option.id, subSelections)
              }
              nestLevel={nestLevel + 1}
            />
          )}
        </ul>
      )})}
    </div>
  );
};

const DisableSelectionStyles = {
  '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
     '-khtml-user-select': 'none',
       '-moz-user-select': 'none',
        '-ms-user-select': 'none',
            'user-select': 'none'
}


const Checkbox = ({ selected, label, onChange, id, hasNest, nestLevel = 0 }) => {
  return (
    <div className="singlebox-container">
      <span className={'singlebox ' + ([ 
          "nestLevel_0_color", 
          "nestLevel_1_color", 
          "nestLevel_2_color", 
          "nestLevel_3_color" 
      ][nestLevel] && 'nestLevel_default_color')} onClick={() => onChange(!selected)}>{label}</span>
    </div>
  );
};


const Main = () => {
	return (
  	<div>
      <p>Рекурсивний рендеринг за допомогою React</p>
      <DynamicSelects data={nestedData} />
    </div>
  );
}

ReactDOM.render(<Main />, document.getElementById('root'));