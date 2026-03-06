// 2. Home Page Logic

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

async function loadAllIssues() {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues"
  );
  const data = await res.json();
  displayCards(data.data);
}

function displayCards(details) {
  for (const item of details) {
    const card = document.createElement("div");
    card.innerHTML = `
            <div
                class="card card-body min-h-[370px] space-y-5 shadow-lg border-t-4 border-green-500"
              >
                <div class="flex justify-between">
                  <div>
                    <img src="./assets/Open-Status.png" alt="" />
                  </div>
                  <div class="badge badge-soft badge-secondary px-6">${item.priority.toUpperCase()}</div>
                </div>
                <div>
                  <h2 class="text-xl font-bold mb-3">
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
                  ${item.labels[1]}
                  </p>
                </div>
                <hr class="text-gray-300" />
                <div>
                  <p>${item.author}</p>
                  <p>${item.createdAt.split("T")[0]}</p>
                </div>
              </div>
        `;
    cardContainer.appendChild(card);
  }
}

loadAllIssues();
