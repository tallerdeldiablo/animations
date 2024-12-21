// Function to load a text file and insert its content into a specific element
const loadScript = (file, elementId) => {
    fetch(file)
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(`Failed to load ${file}`);
            }
        })
        .then(data => {
            document.getElementById(elementId).textContent = data;
        })
        .catch(error => {
            console.error(`Error loading the script file: ${file}`, error);
            document.getElementById(elementId).textContent = 'Unable to load script.';
        });
};

// Example usage to load a specific script dynamically
// Update the path to point to your desired script file
const loadAnimation = (folderName) => {
    const animationContainer = document.querySelector('#animation-container');
    const scriptTextContainer = document.querySelector('#scriptText');

    // Update iframe source to load the animation
    animationContainer.src = `https://tallerdeldiablo.github.io/animations/${folderName}/`;

    // Load the After Effects script from a text file
    const scriptPath = `${folderName}/script.txt`;
    loadScript(scriptPath, 'scriptText');
};
