import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST } from './consts.js';

function App() {
  // Initialize state for each attribute with a starting value of 10
  const initialAttributes = {
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10
  };

  // State to hold the current values of the attributes and track requirments that are displayed with respect to a clicked class
  const [attributes, setAttributes] = useState(initialAttributes);
  const [selectedClass, setSelectedClass] = useState(null);

  // Function to modify an attribute, ensuring the total does not exceed 70 and no attribute goes below 0
  const modifyAttribute = (attr, delta) => {
    const totalAttributes = Object.values(attributes).reduce((acc, value) => acc + value, 0);
    if ((delta > 0 && totalAttributes >= 70) || (attributes[attr] + delta < 0)) {
      return; 
    }
    setAttributes(prevAttributes => ({
      ...prevAttributes,
      [attr]: prevAttributes[attr] + delta
    }));
  };

  // Function to check if the current attributes meet the requirements for a given class
  const checkClassRequirements = className => {
    const requirements = CLASS_LIST[className];
    return Object.entries(requirements).every(([key, value]) => attributes[key] >= value);
  };

  // Function to handle clicking on a class name, setting the selected class to display its requirements
  const handleClassClick = className => {
    setSelectedClass(className);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="Attributes">
        {ATTRIBUTE_LIST.map(attr => (
          <div key={attr} className="Attribute">
            {attr}: {attributes[attr]}
            <button onClick={() => modifyAttribute(attr, 1)}>+</button>
            <button onClick={() => modifyAttribute(attr, -1)}>-</button>
          </div>
        ))}
      </section>
      <section className="Classes">
        <h2>Classes</h2>
        {Object.keys(CLASS_LIST).map(className => (
          <div key={className} 
               onClick={() => handleClassClick(className)}
               className={`Class ${checkClassRequirements(className) ? "qualified" : "not-qualified"}`}>
            {className}
          </div>
        ))}
        {selectedClass && (
          <div>
            <h3>Requirements for {selectedClass}:</h3>
            {Object.entries(CLASS_LIST[selectedClass]).map(([attr, req]) => (
              <div key={attr}>{attr}: {req}</div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
