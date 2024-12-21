const displayRepoContents = contents => {
  repoContainerEl.innerHTML = '';

  // Saltar el primer elemento
  contents.slice(1).forEach(item => {
    if (item.type === 'dir') {
      const button = document.createElement('button');
      button.textContent = `${item.name} Animation`;
      button.classList.add('btn');
      button.onclick = () => {
        const animationContainerEl = document.querySelector('#animation-container');
        animationContainerEl.src = `https://tallerdeldiablo.github.io/animations/${item.name}/`;

        const scriptBox = document.querySelector('#script-box');
        const scriptFile = `${item.name}/script.txt`;
        fetch(scriptFile)
          .then(response => {
            if (!response.ok) throw new Error('File not found');
            return response.text();
          })
          .then(data => {
            // Reemplaza saltos de línea por <br> para respetar el formato
            scriptBox.innerHTML = data.replace(/\n/g, '<br>');
          })
          .catch(() => {
            scriptBox.textContent = 'Script not available.';
          });
      };
      repoContainerEl.appendChild(button);
    }
  });
};
