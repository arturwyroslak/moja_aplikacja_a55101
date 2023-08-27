class Chatbot {
  constructor() {
    this.chatContainer = document.querySelector("#chat-container");
    this.inputField = document.querySelector("#input-field");
    this.sendBtn = document.querySelector("#send-btn");
    this.animationSpeed = 300; // czas trwania animacji w milisekundach
  }

  init() {
    this.addEventListeners();
  }

  addEventListeners() {
    this.sendBtn.addEventListener("click", this.handleSendMessage.bind(this));
    this.inputField.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.handleSendMessage();
      }
    });
  }

  handleSendMessage() {
    const message = this.inputField.value.trim();
    if (message !== "") {
      this.showMessage(message);
      this.inputField.value = "";
      this.inputField.focus();
    }
  }

  showMessage(message) {
    const chatBubble = document.createElement("div");
    chatBubble.classList.add("chat-bubble");
    chatBubble.textContent = message;

    this.animateFadeIn(chatBubble);
    this.chatContainer.appendChild(chatBubble);
    this.scrollChatToBottom();
  }

  animateFadeIn(element) {
    element.style.opacity = 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;

      if (elapsedTime >= this.animationSpeed) {
        element.style.opacity = 1;
        return;
      }

      const opacity = (elapsedTime / this.animationSpeed).toFixed(2);
      element.style.opacity = opacity;

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  scrollChatToBottom() {
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }
}

export default Chatbot;