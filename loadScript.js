const displayRepoContents = contents => {
  repoContainerEl.innerHTML = '';

  contents.slice(1).forEach(item => {
    if (item.type === 'dir') {
      const button = document.createElement('button');
      button.textContent = `${item.name} Animation`;
      button.classList.add('btn');
      button.onclick = () => {
        const animationContainerEl = document.querySelector('#animation-container');
        animationContainerEl.src = `https://tallerdeldiablo.github.io/animations/${item.name}/`;

        const scriptBox = document.querySelector('#script-box');
        const scriptFile = `${item.name}/script.json`;
        fetch(scriptFile)
          .then(response => response.json())
          .then(data => {
            // Crear formato del contenido del JSON
            scriptBox.innerHTML = `
              <h3>${data.title}</h3>
              <p>${data.description}</p>
              <h4>Expressions:</h4>
              <pre><strong>Lower Horizontal:</strong>\n${data.expressions.lowerHorizontal}</pre>
              <pre><strong>Upper Horizontal:</strong>\n${data.expressions.upperHorizontal}</pre>
              <pre><strong>Right Vertical:</strong>\n${data.expressions.rightVertical}</pre>
              <pre><strong>Left Vertical:</strong>\n${data.expressions.leftVertical}</pre>
            `;
          })
          .catch(() => {
            scriptBox.textContent = 'Script not available.';
          });
      };
      repoContainerEl.appendChild(button);
    }
  });
};
