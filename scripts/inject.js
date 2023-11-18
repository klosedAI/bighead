const createSidebar = () => {
    const rootElement = document.createElement("div");
    rootElement.style.setProperty("all", "initial");
  
    const sidebarClassName = "sidebar";
    const width = 400;
    const rootShadow = rootElement.attachShadow({ mode: "closed" });
    rootShadow.innerHTML = `
      <style>
        .${sidebarClassName} {
          height: 100vh;
          width: ${width}px;
          position: fixed;
          top: 0px;
          right: -${width}px;
          background-color: white;
          transition: right 0.15s ease-in;
          z-index: 1000; // Adjusted for a more reasonable value
        }
      </style>
      <div class="${sidebarClassName}">
        Hello there!
      </div>
    `;
    const sidebar = rootShadow.querySelector(`.${sidebarClassName}`);
  
    // Function to toggle the sidebar
    const toggleSidebar = () => {
      const isVisible = sidebar.style.right === '0px';
      sidebar.style.right = isVisible ? `${-width}px` : '0px';
    };
  
    // Add a button to toggle the sidebar
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Sidebar";
    toggleButton.onclick = toggleSidebar;
    document.body.appendChild(toggleButton); // Append the button to the body
  
    return rootElement;
  };
  
  const initializeSidebar = () => {
    const rootElement = createSidebar();
    document.body.appendChild(rootElement);
  };
  
  initializeSidebar();
  