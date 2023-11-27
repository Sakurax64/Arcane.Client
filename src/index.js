const input = document.getElementById("input");
const gameOutput = document.getElementById("game-output");
const chatOutput = document.getElementById("chat-output");
const systemOutput = document.getElementById("system-output");
const gameTab = document.getElementById("game-tab");
const chatTab = document.getElementById("chat-tab");
const systemTab = document.getElementById("system-tab");
const outputs = [gameOutput, chatOutput, systemOutput];
const tabs = [gameTab, chatTab, systemTab];

let options = {
	scrolling: true,
	activeTab: document.getElementById("game-tab")
};

options.activeTab.classList.add("active");

initialize();

//input field
input.addEventListener("keydown", (key) => {
	if (key.key == "Enter") {
		if (input.value == "/scrolling") {
			if (options.scrolling == true) {
				options.scrolling = false;
				console.log("auto scroll off");

			} else {
				options.scrolling = true;
				console.log("auto scroll on");

			}
		} else if (input.value == "/clear") {
			clear(tabs[options.activeTab]);

		} else {
			displayText(`You: ${input.value}\n`, outputs[tabs.indexOf(options.activeTab)]);

		}
		input.value = "";

	}
});

//tab switching
for (const tab of tabs) {
	tab.addEventListener("click", (event) => {
		switchTab(event.target);
	});
}

function displayText(message, output) {
	if (tabs.indexOf(options.activeTab) == outputs.indexOf(output)) {
		const p = output.appendChild(document.createElement("p"));
		p.classList.add("textbox");
		p.innerText = message;

		if (options.scrolling == true) {
			p.scrollIntoView({ behavior: "smooth" });
		}
	} else {
		newMessage(tabs[outputs.indexOf(output)]);
		const p = output.appendChild(document.createElement("p"));
		p.classList.add("textbox");
		p.innerText = message;

		if (options.scrolling == true) {
			p.scrollIntoView({ behavior: "smooth" });
		}
	}

}

function clear(tab) {
	tab.innerHTML = "";
}

function switchTab(tab) {
	outputs[tabs.indexOf(options.activeTab)].classList.add("hidden");
	outputs[tabs.indexOf(tab)].classList.remove("hidden");

	options.activeTab.classList.remove("active");
	tab.classList.add("active");

	if (tab.classList.contains("notification")) {
		tab.classList.remove("notification");
	}

	options.activeTab = tab;
}

function newMessage(tab) {
	if (tab != options.activeTab) {
		tab.classList.add("notification");
	}
}

function initialize() {
	for (const tab of tabs) {
		if (tab != options.activeTab) {
			outputs[tabs.indexOf(tab)].classList.add("hidden");
		}
	}

	displayText("Welcome to the Game!", systemOutput);
	displayText("You will receive system messages in this channel.", systemOutput);
	displayText("test user: hi", chatOutput);
}