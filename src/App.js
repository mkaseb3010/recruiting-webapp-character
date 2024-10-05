import { useState, useEffect } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';

const initialAttributes = {
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10
};

const initialSkillPoints = SKILL_LIST.reduce((acc, skill) => ({
    ...acc,
    [skill.name]: 0
}), {});

function App() {
    const githubUsername = 'mkaseb1'; 
    const apiUrl = `https://recruiting.verylongdomaintotestwith.ca/api/${githubUsername}}/character`;

    const [attributes, setAttributes] = useState(initialAttributes);
    const [skillPoints, setSkillPoints] = useState(initialSkillPoints);
    const [selectedClass, setSelectedClass] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data) {
                    setAttributes(data.attributes || initialAttributes);
                    setSkillPoints(data.skillPoints || initialSkillPoints);
                    setSelectedClass(data.selectedClass || null);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, [apiUrl]);

    const saveCharacterData = async () => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    attributes,
                    skillPoints,
                    selectedClass
                })
            });
            const data = await response.json();
            console.log('Data saved:', data);
        } catch (error) {
            console.error('Failed to save data:', error);
        }
    };

    // This will cause an error as i have only added the implementation for requirments #6
    return (
        <div className="App">
            <header className="App-header">
                <h1>React Coding Exercise</h1>
                <button onClick={saveCharacterData}>Save Character</button>
            </header>
            <section className="Attributes">
                {ATTRIBUTE_LIST.map(attr => (
                    <div key={attr} className="Attribute">
                        {attr}: {attributes[attr]}
                        <span> (Modifier: {calculateModifier(attributes[attr])})</span>
                        <button onClick={() => modifyAttribute(attr, 1)}>+</button>
                        <button onClick={() => modifyAttribute(attr, -1)}>-</button>
                    </div>
                ))}
            </section>
            <section className="Skills">
                <h2>Skills</h2>
                <p>Total Skill Points Available: {totalSkillPoints}</p>
                {SKILL_LIST.map(skill => (
                    <div key={skill.name} className="Skill">
                        {skill.name} - Points: {skillPoints[skill.name]}
                        [<button onClick={() => modifySkillPoints(skill.name, 1)}>+</button>]
                        [<button onClick={() => modifySkillPoints(skill.name, -1)}>-</button>]
                        Modifier ({skill.attributeModifier}): {calculateModifier(attributes[skill.attributeModifier])}
                        Total: {skillPoints[skill.name] + calculateModifier(attributes[skill.attributeModifier])}
                    </div>
                ))}
            </section>
            <section className="Classes">
                <h2>Classes</h2>
                {CLASS_LIST.map(className => (
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
