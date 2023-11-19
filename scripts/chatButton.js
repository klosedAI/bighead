// Create the chat button
const chatButton = document.createElement("div");
chatButton.className = "chat-button";
//chatButton.style.backgroundImage = "url('URL_TO_YOUR_IMAGE')"; // Keep dynamic styles in JS

// Create the draggable indicator
const draggableIndicator = document.createElement("div");
draggableIndicator.className = "draggable-indicator";
draggableIndicator.innerHTML = "<div class='dot'></div>".repeat(3); // Assuming 'dot' is a class in CSS

// Append the draggable indicator to the button
chatButton.appendChild(draggableIndicator);

// Event to expand the button and show the drag indicator on hover
chatButton.onmouseenter = function() {
  chatButton.style.width = "70px"; // Expanded width
  draggableIndicator.style.display = "flex"; // Show drag indicator
  chatButton.style.cursor = "pointer"; // Cursor indicates a clickable area
};

// Event to shrink the button and hide the drag indicator when the mouse leaves
chatButton.onmouseleave = function() {
  chatButton.style.width = "50px"; // Initial width
  draggableIndicator.style.display = "none"; // Hide drag indicator
  chatButton.style.cursor = "ns-resize"; // Cursor indicates vertical movement
};

// Variables to track drag state
let isDragging = false;
let dragStartY = 0;

// Function to make the chat button draggable along the Y-axis
function makeDraggableY(button) {
  button.onmousedown = function(event) {
    // Only allow dragging if we're not at the edge of the button (allows for click events)
    if (event.offsetX < button.offsetWidth - 20) {
      isDragging = false;
      dragStartY = event.clientY;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      button.ondragstart = () => false; // Prevent default drag action
    }
  };

  function onMouseMove(event) {
    isDragging = true;
    let newY = dragStartY - event.clientY;
    dragStartY = event.clientY;
    let newTop = button.offsetTop - newY;
    // Keep the button within the viewport height
    if (newTop < 0) {
      newTop = 0;
    } else if (newTop > window.innerHeight - button.offsetHeight) {
      newTop = window.innerHeight - button.offsetHeight;
    }
    button.style.top = newTop + 'px';
  }

  function onMouseUp(event) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    // Open the chat window only if the mouse hasn't moved (i.e., it's a click, not a drag)
    if (!isDragging && event.offsetX < button.offsetWidth - 20) {
      createChatWindow();
    }
    isDragging = false; // Reset the dragging state
  }
}

makeDraggableY(chatButton); // Make the chat button draggable along Y-axis

// Function to create the chat window
function createChatWindow() {
  // Create an iframe for the chat window
  const chatIframe = document.createElement('iframe');
  chatIframe.id = 'chat-iframe';
  chatIframe.src = chrome.runtime.getURL('html/chatWindow.html');

  // Apply the CSS class to the iframe
  chatIframe.classList.add('chat-window');

  document.body.appendChild(chatIframe);
  chatButton.style.display = 'none'; // Hide the chat button
}


// Link the onclick event to an empty function since the chat window opening is handled in onMouseUp
chatButton.onclick = () => {};

document.body.appendChild(chatButton);
