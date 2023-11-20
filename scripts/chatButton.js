// Create the chat button
const chatButton = document.createElement("div");
chatButton.className = "chat-button";
const bgURL = chrome.runtime.getURL("../assets/bighead.png");
chatButton.style.backgroundImage = `url(${bgURL})`; // Keep dynamic styles in JS

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
    if (event.offsetX < button.offsetWidth - 20) {
      isDragging = false;
      dragStartY = event.clientY;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      button.ondragstart = () => false;
    }
  };

  function onMouseMove(event) {
    isDragging = true;
    let newY = dragStartY - event.clientY;
    dragStartY = event.clientY;
    let newTop = button.offsetTop - newY;
    // Keep the button within the viewport height
    if (newTop < 0) newTop = 0;
    else if (newTop > window.innerHeight - button.offsetHeight) newTop = window.innerHeight - button.offsetHeight;
    button.style.top = newTop + 'px';
  }

  function onMouseUp(event) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    if (!isDragging && event.offsetX < button.offsetWidth - 20) {
      showChatWindow();
      hideChatButton();
    }
    isDragging = false;
  }
}

makeDraggableY(chatButton); // Make the chat button draggable along Y-axis

function showChatButton() {
  const chatButton = document.querySelector('.chat-button');
  if (chatButton) chatButton.style.display = 'block';
}

function hideChatButton() {
  const chatButton = document.querySelector('.chat-button');
  if (chatButton) chatButton.style.display = 'none';
}

// Link the onclick event to an empty function since the chat window opening is handled in onMouseUp
chatButton.onclick = () => {};

document.body.appendChild(chatButton);
