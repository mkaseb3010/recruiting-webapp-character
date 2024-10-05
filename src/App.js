import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';

function App() {
  // Initialize each character with default attributes, skills, and class
  const initialCharacter = {
    attributes: {
      Strength: 10,
      Dexterity: 10,
      Constitution: 10,
      Intelligence: 10,
      Wisdom: 10,
      Charisma: 10
    },

    skillPoints: SKILL_LIST.reduce((acc, skill) => ({
      ...acc,
      [skill.name]: 0
    }), {}),
    selectedClass: null
  };

  const [characters, setCharacters] = useState([initialCharacter]);

  // Modify attribute for a specific character with respect to their index
  const modifyAttribute = (charIndex, attr, delta) => {
    const newCharacters = [...characters];
    const character = newCharacters[charIndex];
    const totalAttributes = Object.values(character.attributes).reduce((acc, value) => acc + value, 0);

    if ((delta > 0 && totalAttributes >= 70) || (character.attributes[attr] + delta < 0)) {
      return;
    }

    character.attributes[attr] += delta;
    setCharacters(newCharacters);
  };

  // Modify skill points for a specific character with respect to their index
  const modifySkillPoints = (charIndex, skill, delta) => {
    const newCharacters = [...characters];
    const character = newCharacters[charIndex];
    const totalSpentPoints = Object.values(character.skillPoints).reduce((acc, value) => acc + value, 0);
    const intelligenceModifier = Math.floor((character.attributes.Intelligence - 10) / 2);
    const totalSkillPoints = 10 + (4 * intelligenceModifier);

    if ((delta > 0 && totalSpentPoints >= totalSkillPoints) || (character.skillPoints[skill] + delta < 0)) {
      return;
    }

    character.skillPoints[skill] += delta;
    setCharacters(newCharacters);
  };

  // Set the class for a specific character with respect to their index
  const handleClassClick = (charIndex, className) => {
    const newCharacters = [...characters];
    newCharacters[charIndex].selectedClass = className;
    setCharacters(newCharacters);
  };

  // Add a new character to the list
  const addCharacter = () => {
    setCharacters([...characters, { ...initialCharacter }]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
        <button onClick={addCharacter}>Add New Character</button>
      </header>
      {characters.map((character, index) => (
        <div key={index}>
          <h2>Character {index + 1}</h2>
          <section className="Attributes">
            {ATTRIBUTE_LIST.map(attr => (
              <div key={attr} className="Attribute">
                {attr}: {character.attributes[attr]}
                <span> (Modifier: {Math.floor((character.attributes[attr] - 10) / 2)})</span>
                <button onClick={() => modifyAttribute(index, attr, 1)}>+</button>
                <button onClick={() => modifyAttribute(index, attr, -1)}>-</button>
              </div>
            ))}
          </section>
          <section className="Skills">
            <h2>Skills</h2>
            <p>Total Skill Points Available: {10 + (4 * Math.floor((character.attributes.Intelligence - 10) / 2))}</p>
            {SKILL_LIST.map(skill => (
              <div key={skill.name} className="Skill">
                {skill.name} - Points: {character.skillPoints[skill.name]}
                [<button onClick={() => modifySkillPoints(index, skill.name, 1)}>+</button>]
                [<button onClick={() => modifySkillPoints(index, skill.name, -1)}>-</button>]
                Modifier ({skill.attributeModifier}): {Math.floor((character.attributes[skill.attributeModifier] - 10) / 2)}
                Total: {character.skillPoints[skill.name] + Math.floor((character.attributes[skill.attributeModifier] - 10) / 2)}
              </div>
            ))}
          </section>
          <section className="Classes">
            <h2>Classes</h2>
            {Object.keys(CLASS_LIST).map(className => (
              <div key={className}
                   onClick={() => handleClassClick(index, className)}
                   className={`Class ${Object.entries(CLASS_LIST[className]).every(([key, value]) => character.attributes[key] >= value) ? "qualified" : "not-qualified"}`}>
                {className}
              </div>
            ))}
            {character.selectedClass && (
              <div>
                <h3>Requirements for {character.selectedClass}:</h3>
                {Object.entries(CLASS_LIST[character.selectedClass]).map(([attr, req]) => (
                  <div key={attr}>{attr}: {req}</div>
                ))}
              </div>
            )}
          </section>
        </div>
      ))}
    </div>
  );
}

export default App;
