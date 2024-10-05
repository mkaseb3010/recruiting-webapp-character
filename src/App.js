import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST } from './consts.js';

function App() {
  const initialAttributes = {
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10
  };

  const [attributes, setAttributes] = useState(initialAttributes);

  const modifyAttribute = (attr, delta) => {
    // Ensuring the total of attributes does not exceed 70
    const totalAttributes = Object.values(attributes).reduce((acc, value) => acc + value, 0);
    if ((delta > 0 && totalAttributes >= 70) || (attributes[attr] + delta < 0)) {
      return; // Do not allow increase if total is 70 or decrease below 0
    }
    setAttributes(prevAttributes => ({
      ...prevAttributes,
      [attr]: prevAttributes[attr] + delta
    }));
  };

  //Added a function to check class requirments
  const checkClassRequirements = className => {
    const requirements = CLASS_LIST[className];
    return Object.entries(requirements).every(([key, value]) => attributes[key] >= value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="Attributes">
        {ATTRIBUTE_LIST.map(attr => (
          <div key={attr}>
            {attr}: {attributes[attr]}
            <button onClick={() => modifyAttribute(attr, 1)}>+</button>
            <button onClick={() => modifyAttribute(attr, -1)}>-</button>
          </div>
        ))}
      </section>
      <section className="Classes">
        <h2>Classes</h2>
        {Object.keys(CLASS_LIST).map(className => (
          <div key={className} className={checkClassRequirements(className) ? "qualified" : "not-qualified"}>
            {className} {checkClassRequirements(className) ? "(Qualified)" : "(Not Qualified)"}
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
