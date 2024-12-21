const displayRepoContents = contents => {
    repoContainerEl.innerHTML = '';
    contents.forEach(item => {
      if (item.type === 'dir') {
        const button = document.createElement('button');
        button.textContent = `${item.name} Animation`;
        button.classList.add('btn');
        button.onclick = () => {
          // Actualizar el iframe para mostrar la animación
          const animationContainerEl = document.querySelector('#animation-container');
          animationContainerEl.src = `https://tallerdeldiablo.github.io/animations/${item.name}/`;
  
          // Cargar el contenido del archivo txt en texto plano
          const scriptBox = document.querySelector('#script-box');
          const scriptFile = `${item.name}/script.txt`;
          fetch(scriptFile)
            .then(response => {
              if (!response.ok) throw new Error('File not found');
              return response.text();
            })
            .then(data => {
              scriptBox.textContent = data; // Asegúrate de usar textContent para texto plano
            })
            .catch(() => {
              scriptBox.textContent = 'Script not available.';
            });
        };
        repoContainerEl.appendChild(button);
      }
    });
  };
  