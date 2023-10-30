const statementElement2 = document.getElementById("statement2");
const statementText2 = "चलो शुरू करें...";
const cursorElement = document.createElement("span");
cursorElement.classList.add("cursor");
statementElement2.appendChild(cursorElement);

function typeWriter() {
    let charIndex = 0;
    const typingInterval = setInterval(() => {
        if (charIndex < statementText2.length) {
            statementElement2.insertBefore(
                document.createTextNode(statementText2.charAt(charIndex)),
                cursorElement
            );
            charIndex++;
        } else {
            clearInterval(typingInterval);
        }
    }, 100);
}

window.addEventListener("load", () => {
    typeWriter();
});
