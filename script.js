// 2. Home Page Logic

let issues = [];

// Filtered Buttons
const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");

function tabStyle(id) {
  allBtn.classList.remove("bg-primary", "text-white");
  openBtn.classList.remove("bg-primary", "text-white");
  closedBtn.classList.remove("bg-primary", "text-white");

  const selected = document.getElementById(id);
  if (selected) {
    allBtn.classList.remove("bg-primary", "text-white");
    selected.classList.add("bg-primary", "text-white");
  }
}

// All Issues Cards
const cardContainer = document.getElementById("cardsContainer");
const totalIssues = document.getElementById("totalIssues");
// Modal
const modal = document.getElementById("my_modal_5");

async function loadAllIssues() {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues"
  );
  const data = await res.json();
  issues = data.data;
  displayCards(issues);
}

function displayCards(list) {
  cardContainer.innerHTML = "";
  for (const item of list) {
    const card = document.createElement("div");
    card.className = "issue-card";
    card.innerHTML = `
            <div
                id="card"
                class="card card-body min-h-[370px] space-y-5 shadow-lg border-t-4 ${
                  item.status === "open"
                    ? "border-green-500"
                    : "border-purple-500"
                } "
              >
                <div class="flex justify-between">
                  <div>
                    ${
                      item.status === "open"
                        ? "<img src='./assets/Open-Status.png' />"
                        : "<img src='./assets/Closed-Status.png' />"
                    }
                  </div>
                  <div  class="badge badge-soft badge-secondary px-6">${item.priority.toUpperCase()}</div>
                </div>
                <div>
                  <h2  class="text-xl font-bold mb-3">
                    ${item.title}
                  </h2>
                  <p class="line-clamp-2">
                    ${item.description}
                  </p>
                </div>
                <div class="flex gap-2">
                  <p class="badge badge-outline bg-[#FECACA] badge-secondary">
                    ${item.labels[0]}
                  </p>
                  <p class="badge badge-outline bg-[#FDE68A] text-[#D97706]">
                   ${item.labels[1] ?? "N/A"}
                  </p>
                </div>
                <hr class="text-gray-300" />
                <div>
                  <p>${item.author}</p>
                  <p>${item.createdAt.split("T")[0]}</p>
                </div>
              </div>
        `;

    // For Modal
    card.addEventListener("click", () => openModal(item));

    cardContainer.appendChild(card);
  }
  totalIssues.innerText = list.length;
}

// Modal
function openModal(item) {
  document.getElementById("cardTitle").innerText = item.title;
  document.getElementById("cardDescription").innerText = item.description;
  document.getElementById("cardStatus").innerText = item.status;
  if (item.status === "open") {
    document.getElementById("cardStatus").classList.remove("bg-purple-500");
    document.getElementById("cardStatus").classList.add("bg-green-500");
  } else {
    document.getElementById("cardStatus").classList.add("bg-purple-500");
  }
  document.getElementById("cardAuthor").innerText = item.author;
  document.getElementById("date").innerText = item.createdAt.split("T")[0];
  document.getElementById("cardAuthor1").innerText = `Opened by ${item.author}`;
  document.getElementById("cardLabel1").innerText = item.labels[0];
  document.getElementById("cardLabel2").innerText = item.labels[1] ?? "N/A";
  document.getElementById("cardPriority").innerText =
    item.priority.toUpperCase();
  modal.showModal();
}

// Filters
allBtn.addEventListener("click", () => {
  displayCards(issues);
});

openBtn.addEventListener("click", () => {
  const openIssue = issues.filter((i) => i.status === "open");
  displayCards(openIssue);
});

closedBtn.addEventListener("click", () => {
  const closeIssue = issues.filter((i) => i.status === "closed");
  displayCards(closeIssue);
});
loadAllIssues();
